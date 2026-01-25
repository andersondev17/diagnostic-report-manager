'use client'

import Link from "next/link"

interface ErrorProps {
  reset: () => void
}

const Error = ({ reset }: ErrorProps) => {

  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center gap-6">
      <div className="space-y-4">
        <h1 className="text-6xl font-bold text-red-600">500</h1>
        <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-gray-500">
          Algo salió mal
        </span>
        <p className="text-lg text-gray-600 max-w-md">
          Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
        </p>
      </div>

      <div className="flex gap-4 mt-4">
        <button
          onClick={reset}
          className="rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white transition hover:opacity-90"
        >
          Intentar de nuevo
        </button>
        <Link
          href="/"
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  )
}

export default Error