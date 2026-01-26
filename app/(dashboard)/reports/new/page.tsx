'use client'
import { SkeletonCard } from "@/components/feedback/SkeletonCard";
import { Dropzone } from "@/features/upload/components/Dropzone";
import { UploadList } from "@/features/upload/components/UploadList";
import { UploadStrategyManager } from "@/features/upload/strategies/upload-manager";
import { useFileUpload } from "@/hooks/useFileUpload";
import { UploadColumn, UploadStatus } from "@/types/upload";
import { IconFileText } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense, useCallback, useMemo } from 'react';

const UploadPage = () => {
  const { files, simulateUpload, remove, retry } = useFileUpload();
  const strategyManager = useMemo(() => new UploadStrategyManager(), []);

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(simulateUpload);
  }, [simulateUpload]);

  const uploadColumns = useMemo<UploadColumn[]>(() => [{
    cell: (file) => {
      if (!file.file) {
        return <IconFileText size={24} className="text-gray-400" />;
      }

      return strategyManager.getIcon(file.file, 24) ?? (
        <IconFileText size={24} className="text-gray-400" />
      );
    }
  },
  {
    cell: (file) => (
      <div className="flex-1 min-w-0">
        <p className="font-bold">{file.file?.name ?? file.name}</p>
        <p className="text-sm text-gray-500">
          {file.file?.size ? (file.file.size / 1024).toFixed(1) : (file.size ? (file.size / 1024).toFixed(1) : '–')} KB
        </p>
        {file.status === UploadStatus.LOADING && (
          <div
            className="mt-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden"
            aria-valuenow={file.progress}
            aria-label={`Upload progress: ${file.progress}%`}
          >
            <div
              className="h-full bg-green-500 transition-all duration-300"
              style={{ width: `${file.progress}%` }}
            />
          </div>
        )}
      </div>
    )
  },
  {
    cell: (file) => (
      <div className="flex gap-2 items-center">
        {file.status === UploadStatus.ERROR && (
          <button
            onClick={() => retry(file.id)}
            className="text-xs text-blue-600 hover:underline"
            aria-label={`Retry upload for ${file.name}`}
          >
            Retry
          </button>
        )}
        <button
          onClick={() => remove(file.id)}
          className="text-xs text-gray-500 hover:underline right-1"
          aria-label={`Remove ${file.name}`}
        >
          ×
        </button>
      </div>
    )

  }
  ], [retry, remove]);

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
      <header className="mb-6">
        <div className="flex items-center gap-2 mb-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/" className="hover:underline">Home</Link>
          <span>›</span>
          <Link href="/reports" className="hover:underline">New Report</Link>
        </div>
      </header>
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">

        <Suspense fallback={<SkeletonCard />}>
          <Dropzone onDrop={handleDrop} />
        </Suspense>

        <div className="flex justify-center items-start">
          <div className="relative h-[450px] w-full overflow-y-auto rounded-xl dark:border-gray-700 p-4">
            <Suspense fallback={
              <div className="text-center text-gray-500">
                Upload List will appear here...
              </div>
            }>
              {files.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <IconFileText size={48} className="mb-4 opacity-50" />
                  <p>No uploads yet</p>
                  <p className="text-sm">Drop files to get started</p>
                </div>
              ) : (
                <UploadList
                  files={files}
                  onRetry={retry}
                  onRemove={remove}
                  columns={uploadColumns}
                />
              )}
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UploadPage 