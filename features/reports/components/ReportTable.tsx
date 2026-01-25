'use client';
import { EmptyState } from "@/components/feedback/EmptyState";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { cn, getReportColor } from "@/lib/utils";
import { IconChevronLeft, IconChevronRight, IconChevronsLeft, IconChevronsRight, IconMoodSmile } from "@tabler/icons-react";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";

interface ReportTableProps {
    title: string;
    reports?: TReport[];
    pagination?: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
    onPageChange?: (page: number, limit: number) => void;
    classNames?: string;
}

const ReportTable = ({ title, reports, pagination, onPageChange, classNames }: ReportTableProps) => {
    const router = useRouter();
    // Memoized expensive calculations
    const sortedReports = useMemo(() => {  // order reports by date descending
        return [...reports!].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [reports]);

    // Memoized callbacks to prevent child re-renders
    const handlePageChange = useCallback((newPage: number) => {
        onPageChange?.(newPage, pagination!.limit);
    }, [onPageChange, pagination?.limit]);

    const handlePageSizeChange = useCallback((newLimit: number) => {
        onPageChange?.(1, newLimit);
    }, [onPageChange]);

    const handleRowKeyDown = (e: React.KeyboardEvent<HTMLTableRowElement>, id: string) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            router.push(`/reports/${id}`);
        }
    };

    if (!reports || reports.length === 0) {
        return <EmptyState title="No reports found" icon={IconMoodSmile} className={classNames} />;
    }

    return (
        <article className={cn('report-list', classNames)}>
            <h2 className="font-bold text-3xl">{title}</h2>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-lg w-2/3">Report</TableHead>
                        <TableHead className="text-lg">Type</TableHead>
                        <TableHead className="text-lg text-right">Date</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {sortedReports?.map(({ id, name, type, size, date }) => (
                        <TableRow
                            key={id}
                            tabIndex={0}
                            role="button"
                            aria-label={`Open ${name} report`}
                            onKeyDown={(e) => handleRowKeyDown(e, id)}
                            onClick={() => router.push(`/reports/${id}`)}
                            className="cursor-pointer hover:bg-accent focus:bg-accent focus:outline-none focus:ring-2 focus:ring-primary transition-colors"
                        >
                            <TableCell>
                                <div className="flex items-center gap-2">
                                    <div
                                        className={cn(
                                            'hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
                                            getReportColor(type)
                                        )}
                                    >
                                        <FileIcon className="h-6 w-6" />
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <p className="font-bold text-sm text-muted-foreground">{name}</p>
                                        <p className="text-sm text-muted-foreground">{size}</p>
                                    </div>
                                </div>
                            </TableCell>
                            <TableCell>
                                <div className={cn("subject-badge w-fit ",
                                    getReportColor(type)
                                )}>
                                    {type}
                                </div>

                            </TableCell>
                            <TableCell>
                                <div className="flex items-center gap-2 w-full justify-end">
                                    <time className="text-base">
                                        {date}
                                    </time>
                                    <Image src="/icons/clock.svg" alt="minutes" width={14} height={14} className="hidden md:flex" />
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
            {pagination && onPageChange && (
                <div className="flex flex-col lg:flex-row items-center justify-between mt-4 gap-4">
                    {/* Rows per page */}
                    <div className="flex items-center gap-2">
                        <Label htmlFor="rows-per-page" className="text-sm font-medium">Rows per page</Label>
                        <Select
                            value={`${pagination.limit}`}
                            onValueChange={(value) => handlePageSizeChange(Number(value))}
                        >
                            <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                                <SelectValue placeholder={pagination.limit} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[10, 20, 30, 40, 50].map((size) => (
                                    <SelectItem key={size} value={`${size}`}>{size}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Page info */}
                    <div className="text-sm font-medium">
                        Page {pagination.page} of {pagination.totalPages}
                    </div>

                    {/* Pagination buttons */}
                    <div className="flex items-center gap-2">
                        <Button size="icon" onClick={() => handlePageChange(1)} disabled={pagination.page <= 1}>
                            <IconChevronsLeft />
                        </Button>
                        <Button size="icon" onClick={() => handlePageChange(pagination.page - 1)} disabled={pagination.page <= 1}>
                            <IconChevronLeft />
                        </Button>
                        <Button size="icon" onClick={() => handlePageChange(pagination.page + 1)} disabled={pagination.page >= pagination.totalPages}>
                            <IconChevronRight />
                        </Button>
                        <Button size="icon" onClick={() => handlePageChange(pagination.totalPages)} disabled={pagination.page >= pagination.totalPages}>
                            <IconChevronsRight />
                        </Button>
                    </div>
                </div>
            )}
        </article>
    )
}

export default ReportTable;