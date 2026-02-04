import { UploadStrategyManager } from '@/features/upload/strategies/upload-manager';
import { useFileUpload } from '@/hooks/useFileUpload';
import { useCallback } from 'react';
import { toast } from 'sonner';


/**
 * Recieve a strategy manager, uses useFileUpload for file upload 
 * and returns the upload flow
 * 
 */
export const useUploadFlow = (strategyManager: UploadStrategyManager) => {
    const { files, simulateUpload, remove, retry } = useFileUpload();

    const handleDrop = useCallback((filesToUpload: File[]) => {
        filesToUpload.forEach(file => {
            // Delegate validation to appropriate strategy
            const error = strategyManager.validate(file);
            // Business rule violation — inform user
            if (error) toast.error(`${file.name}: ${error}`, { duration: 4000 });
            // Only valid files reach upload
            else simulateUpload(file);
        });
    }, [strategyManager, simulateUpload]);

    return { files, handleDrop, remove, retry, strategyManager };
};
