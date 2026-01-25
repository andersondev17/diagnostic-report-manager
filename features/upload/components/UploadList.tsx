import { UploadColumn, UploadFile } from '@/types/upload';

type UploadListProps = {
    files: UploadFile[];
    onRetry?: (id: string) => void;
    onRemove?: (id: string) => void;
    columns?: UploadColumn[];
};

export const UploadList = ({ files, onRetry, onRemove, columns }: UploadListProps) => {
    if (files.length === 0) return null;

    // Si no hay columnas definidas, usamos la versión clásica
    if (!columns) {
        return (
            <div className="space-y-2 mt-4 ">
                {files.map(file => (
                    <div key={file.id}>
                        {file.file.name} {/* fallback  */}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="space-y-2 mt-4">
            {files.map(file => (
                <div
                    key={file.id}
                    className="flex items-center justify-between gap-4 border p-3 rounded-lg"
                >
                    {/* Izquierda: icono + info */}
                    <div className="flex items-center gap-4">
                        {columns[0]?.cell(file)}
                        {columns[1]?.cell(file)}
                    </div>

                    {/* Derecha: botón Remove / Retry */}
                    <div className="flex items-center gap-2">
                        {columns[2]?.cell(file)}
                    </div>
                </div>
            ))}
        </div>
    );
};
