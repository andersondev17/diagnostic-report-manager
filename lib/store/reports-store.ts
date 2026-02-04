import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { INITIAL_MOCK } from '../db/mock-data';
import { AuditSlice, createAuditSlice } from './audit-slice';
import { createReportsSlice, ReportsSlice } from './reports-slice';

export type ReportsState = ReportsSlice & AuditSlice;

export const useReportsStore = create<ReportsState>()(
    devtools(
        persist(
            (...args) => ({
                ...createReportsSlice(...args),
                ...createAuditSlice(...args),
            }),
            {
                name: 'reports-storage',
                partialize: (state) => ({
                    reports: state.reports, //Only persist domain data, not audit metadata
                    isHydrated: state.isHydrated,
                    // operations intentionally excluded
                }),
                onRehydrateStorage: () => (state) => {
                    if (state) {
                        if (!state.reports || state.reports.length === 0) {
                            state.setReports(INITIAL_MOCK);
                        }
                        state.setHydrated(true);
                    }
                },
            }
        ),
        { name: 'ReportsStore' }
    )
);
