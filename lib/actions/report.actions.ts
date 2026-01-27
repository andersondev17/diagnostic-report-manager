'use server';

import { INITIAL_MOCK } from "../db/mock-data";


export const getAllReports = async ({
    limit = 20,
    page = 1,
    name = '',
    type = '',
    status = '',
}: GetAllReportsParams): Promise<PaginatedReports> => {
    let filtered = INITIAL_MOCK;

    const filters = [
        { condition: name, fn: (r: TReport) => r.name.toLowerCase().includes(name.toLowerCase()) },
        { condition: type, fn: (r: TReport) => r.type === type },
        { condition: status, fn: (r: TReport) => r.status === status }
    ];

    filtered = filters.reduce((acc, { condition, fn }) =>
        condition ? acc.filter(fn) : acc,
        filtered
    );

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const data = filtered.slice(start, start + limit);

    return {
        data,
        pagination: {
            page,
            limit,
            total,
            totalPages
        }
    };
};

export const getReport = async (id: string): Promise<TReport | null> => {
    return INITIAL_MOCK.find(r => r.id === id) ?? null;
};