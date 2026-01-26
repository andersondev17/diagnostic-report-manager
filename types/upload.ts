export enum UploadStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export type UploadFile = {
  id: string;
  file?: File;
  status: UploadStatus;
  progress: number;
  name?: string;
  size?: number;
  type?: string;
  date?: string;
};

export interface UploadColumn<T = UploadFile> {
    header?: string;
    cell: (file: T) => React.ReactNode;
    cellClassName?: string;
}

export type UploadFileState = {
    id: string;
    file?: File;
    name: string;
    type: string;
    size: number;
    status: UploadStatus;
    progress: number;
};
export interface ReportsState {
    reports: UploadFileState[];
    operations: { id: string; type: 'ADD' | 'UPDATE' | 'REMOVE'; status: UploadStatus; timestamp: number }[];
    addReports: (files: UploadFileState[]) => void;
    updateReport: (id: string, update: Partial<UploadFileState>) => void;
    removeReport: (id: string) => void;
    clearCompleted: () => void;
}