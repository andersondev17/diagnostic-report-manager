'use client';
import { LightRays } from '@/components/ui/light-rays';
import { useMemo } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';
import { toast } from 'sonner';
import { UploadStrategyManager } from '../strategies/upload-manager';

type Props = {
    onDrop: (files: File[]) => void;
    acceptedTypes?: Record<string, string[]>;
    supportedTypesLabel?: string;
};

export const Dropzone = ({ onDrop, acceptedTypes, supportedTypesLabel = 'PDF, CSV' }: Props) => {
    // StrategyManager aquí
    const strategyManager = useMemo(() => new UploadStrategyManager(), []);

    const resolvedAcceptedTypes = useMemo(
        () => acceptedTypes ?? strategyManager.getSupportedMimeTypes(),
        [acceptedTypes, strategyManager]
    );
    const handleDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        const validFiles: File[] = [];
        const errors: string[] = [];

        acceptedFiles.forEach(file => {
            const error = strategyManager.validate(file);
            if (error) {
                errors.push(`${file.name}: ${error}`);
            } else {
                validFiles.push(file);
            }
        });
        rejectedFiles.forEach(rejection => {
            const { file, errors: dropzoneErrors } = rejection;

            if (dropzoneErrors.some(e => e.code === 'file-invalid-type')) {
                const supportedTypes = strategyManager.getSupportedExtensions();
                errors.push(`${file.name}: File type not supported. Only ${supportedTypes} allowed`);
            } else {
                errors.push(`${file.name}: ${dropzoneErrors[0]?.message ?? 'Upload failed'}`);
            }
        });
        errors.forEach(err => toast.error(err, { duration: 4000 }));

        onDrop(validFiles);

    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        multiple: true,
        accept: resolvedAcceptedTypes,
    });

    return (
        <div className="flex flex-col items-center" aria-label="File upload zone">
            <button {...getRootProps()} aria-describedby="dropzone-help" className={`dropzone ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'}`}>
                <LightRays count={7} color="rgba(160, 210, 255, 0.2)" blur={36} speed={14} length="100%" />
                <input {...getInputProps()} />
                <h1 className="text-3xl md:text-4xl font-bold text-primary text-center drop-shadow-lg">
                    {isDragActive ? 'Drop the files here...' : 'Drag & drop files here'}
                </h1>
                <p id="dropzone-help" className="text-xs text-gray-500 mt-1">{supportedTypesLabel} only</p>
            </button>
        </div>
    );
};
