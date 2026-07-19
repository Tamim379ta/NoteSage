import { notFound } from "next/navigation";
import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineArrowLeft,
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineCalendar,
  HiOutlineTag,
} from "react-icons/hi2";

async function getDocument(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/documents/public/${id}`,
      { cache: "no-store" }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function MaterialDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDocument(id);

  if (!doc) notFound();

  return (
    <main className="min-h-screen bg-neutral-bg">
      {/* Back */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-neutral-text/50 hover:text-primary transition-colors"
          >
            <HiOutlineArrowLeft size={16} />
            Back to Explore
          </Link>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10 space-y-6">
        {/* Header */}
        <FadeUp>
          <div className="bg-white border border-neutral-border rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                {doc.category || "General"}
              </span>
              <span className="text-xs text-neutral-text/40 flex items-center gap-1">
                <HiOutlineCalendar size={12} />
                {new Date(doc.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            <h1 className="text-2xl md:text-3xl font-bold text-neutral-text mb-3">
              {doc.title}
            </h1>

            <div className="flex items-center gap-2 text-xs text-neutral-text/40 border-t border-neutral-border pt-4 mt-4">
              <HiOutlineDocumentText size={14} />
              {doc.fileType === "application/pdf" ? "PDF document" : "Text file"}
            </div>
          </div>
        </FadeUp>

        {/* Summary */}
        <FadeUp delay={0.1}>
          <div className="bg-white border border-neutral-border rounded-2xl p-8">
            <div className="flex items-center gap-2 mb-5">
              <HiOutlineTag size={16} className="text-primary" />
              <h2 className="text-base font-bold text-neutral-text">
                AI Summary
              </h2>
            </div>

            {doc.summary ? (
              <div className="space-y-3">
                {doc.summary
                  .split("\n")
                  .filter((line: string) => line.trim())
                  .map((line: string, i: number) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                      <p className="text-sm text-neutral-text/70 leading-relaxed">
                        {line.replace(/^[-•*]\s*/, "")}
                      </p>
                    </div>
                  ))}
              </div>
            ) : (
              <p className="text-sm text-neutral-text/40">
                Summary not available yet.
              </p>
            )}
          </div>
        </FadeUp>

        {/* CTA — Chat */}
        <FadeUp delay={0.15}>
          <div className="bg-primary rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-lg font-bold text-white mb-1">
                Have questions about this material?
              </h3>
              <p className="text-sm text-white/70">
                Chat with the AI tutor — it has full context of this document
                and can explain, clarify, or quiz you on anything.
              </p>
            </div>
            <Link href={`/chat?documentId=${doc._id}`} className="flex-shrink-0">
              <button
                type="button"
                className="flex items-center gap-2 rounded-xl bg-white text-primary px-6 py-3 text-sm font-semibold hover:opacity-90 transition"
              >
                <HiOutlineChatBubbleLeftRight size={16} />
                Chat about this
              </button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}