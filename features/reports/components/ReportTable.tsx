'use client';
import { EmptyState } from "@/components/feedback/EmptyState";
import { cn, getReportColor } from "@/lib/utils";
import { IconMoodSmile } from "@tabler/icons-react";
import { FileIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import DataTable from "./DataTable";

interface ReportTableProps {
    title: string;
    reports?: TReport[];
    classNames?: string;
}

const ReportTable = ({ title, reports, classNames }: ReportTableProps) => {
    const router = useRouter();
    // Memoized expensive calculations
    const sortedReports = useMemo(() => {  // order reports by date descending
        return [...reports!].sort((a, b) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
        );
    }, [reports]);
    const columns: DataTableColumn<TReport>[] = useMemo(
        () => [
            {
                header: 'Report',
                headClassName: 'text-lg w-2/3',
                cell: (report) => (
                    <div className="flex items-center gap-2">
                        <div
                            className={cn(
                                'hidden md:flex h-12 w-12 shrink-0 items-center justify-center rounded-lg',
                                getReportColor(report.type)
                            )}
                        >
                            <FileIcon className="h-6 w-6" />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="font-bold text-sm text-muted-foreground">{report.name}</p>
                            <p className="text-sm text-muted-foreground">{report.size}</p>
                        </div>
                    </div>
                ),
            },
            {
                header: 'Type',
                headClassName: 'text-lg',
                cell: (report) => (
                    <div className={cn("subject-badge w-fit", getReportColor(report.type))}>
                        {report.type}
                    </div>
                ),
            },
            {
                header: 'Date',
                headClassName: 'text-lg text-right',
                cellClassName: 'text-right',
                cell: (report) => (
                    <div className="flex items-center gap-2 w-full justify-end">
                        <time className="text-base">{report.date}</time>
                        <Image
                            src="/icons/clock.svg"
                            alt="minutes"
                            width={14}
                            height={14}
                            className="hidden md:flex"
                        />
                    </div>
                ),
            },
        ],
        []
    );
    const handleRowClick = useCallback((report: TReport) => {
        router.push(`/reports/${report.id}`);
    }, [router]);
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

            <DataTable
                columns={columns}
                data={sortedReports}
                rowKey={(report: TReport) => report.id}
                onRowClick={handleRowClick}
                onRowKeyDown={handleRowKeyDown}
                enableKeyboardNav
            />
        </article>
    )
}

export default ReportTable;