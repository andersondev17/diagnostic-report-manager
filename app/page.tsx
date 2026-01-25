import { SkeletonCard } from "@/components/feedback/SkeletonCard"
import { SkeletonTable } from "@/components/feedback/SkeletonTable"
import CTA from "@/features/reports/components/CTA"
import ReportCard from "@/features/reports/components/ReportCard"
import ReportTable from "@/features/reports/components/ReportTable"
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
          <div className="flex gap-6 w-full">
            {reports.map((report: TReport) => (
              <div key={report.id} className="flex-1">
                <ReportCard
                  {...report}
                  color={getReportColor(report.type)}
                />
              </div>
            ))}
          </div>
        </Suspense>

      </section>
      <section className="home-section">
        <Suspense fallback={<SkeletonTable />}>
          <ReportTable title="Recent Reports" reports={reports} classNames="w-2/3 max-lg:w-full" />
        </Suspense>
        <CTA />
      </section>
    </main>

  )
}

