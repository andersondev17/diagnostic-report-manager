import { SkeletonCard } from "@/components/feedback/SkeletonCard"
import { SkeletonTable } from "@/components/feedback/SkeletonTable"
import ReportCard from "@/features/reports/components/ReportCard"
import ReportTable from "@/features/reports/components/ReportTable"
import CTA from "@/features/upload/CTA"
import { getAllReports } from "@/lib/actions/report.actions"
import { getReportColor } from "@/lib/utils"
import { Suspense } from "react"

export default async function Page() {
  const reportsPaginated = await getAllReports({ limit: 3 });
  const reports = reportsPaginated.data;

  return (
    <main>
      <section className="home-section ">
        <Suspense fallback={<SkeletonCard />}>
            {reports.map((report: TReport) => (
              <div key={report.id} className="flex-1 w-full">
                <ReportCard
                  {...report}
                  color={getReportColor(report.type)}
                />
              </div>
            ))}
        </Suspense>

      </section>
      <section className="home-section">
        <Suspense fallback={<SkeletonTable />}>
          <ReportTable title="Recent Reports" reports={reports} classNames="w-2/3 max-lg:w-full border border-primary/20" />
        </Suspense>
        <Suspense fallback={<SkeletonCard />}>
        <CTA />
        </Suspense>
      </section>
    </main>

  )
}

