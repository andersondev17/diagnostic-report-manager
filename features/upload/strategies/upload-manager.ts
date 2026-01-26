import { UploadStrategy } from '@/types/upload';
import { CsvUploadStrategy, PdfUploadStrategy } from './upload-strategies';

/**
 * Context -  strategy selection
 */
export class UploadStrategyManager {
    private strategies: UploadStrategy[];

    constructor() {
        this.strategies = [
            new PdfUploadStrategy(),
            new CsvUploadStrategy(),
        ];
    }

    getStrategy(file: File): UploadStrategy | null {
        return this.strategies.find(s => s.supports(file)) ?? null;
    }
    getSupportedExtensions() {
        return this.strategies
            .flatMap(s => s.getMimeTypes())
            .map(mime => mime.split('/')[1]?.toUpperCase())
            .join(', ');
    }

    validate(file: File): string | null {
        const strategy = this.getStrategy(file);
        if (!strategy) return `File type not supported. Only ${this.getSupportedExtensions()} allowed`;
        return strategy.validate(file);
    }

    getIcon(file: File, size?: number) {
        return this.getStrategy(file)?.getIcon(size);
    }

    getSupportedMimeTypes(): Record<string, string[]> {
        return this.strategies.reduce((acc, strategy) => {
            strategy.getMimeTypes().forEach(mime => {
                acc[mime] = [];
            });
            return acc;
        }, {} as Record<string, string[]>);
    }
}