'use client';
import { usePathname, useRouter } from "next/navigation";

interface PaginationControlsProps {
    page: number;
    totalPages: number;
    name: string;
    type: string;
    status: string;
}

export const PaginationControls = ({ page, totalPages, name, type, status }: PaginationControlsProps) => {
    const router = useRouter();
    const pathname = usePathname();

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams();
        if (name) params.set("name", name);
        if (type) params.set("type", type);
        if (status) params.set("status", status);
        params.set("page", String(newPage));

        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    return (
        <section className="flex justify-center gap-4 mt-6 sticky bottom-2 bg-accent">
            <button
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-primary hover:text-white"
                disabled={page <= 1}
                onClick={() => handlePageChange(page - 1)}
            >
                Previous
            </button>

            <span className="flex items-center gap-2">
                Page {page} of {totalPages}
            </span>

            <button
                className="px-3 py-1 border rounded disabled:opacity-50 hover:bg-primary hover:text-white"
                disabled={page >= totalPages}
                onClick={() => handlePageChange(page + 1)}
            >
                Next
            </button>
        </section>
    );
};