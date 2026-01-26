import { useReportsStore } from '@/lib/store/reports-store';
import { UploadFile, UploadStatus } from '@/types/upload';
import { useCallback, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

export const useFileUpload = () => {
    const { reports, addReports, updateReport, removeReport } = useReportsStore();
    const isMounted = useRef(true);

    useEffect(() => {
        isMounted.current = true;
        return () => { isMounted.current = false; };
    }, []);

    const isValidFile = (file: File) => ['application/pdf', 'text/csv'].includes(file.type);

    const simulateUpload = useCallback((file: File) => {
        if (!isValidFile(file)) return;

        const id = uuidv4();
        const newFile: UploadFile = { id, file, status: UploadStatus.LOADING, progress: 0 };
        addReports([newFile]);

        let progress = 0;
        const interval = setInterval(() => {
            if (!isMounted.current) return clearInterval(interval);
            progress = Math.min(progress + 20, 100);
            updateReport(id, { progress });
        }, 400);

        setTimeout(() => {
            if (!isMounted.current) return clearInterval(interval);
            clearInterval(interval);
            const finalStatus = Math.random() < 0.1 ? UploadStatus.ERROR : UploadStatus.SUCCESS;
            updateReport(id, { status: finalStatus, progress: 100 });
        }, 2000);
    }, [addReports, updateReport]);

    const remove = useCallback((id: string) => {
        // Cancel ongoing upload if exists
        removeReport(id);
    }, [removeReport]);

    const retry = useCallback((id: string) => {
  const report = reports.find(r => r.id === id);
  if (!report) return;
  if (report.file) simulateUpload(report.file); // solo si el File existe
}, [reports, simulateUpload]);


    return {
        files: reports,
        simulateUpload,
        remove,
        retry
    };
};