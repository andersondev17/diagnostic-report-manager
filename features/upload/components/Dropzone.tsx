'use client';
import { LightRays } from '@/components/ui/light-rays';
import { useDropzone } from 'react-dropzone';

type Props = {
    onDrop: (files: File[]) => void;
    acceptedTypes?: Record<string, string[]>;
    supportedTypesLabel?: string;
};

/**
 * react-dropzone handles:
 * 1. Drag & drop events
 * 2. File input click
 * 3. Shallow MIME type validation (via `accept` prop)
 * 
 * We pass ALL files to parent — validation happens there.
*/
export const Dropzone = ({
    onDrop,
    acceptedTypes,
    supportedTypesLabel
}: Props) => {

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        multiple: true,
        accept: acceptedTypes,
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
