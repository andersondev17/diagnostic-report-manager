// hooks/useFileUpload.ts
import { UploadFile } from '@/types/upload';
import { useCallback, useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

export enum UploadStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export const useFileUpload = () => {
    const [files, setFiles] = useState<UploadFile[]>([]);
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
        setFiles(prev => [newFile, ...prev]);

        let progress = 0;
        const interval = setInterval(() => {
            if (!isMounted.current) return clearInterval(interval);
            progress = Math.min(progress + 20, 100);
            setFiles(prev => prev.map(f => f.id === id ? { ...f, progress } : f));
        }, 400);

        setTimeout(() => {
            if (!isMounted.current) return clearInterval(interval);
            clearInterval(interval);
            setFiles(prev =>
                prev.map(f => f.id === id
                    ? { ...f, status: Math.random() < 0.1 ? UploadStatus.ERROR : UploadStatus.SUCCESS, progress: 100 }
                    : f
                )
            );
        }, 2000);

    }, []);

    const remove = useCallback((id: string) => {
        setFiles(prev => prev.filter(f => f.id !== id));
    }, []);

    const retry = useCallback((id: string) => {
        let progress = 0;

        // Reinicia estado
        setFiles(prev =>
            prev.map(f =>
                f.id === id
                    ? { ...f, status: UploadStatus.LOADING, progress: 0 }
                    : f
            )
        );

        const interval = setInterval(() => {
            if (!isMounted.current) return clearInterval(interval);

            progress = Math.min(progress + 20, 100);
            setFiles(prev =>
                prev.map(f =>
                    f.id === id ? { ...f, progress } : f
                )
            );
        }, 400);

        setTimeout(() => {
            if (!isMounted.current) return clearInterval(interval);

            clearInterval(interval);
            setFiles(prev =>
                prev.map(f =>
                    f.id === id
                        ? {
                            ...f,
                            status: Math.random() < 0.1
                                ? UploadStatus.ERROR
                                : UploadStatus.SUCCESS,
                            progress: 100,
                        }
                        : f
                )
            );
        }, 2000);
    }, []);


    return { files, simulateUpload, remove, retry };
};
