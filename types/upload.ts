import { ReactNode } from "react";

export enum UploadStatus {
    LOADING = 'LOADING',
    SUCCESS = 'SUCCESS',
    ERROR = 'ERROR',
}

export enum ReportType {
    PDF = "application/pdf",
    CSV = "text/csv",
}
export type UploadFile = {
  id: string;
  file?: File;
  status: UploadStatus;
  progress?: number;
  name?: string;
  size?: number;
  type?: ReportType;
  date?: string;
};

export interface UploadColumn<T = UploadFile> {
    header?: string;
    cell: (file: T) => React.ReactNode;
    cellClassName?: string;
}

export type UploadFileState = UploadFile & {
    name: string;
    type: string;
    size: number;
};
export interface ReportsState {
    reports: UploadFileState[];
    operations: { id: string; type: 'ADD' | 'UPDATE' | 'REMOVE'; status: UploadStatus; timestamp: number }[];
    addReports: (files: UploadFileState[]) => void;
    updateReport: (id: string, update: Partial<UploadFileState>) => void;
    removeReport: (id: string) => void;
    clearCompleted: () => void;
}

export interface UploadStrategy {
    supports(file: File): boolean;
    getIcon(size?: number): ReactNode;
    validate(file: File): string | null;
    getMimeTypes(): string[];
}