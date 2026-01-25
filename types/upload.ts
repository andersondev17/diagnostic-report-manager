export enum UploadStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type UploadFile = {
    id: string;
    file: File;
    status: UploadStatus;
    progress: number;
};

export interface UploadColumn<T = UploadFile> {
    header?: string;
    cell: (file: T) => React.ReactNode;
    cellClassName?: string;
}