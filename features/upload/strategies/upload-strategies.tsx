import { UploadStrategy } from '@/types/upload';
import { IconFile, IconFileTypeCsv } from '@tabler/icons-react';

export class PdfUploadStrategy implements UploadStrategy {
    private readonly MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB

    supports(file: File): boolean {
        return file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf');
    }

    getIcon(size = 24) {
        return <IconFile size={ size } className = "text-red-700" />;
    }

    validate(file: File): string | null {
        if (!this.supports(file)) return 'File must be a PDF document';
        if (file.size > this.MAX_SIZE_BYTES) return 'PDF size must not exceed 10MB';
        if (file.size === 0) return 'PDF file is empty';
        return null;
    }

    getMimeTypes(): string[] {
        return ['application/pdf'];
    }
}


export class CsvUploadStrategy implements UploadStrategy {
    private readonly MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

    supports(file: File): boolean {
        return file.type === 'text/csv' || file.name.toLowerCase().endsWith('.csv');
    }

    getIcon(size = 24) {
        return <IconFileTypeCsv size={ size } className = "text-green-700" />;
    }

    validate(file: File): string | null {
        if (!this.supports(file)) return 'File must be a CSV spreadsheet';
        if (file.size > this.MAX_SIZE_BYTES) return 'CSV size must not exceed 5MB';
        if (file.size === 0) return 'CSV file is empty';
        return null;
    }

    getMimeTypes(): string[] {
        return ['text/csv'];
    }
}