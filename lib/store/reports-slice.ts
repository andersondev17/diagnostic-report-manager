import { UploadFile, UploadStatus } from '@/types/upload';
import { StateCreator } from 'zustand';
import { ReportsState } from './reports-store';

/** 
* Responsibility: Manage file upload state and lifecycle
 * Persistence: YES (localStorage via persist middleware)
 * Scope: Core business domain
 */
export interface ReportsSlice {
    reports: UploadFile[];
    isHydrated: boolean;

    // Domain operations
    addReports: (newReports: UploadFile[]) => void;
    updateReport: (id: string, update: Partial<UploadFile>) => void;
    removeReport: (id: string) => void;
    setReports: (reports: UploadFile[]) => void;
    setHydrated: (value: boolean) => void;

    //queries 
    getReportById: (id: string) => UploadFile | undefined;
    getReportsByStatus: (status: UploadStatus) => UploadFile[];
    clearCompleted: () => void;
}

export const createReportsSlice: StateCreator<ReportsState, [], [], ReportsSlice> = (set, get) => ({
    reports: [],
    isHydrated: false,

    addReports: (newReports) => {
        set((state) => ({ reports: [...state.reports, ...newReports] }));
        // Audit log: log operation in audit
        newReports.forEach(r => get().logOperation({
            id: r.id,
            type: 'ADD',
            status: r.status,
            timestamp: Date.now()
        }));
    },

    updateReport: (id, update) => {
        set((state) => ({
            reports: state.reports.map(r => r.id === id ? { ...r, ...update } : r)
        }));
        // Audit log
        get().logOperation({
            id,
            type: 'UPDATE',
            status: update.status ?? UploadStatus.LOADING,
            timestamp: Date.now()
        });
    },

    removeReport: (id) => {
        set((state) => ({ reports: state.reports.filter(r => r.id !== id) }));
        // Audit log
        get().logOperation({ id, type: 'REMOVE', status: UploadStatus.SUCCESS, timestamp: Date.now() });
    },

    setReports: (reports) => set({ reports }),
    setHydrated: (value) => set({ isHydrated: value }),

    getReportById: (id) => get().reports.find(r => r.id === id),
    getReportsByStatus: (status) => get().reports.filter(r => r.status === status),
    clearCompleted: () => set((state) => ({
        reports: state.reports.filter(r => r.status !== UploadStatus.SUCCESS)
    })),
});
