'use client'
import { SkeletonCard } from "@/components/feedback/SkeletonCard";
import { Dropzone } from "@/features/upload/components/Dropzone";
import { UploadList } from "@/features/upload/components/UploadList";
import { UploadStatus, useFileUpload } from "@/hooks/useFileUpload";
import { UploadColumn } from "@/types/upload";
import { IconFileText } from "@tabler/icons-react";
import Link from "next/link";
import { Suspense, useCallback } from 'react';

const UploadPage = () => {
  const { files, simulateUpload, remove, retry } = useFileUpload();

  const handleDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(simulateUpload);
  }, [simulateUpload]);

  const uploadColumns: UploadColumn[] = [
    {
      cell: (file) => <IconFileText size={24} className="text-primary" />
    },
    {
      cell: (file) => (
        <div className="flex-1 min-w-0">
          <p className="font-bold">{file.file.name}</p>
          <p className="text-sm text-gray-500">{(file.file.size / 1024).toFixed(1)} KB</p>
          {file.status === UploadStatus.LOADING && (
            <div className="mt-1 w-full h-1 bg-gray-200 rounded-full overflow-hidden">
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
        <div className="flex gap-2">
          {file.status === UploadStatus.ERROR && (
            <button onClick={() => retry(file.id)} className="text-xs text-blue-600 hover:underline">Retry</button>
          )}
          <button onClick={() => remove(file.id)} className="text-xs text-gray-500 hover:underline right-1">×</button>
        </div>
      )
    }
  ];

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

        <div className="flex justify-center items-center">
          <div className="relative h-[450px] w-full overflow-y-auto rounded-xl ">
            <Suspense fallback={<div className="text-center text-gray-500">Upload List will appear here...</div>}>
              <UploadList files={files} onRetry={retry} onRemove={remove} columns={uploadColumns} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  )
}

export default UploadPage 