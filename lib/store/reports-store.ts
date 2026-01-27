import { UploadFile, UploadStatus } from '@/types/upload';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { INITIAL_MOCK } from '../db/mock-data';

interface ReportOperation {
    id: string;
    type: 'ADD' | 'UPDATE' | 'REMOVE';
    status: UploadStatus;
    timestamp: number;
}

interface ReportsState {
    reports: UploadFile[];
    operations: ReportOperation[];
    isHydrated: boolean;

    // CRUD operations
    addReports: (newReports: UploadFile[]) => void;
    updateReport: (id: string, update: Partial<UploadFile>) => void;
    removeReport: (id: string) => void;
    setReports: (reports: UploadFile[]) => void;

    // Utility operations    
    clearCompleted: () => void;
    getReportById: (id: string) => UploadFile | undefined;
    getReportsByStatus: (status: UploadStatus) => UploadFile[];
}

export const useReportsStore = create<ReportsState>()(
  devtools(
    persist(
      (set, get) => ({
        reports: [],
        operations: [],
        isHydrated: false,
        addReports: (newReports) =>
          set((state) => ({
            reports: [...state.reports, ...newReports],
            operations: [
              ...newReports.map((r) => ({
                id: r.id,
                type: 'ADD' as const,
                status: r.status,
                timestamp: Date.now(),
              })),
              ...state.operations,
            ].slice(0, 100),
          })),

        updateReport: (id, update) =>
          set((state) => ({
            reports: state.reports.map((r) =>
              r.id === id ? { ...r, ...update } : r
            ),
            operations: [
              {
                id,
                type: 'UPDATE' as const,
                status: update.status ?? UploadStatus.LOADING,
                timestamp: Date.now(),
              },
              ...state.operations,
            ].slice(0, 100),
          })),

        removeReport: (id) =>
          set((state) => ({
            reports: state.reports.filter((r) => r.id !== id),
            operations: [
              {
                id,
                type: 'REMOVE' as const,
                status: UploadStatus.SUCCESS,
                timestamp: Date.now(),
              },
              ...state.operations,
            ].slice(0, 100),
          })),

        setReports: (reports) => set({ reports }),

        clearCompleted: () =>
          set((state) => ({
            reports: state.reports.filter((r) => r.status !== UploadStatus.SUCCESS),
          })),

        getReportById: (id) => get().reports.find((r) => r.id === id),

        getReportsByStatus: (status) => get().reports.filter((r) => r.status === status),
      }),
      {
        name: 'reports-storage',
        partialize: (state) => ({
          reports: state.reports,
          isHydrated: state.isHydrated,
        }),
        onRehydrateStorage: () => (state) => {
          //  Inicializa con el mock si no hay datos
          if (state && !state.isHydrated) {
            if (!state.reports || state.reports.length === 0) {
              state.reports = INITIAL_MOCK;
            }
            state.isHydrated = true;
          }
        },
      }
    ),
    { name: 'ReportsStore' }
  )
);