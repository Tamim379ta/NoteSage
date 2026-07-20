import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import { HiSparkles } from "react-icons/hi2";

export function CTA() {
  return (
    <section className="w-full bg-white ">
      <FadeUp>
        <div className="relative bg-primary overflow-hidden">
          {/* Background blobs */}
          <div className="absolute top-0 left-0 w-72 h-72 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3 translate-y-1/3 pointer-events-none" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: copy */}
            <div className="text-left max-w-xl">
              <div className="inline-flex items-center gap-2 bg-white/10 text-white/70 text-xs font-mono tracking-widest uppercase rounded-full px-4 py-1.5 mb-4">
                <HiSparkles size={13} />
                Free to get started
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-3">
                Stop highlighting.<br />Start actually learning.
              </h2>
              <p className="text-white/60 text-sm">
                Upload your first document to generate instant summaries and start chatting with NoteSage in seconds.
              </p>
            </div>

            {/* Right: buttons */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-3 flex-shrink-0">
              <Link href="/register">
                <button
                  type="button"
                  className="w-full rounded-xl bg-white text-primary px-8 py-3 text-sm font-semibold transition hover:opacity-90"
                >
                  Get started for free
                </button>
              </Link>
              <Link href="/explore">
                <button
                  type="button"
                  className="w-full rounded-xl border border-white/30 text-white px-8 py-3 text-sm font-semibold transition hover:bg-white/10"
                >
                  Explore materials
                </button>
              </Link>
            </div>
          </div>
        </div>
      </FadeUp>
    </section>
  );
}