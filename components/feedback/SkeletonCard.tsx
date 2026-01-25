import { Skeleton } from "@/components/ui/skeleton"

export function SkeletonCard() {
    return (
        <article className="report-card w-full max-w-xs p-4 flex flex-col gap-2 animate-pulse">
            <div className="flex justify-between items-center">
                <Skeleton className="h-5 w-20 rounded" /> {/* placeholder tipo */}
                <Skeleton className="h-4 w-10 rounded" /> {/* bookmark */}
            </div>
            <Skeleton className="h-6 w-3/4 rounded" /> {/* título */}
            <Skeleton className="h-4 w-1/2 rounded" /> {/* tamaño */}
        </article>
    )
}
