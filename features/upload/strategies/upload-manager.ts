import { UploadStrategy } from '@/types/upload';
import { CsvUploadStrategy, PdfUploadStrategy } from './upload-strategies';

/**
 *   Selecciona dinámicamente una implementación concreta.
 *   El manager desacopla las reglas de validación específicas de cada archivo de la lógica del flujo de carga.
 *   Agregar un nuevo tipo de archivo implica crear una nueva estrategia, no modificar código existente.
 */
export class UploadStrategyManager {
//Cada estrategia encapsula las reglas de validación para un tipo de archivo.
    private strategies: UploadStrategy[];

    constructor() {
        this.strategies = [
            new PdfUploadStrategy(),
            new CsvUploadStrategy(),
        ];
    }

    //expone clases: El sistema pregunta a las estrategias si soportan el archivo
    getStrategy(file: File): UploadStrategy | null {  //
        return this.strategies.find(s => s.supports(file)) ?? null;
    }
    getSupportedExtensions() {
        return this.strategies
            .flatMap(s => s.getMimeTypes())
            .map(mime => mime.split('/')[1]?.toUpperCase())
            .join(', ');
    }

    //delega validacion depende de upload-startegies
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