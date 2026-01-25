'use server';

import { recentReports } from "../db/mock-data";


export const getAllReports = async ({
    limit = 20,
    page = 1,
    name = '',
    type = '',
    status = '',
}: GetAllReportsParams): Promise<PaginatedReports> => {
    let filtered = recentReports;

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
    // Convertir id a número para coincidir con los datos mock
    const numericId = Number(id);
    if (isNaN(numericId)) return null;

    // Buscar por id numérico
    const report = recentReports.find(r => r.id === numericId);

    return report ?? null;
};