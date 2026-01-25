import { PaginationControls } from "@/components/ui/PaginationControls";
import ReportTable from "@/features/reports/components/ReportTable";
import SearchInput from "@/features/reports/components/SearchInput";
import { getAllReports } from "@/lib/actions/report.actions";
import Link from "next/link";

const ReportsPage = async ({ searchParams }: SearchParams) => {
  // Extraemos filtros desde searchParams
  const filters = await searchParams;

  const name = filters.name ? String(filters.name) : '';
  const type = filters.type ? String(filters.type) : '';
  const status = filters.status ? String(filters.status) : '';
  const page = filters.page ? parseInt(String(filters.page)) : 1;

  // Llamada a la API con filtros
  const { data: reports, pagination } = await getAllReports({
    name,
    type,
    status,
    limit:10,
    page
  });

  const hasResults = reports.length > 0;
  const hasFilters = Boolean(name || type || status);

  return (
    <main className="min-h-screen">

      <article className="mt-2 ">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>
          <span className="font-medium text-gray-900 dark:text-white">Reports</span>
        </div>
      </article>

      <section className="flex justify-between gap-4 max-sm:flex-col py-2 bg-background z-10 ">
        <div className="flex gap-4 items-center px-2">
          <SearchInput />
        </div>

        {pagination.total > 0 && (
          <div className="text-sm text-muted-foreground">
            Showing {((pagination.page - 1) * pagination.limit) + 1}-
            {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
          </div>
        )}
      </section>

      {!hasResults && hasFilters && (
        <section className="text-center py-12">
          <p className="text-muted-foreground">
            No reports found for your search. Try adjusting your filters.
          </p>
        </section>
      )}

      {hasResults && (
        <section className="py-8">
          <ReportTable
            title={hasFilters ? "Filtered Reports" : "Recent Reports"}
            reports={reports}
            classNames="w-full max-lg:w-full"
          />
          <PaginationControls page={pagination.page} totalPages={pagination.totalPages} name={name} type={type} status={status} />
        </section>
      )}
    </main>
  );
};

export default ReportsPage;
