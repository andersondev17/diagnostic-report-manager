import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonTable() {
    return (
        <div className="report-list w-full max-w-2xl flex flex-col gap-4 animate-pulse">
            {Array.from({ length: 5 }).map((_, index) => (
                <div className="flex gap-4" key={index}>
                    <Skeleton className="h-4 flex-1" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-4 w-20" />
                </div>
            ))}
        </div>
    )
}
