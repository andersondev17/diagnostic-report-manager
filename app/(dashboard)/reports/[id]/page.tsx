import { LightRays } from "@/components/ui/light-rays";
import { ReportComponent } from "@/features/reports/components/ReportComponent";
import { getReport } from "@/lib/actions/report.actions";
import Link from "next/link";
import { redirect } from "next/navigation";

interface ReportPageProps {
  params: Promise<{ id: string }>;
}

const ReportPage = async ({ params }: ReportPageProps) => {
  const { id } = await params;
  const report = await getReport(id);

  if (!report) {
    redirect('/reports');
  }

  const { name, size, type, date, status } = report;


  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>
          <Link href="/reports" className="hover:underline">Reports</Link>
          <span>›</span>
          <span className="font-medium text-gray-900 dark:text-white">{name}</span>
        </div>
      </header>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        {/* Left Column  */}
        <ReportComponent type={type} size={size} date={date} status={status} />

        {/* Right Column  */}
        <div className="flex justify-center items-center">
          <div className="dropzone">
          
            <LightRays
              count={7}
              color="rgba(160, 210, 255, 0.2)"
              blur={36}
              speed={14}
              length="100%"
            />

            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 dark:bg-gray-900/30 rounded-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-white text-center drop-shadow-lg">
                {name}
              </h1>
              <p className="text-sm text-white/80 mt-2 text-center">
                Report Overview
              </p>
            </div>
          </div>
        </div>

      </section>

    </main>
  )
}

export default ReportPage;