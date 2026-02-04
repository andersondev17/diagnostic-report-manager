import { useReportsStore } from '@/lib/store/reports-store';
import { ReportType, UploadFile, UploadStatus } from '@/types/upload';
import { useCallback, useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';

interface UploadTimers {
    interval: NodeJS.Timeout;
    timeout: NodeJS.Timeout;
}

/**
 * Core upload hook - manages file upload lifecycle and timers.
 * - File upload simulation, Timer management, Store interaction
 * 
 * Depends on abstractions (store interface)
 * Upload flow orchestration only
*/


export const useFileUpload = () => {
    const { reports, addReports, updateReport, removeReport, getReportById } = useReportsStore();
    const isMounted = useRef(true);
    const uploadTimersRef = useRef<Map<string, UploadTimers>>(new Map());
    const MAX_FILES_PER_DROP = 10;

    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
            uploadTimersRef.current.forEach(timers => {
                clearInterval(timers.interval);
                clearTimeout(timers.timeout);
            });
            uploadTimersRef.current.clear();
        };
    }, []);


    const simulateUploadWithId = useCallback((file: File, existingId?: string) => {
        if (!existingId && reports.length >= MAX_FILES_PER_DROP) {   //se valida antes todos tipo de archivos
            toast.error(`You can upload a maximum of ${MAX_FILES_PER_DROP} files at a time.`);
            return;
        }

        const id = existingId ?? uuidv4();

        const newFile: UploadFile = {
            id,
            file,
            status: UploadStatus.LOADING,
            progress: 0,
            name: file.name,
            size: file.size,
            type: file.type as ReportType,
            date: new Date().toISOString().split('T')[0]
        };
        if (!existingId) {
            addReports([newFile]);
        } else {
            updateReport(id, { status: UploadStatus.LOADING, progress: 0 });
        }

        let progress = 0;
        const interval = setInterval(() => {
            if (!isMounted.current || !uploadTimersRef.current.has(id)) {
                clearInterval(interval);
                return;
            }
            progress = Math.min(progress + 20, 100);
            updateReport(id, { progress });
        }, 400);

        const timeout = setTimeout(() => {
            if (!isMounted.current || !uploadTimersRef.current.has(id)) {
                clearInterval(interval);
                return;
            }
            clearInterval(interval);
            toast.success(`${file.name} uploaded successfully!`, { duration: 3000 });

            // Simulate random error (10% chance)
            const finalStatus = Math.random() < 0.1 ? UploadStatus.ERROR : UploadStatus.SUCCESS;// Simulate random error
            updateReport(id, { status: finalStatus, progress: 100 });
            uploadTimersRef.current.delete(id);
        }, 2000);  //Upload simulation waits **2 seconds** before completing (Promise / setTimeout)

        uploadTimersRef.current.set(id, { interval, timeout });
    }, [addReports, updateReport, reports.length]);

    const simulateUpload = useCallback((file: File) => {
        simulateUploadWithId(file);
    }, [simulateUploadWithId]);

    const remove = useCallback((id: string) => {
        const timers = uploadTimersRef.current.get(id);
        if (timers) {
            clearInterval(timers.interval);
            clearTimeout(timers.timeout);
            uploadTimersRef.current.delete(id);
        }
        removeReport(id);
    }, [removeReport]);

    const retry = useCallback((id: string) => {
        const report = getReportById(id);
        if (!report?.file) return;

        const timers = uploadTimersRef.current.get(id);
        if (timers) {
            clearInterval(timers.interval);
            clearTimeout(timers.timeout);
            uploadTimersRef.current.delete(id);
        }
        
        simulateUploadWithId(report.file, id);
    }, [getReportById, simulateUploadWithId]);

    return { //expone una fachada oculta la logica interna del hook
        files: reports,
        simulateUpload,
        remove,
        retry
    };
};