import Link from "next/link";
import {  HiOutlineArrowLeft } from "react-icons/hi2";
import { HiOutlineDocumentSearch } from "react-icons/hi";


export default function NotFound() {
  return (
    <main className="min-h-[calc(100vh-65px)] w-full flex flex-col items-center justify-center bg-neutral-bg px-6 py-12 text-center">
      <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6 border border-primary/20 shadow-xs">
        <HiOutlineDocumentSearch size={32} />
      </div>

      <span className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-2">
        404 Error
      </span>

      <h1 className="text-3xl md:text-4xl font-bold text-neutral-text mb-3">
        Page not found
      </h1>

      <p className="text-sm text-neutral-text/60 max-w-md mb-8 leading-relaxed">
        Sorry, the page or study material you're looking for doesn't exist or might have been moved.
      </p>

      <div className="flex flex-wrap gap-3 justify-center">
        <Link href="/">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-hover shadow-xs"
          >
            <HiOutlineArrowLeft size={16} />
            Back to Home
          </button>
        </Link>
        <Link href="/materials/manage">
          <button
            type="button"
            className="rounded-xl border border-neutral-border bg-white px-6 py-2.5 text-sm font-semibold text-neutral-text transition hover:border-primary/40 hover:text-primary shadow-xs"
          >
            My Materials
          </button>
        </Link>
      </div>
    </main>
  );
}