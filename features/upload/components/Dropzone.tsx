'use client';
import { LightRays } from '@/components/ui/light-rays';
import { useState } from 'react';
import { FileRejection, useDropzone } from 'react-dropzone';

type Props = {
    onDrop: (files: File[]) => void;
};

export const Dropzone = ({ onDrop }: Props) => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleDrop = (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
        // Si hay archivos rechazados
        if (rejectedFiles.length > 0) {
            const names = rejectedFiles.map(f => f.file.name).join(', ');
            setErrorMessage(`These files are not allowed: ${names}`);

        } else setErrorMessage(null);
        // Solo pasa los aceptados
        onDrop(acceptedFiles);
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: handleDrop,
        multiple: true,
        accept: { 'application/pdf': [], 'text/csv': [] },
    });

    return (
        <div className="flex flex-col items-center" role="region" aria-label="File upload Dropzone">
            <button
                {...getRootProps()}
                aria-label="File upload Dropzone"
                className={`dropzone ${isDragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                    }`}
            >
                <LightRays
                    count={7}
                    color="rgba(160, 210, 255, 0.2)"
                    blur={36}
                    speed={14}
                    length="100%"
                />
                <input {...getInputProps()} />
                <h1 className="text-3xl md:text-4xl font-bold text-primary text-center drop-shadow-lg">
                    {isDragActive ? 'Drop the files here...' : 'Drag & drop files here'}
                </h1>
                <p className="text-xs text-gray-500 mt-1">PDF, CSV only</p>
            </button>

            {/* Feedback de error */}
            {errorMessage && (
                <p  aria-describedby="error-message" className="mt-2 text-sm text-red-600 text-center">{errorMessage}</p>
            )}
        </div>
    );
};
