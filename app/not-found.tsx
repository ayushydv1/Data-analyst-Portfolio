import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <p className="text-xs font-medium tracking-[0.22em] text-accent uppercase">
        404
      </p>
      <h1 className="font-display mt-4 text-4xl font-semibold tracking-tight text-fg">
        This page is not on the model.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        The URL does not match a report. Head back to the portfolio.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-sm font-medium text-bg"
      >
        Back home
      </Link>
    </main>
  );
}
