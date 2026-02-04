import { StateCreator } from 'zustand';
import { ReportsState } from './reports-store';

/**
 * Audit Metadata (Operations)
 * 
 * Responsibility: Track changes for debugging/compliance
 * Persistence: NO (memory-only, or future: backend sync)
 */

export interface AuditSlice {
    operations: ReportOperation[];

    //audit operations
    logOperation: (operation: ReportOperation) => void;
    getOperations: (limit?: number) => ReportOperation[];
    clearOperations: () => void;
}

export const createAuditSlice: StateCreator<ReportsState, [], [], AuditSlice> = (set, get) => ({
    operations: [],

    logOperation: (operation) => {
        set((state) => ({
            operations: [operation, ...state.operations].slice(0, 100)
        }));
    },

    getOperations: (limit = 100) => get().operations.slice(0, limit),

    clearOperations: () => set({ operations: [] }),
});
