import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] flex-col items-center justify-center px-6 text-center">
      <span className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted-foreground">
        Error 404
      </span>
      <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
        Page not found
      </h1>
      <p className="mb-8 max-w-md text-base text-muted-foreground">
        Sorry, the page you’re looking for doesn’t exist or may have been moved.
      </p>

      <div className="flex gap-4">
        <Link
          href="/"
          className="rounded-lg bg-primary px-6 py-3 text-sm w-full font-medium text-primary-foreground transition hover:opacity-90"
        >
          Go home
        </Link>
      </div>
    </section>
  );
}
