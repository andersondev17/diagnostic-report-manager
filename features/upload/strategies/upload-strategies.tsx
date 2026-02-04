import { ReportType, UploadStrategy } from '@/types/upload';
import { IconFile, IconFileTypeCsv } from '@tabler/icons-react';


/* 
Ambas estrategias implementan la misma interfaz, pero cada una define reglas distintas.
 */
export class PdfUploadStrategy implements UploadStrategy {  
    private readonly MAX_SIZE_BYTES = 10 * 1024 * 1024; // limite 10MB

    supports(file: File): boolean {
        return file.type === ReportType.PDF;
    }

    getIcon(size = 24) {
        return <IconFile size={ size } className = "text-red-700" />;
    }
//Estas reglas no existen fuera de esta clase.
//Si cambian las reglas del PDF, no se toca el hook ni el manager.
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

/**
 * CSV Upload Strategy:
 * - Smaller size limit (5MB vs 10MB), - Different icon/color - Same interface
 * This demonstrates polymorphism — UploadStrategyManager treats both identically.
 */
export class CsvUploadStrategy implements UploadStrategy {    
    private readonly MAX_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

    supports(file: File): boolean {
        return file.type === ReportType.CSV;
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