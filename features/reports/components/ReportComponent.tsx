// components/ReportDetailsComponent.tsx
import { getReportColor } from "@/lib/utils";
import { AlertCircle, Calendar, CheckCircle, Clock, FileText, HardDrive } from "lucide-react";

interface ReportDetailsProps {
  type: string;
  size: string;
  date: string;
  status: string;
}

export const ReportComponent = ({ type, size, date, status }: ReportDetailsProps) => {
  const reportColor = getReportColor(type);

  const getStatusIcon = (status: string) => {
    const s = status.toLowerCase();
    if (s.includes("complete") || s.includes("done")) return <CheckCircle className="w-4 h-4 text-green-500" />;
    if (s.includes("pending") || s.includes("processing")) return <Clock className="w-4 h-4 text-amber-500" />;
    if (s.includes("error") || s.includes("failed")) return <AlertCircle className="w-4 h-4 text-red-500" />;
    return <FileText className="w-4 h-4 text-gray-500" />;
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-4xl shadow-sm p-6 space-y-6">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Report Details
      </h2>

      {/* Icon */}
      <div className="flex justify-center">
        <div className="w-24 h-24 rounded-xl flex items-center justify-center" style={{ backgroundColor: reportColor + '20' }}>
          <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ backgroundColor: reportColor }}>
            <FileText className="w-8 h-8 text-white" />
          </div>
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-4">
        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <FileText className="w-4 h-4" />
            <span className="text-sm">Type</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: reportColor }} />
            <span className="font-medium text-gray-900 dark:text-white">{type}</span>
          </div>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <HardDrive className="w-4 h-4" />
            <span className="text-sm">Size</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{size}</span>
        </div>

        <div className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Created</span>
          </div>
          <span className="font-medium text-gray-900 dark:text-white">{date}</span>
        </div>

        <div className="flex items-center justify-between py-3">
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
            {getStatusIcon(status)}
            <span className="text-sm">Status</span>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            status.toLowerCase().includes("complete")
              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
              : status.toLowerCase().includes("pending")
                ? "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200"
                : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
          }`}>
            {status}
          </span>
        </div>
      </div>
    </div>
  );
};
