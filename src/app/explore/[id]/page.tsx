import Link from "next/link";
import { notFound } from "next/navigation";
import { studySets } from "@/lib/data/study-sets";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineRectangleStack,
  HiOutlineClipboardDocumentList,
  HiOutlineArrowLeft,
  HiOutlineBookOpen,
  HiOutlineChatBubbleLeftRight,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

const difficultyColor: Record<string, string> = {
  Beginner: "bg-green-100 text-green-700",
  Intermediate: "bg-amber-100 text-amber-700",
  Advanced: "bg-red-100 text-red-700",
};

// Related sets — same category, different id
function getRelated(id: string) {
  const current = studySets.find((s) => s.id === id);
  if (!current) return [];
  return studySets.filter((s) => s.category === current.category && s.id !== id).slice(0, 4);
}

export default async function MaterialDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const set = studySets.find((s) => s.id === id);
  if (!set) notFound();

  const related = getRelated(id);

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

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Header card */}
            <FadeUp>
              <div className="bg-white border border-neutral-border rounded-2xl p-8">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-3 py-1 rounded-full">
                    {set.category}
                  </span>
                  <span className={`text-xs font-medium px-3 py-1 rounded-full ${difficultyColor[set.difficulty]}`}>
                    {set.difficulty}
                  </span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-neutral-text mb-3">
                  {set.title}
                </h1>
                <p className="text-sm text-neutral-text/60 leading-relaxed mb-6">
                  {set.description}
                </p>

                {/* Meta row */}
                <div className="flex flex-wrap gap-6 text-sm text-neutral-text/50 border-t border-neutral-border pt-6">
                  <span className="flex items-center gap-2">
                    <HiOutlineRectangleStack size={16} className="text-primary" />
                    {set.flashcards} flashcards
                  </span>
                  <span className="flex items-center gap-2">
                    <HiOutlineClipboardDocumentList size={16} className="text-primary" />
                    {set.quizQuestions} quiz questions
                  </span>
                  <span className="flex items-center gap-2">
                    <HiOutlineBookOpen size={16} className="text-primary" />
                    {set.category}
                  </span>
                  <span className="text-xs">
                    Uploaded {new Date(set.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
                  </span>
                </div>
              </div>
            </FadeUp>

            {/* Overview */}
            <FadeUp delay={0.1}>
              <div className="bg-white border border-neutral-border rounded-2xl p-8">
                <h2 className="text-base font-bold text-neutral-text mb-4">Overview</h2>
                <p className="text-sm text-neutral-text/60 leading-relaxed">
                  This study set was generated from uploaded course material on{" "}
                  <span className="text-neutral-text font-medium">{set.category}</span>. It covers
                  the core concepts a student needs to understand at the{" "}
                  <span className="text-neutral-text font-medium">{set.difficulty}</span> level,
                  broken down into digestible flashcards and a structured quiz to test retention.
                </p>
                <p className="text-sm text-neutral-text/60 leading-relaxed mt-4">
                  Work through the flashcards first to build familiarity, then take the quiz to
                  identify gaps. Use the AI chat if you get stuck on any concept — it has full
                  context of this material.
                </p>
              </div>
            </FadeUp>

            {/* What's inside */}
            <FadeUp delay={0.15}>
              <div className="bg-white border border-neutral-border rounded-2xl p-8">
                <h2 className="text-base font-bold text-neutral-text mb-6">What&apos;s inside</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="flex flex-col items-center text-center p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <HiOutlineBookOpen size={24} className="text-primary mb-3" />
                    <span className="text-2xl font-bold text-neutral-text">1</span>
                    <span className="text-xs text-neutral-text/50 mt-1">AI Summary</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <HiOutlineRectangleStack size={24} className="text-primary mb-3" />
                    <span className="text-2xl font-bold text-neutral-text">{set.flashcards}</span>
                    <span className="text-xs text-neutral-text/50 mt-1">Flashcards</span>
                  </div>
                  <div className="flex flex-col items-center text-center p-5 rounded-xl bg-primary/5 border border-primary/10">
                    <HiOutlineClipboardDocumentList size={24} className="text-primary mb-3" />
                    <span className="text-2xl font-bold text-neutral-text">{set.quizQuestions}</span>
                    <span className="text-xs text-neutral-text/50 mt-1">Quiz Questions</span>
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>

          {/* Right: sidebar */}
          <div className="space-y-5">
            {/* Author */}
            <FadeUp delay={0.1}>
              <div className="bg-white border border-neutral-border rounded-2xl p-6">
                <p className="text-xs font-medium text-neutral-text/40 uppercase tracking-wider mb-4">
                  Uploaded by
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center">
                    {set.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-neutral-text">{set.uploadedBy}</p>
                    <p className="text-xs text-neutral-text/40">{set.category} student</p>
                  </div>
                </div>
              </div>
            </FadeUp>

            {/* CTA card */}
            <FadeUp delay={0.15}>
              <div className="bg-primary rounded-2xl p-6 text-white">
                <h3 className="text-base font-bold mb-2">Ready to study?</h3>
                <p className="text-sm text-white/70 mb-6">
                  Start with flashcards, test yourself with the quiz, then ask the AI anything you don&apos;t understand.
                </p>
                <div className="flex flex-col gap-3">
                  <Link href={`/materials/${set.id}`}>
                    <button
                      type="button"
                      className="w-full rounded-xl bg-white text-primary px-4 py-2.5 text-sm font-semibold hover:opacity-90 transition"
                    >
                      Start studying
                    </button>
                  </Link>
                  <Link href="/chat">
                    <button
                      type="button"
                      className="w-full rounded-xl border border-white/30 text-white px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
                    >
                      <HiOutlineChatBubbleLeftRight size={16} />
                      Ask AI tutor
                    </button>
                  </Link>
                  <button
                    type="button"
                    className="w-full rounded-xl border border-white/30 text-white px-4 py-2.5 text-sm font-semibold hover:bg-white/10 transition flex items-center justify-center gap-2"
                  >
                    <HiOutlineArrowDownTray size={16} />
                    Download summary
                  </button>
                </div>
              </div>
            </FadeUp>

            {/* Related */}
            {related.length > 0 && (
              <FadeUp delay={0.2}>
                <div className="bg-white border border-neutral-border rounded-2xl p-6">
                  <p className="text-xs font-medium text-neutral-text/40 uppercase tracking-wider mb-4">
                    Related sets
                  </p>
                  <div className="flex flex-col gap-3">
                    {related.map((r) => (
                      <Link key={r.id} href={`/materials/${r.id}`}>
                        <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-bg transition-colors cursor-pointer">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                            <HiOutlineBookOpen size={14} />
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-neutral-text line-clamp-2">
                              {r.title}
                            </p>
                            <p className="text-[10px] text-neutral-text/40 mt-1">
                              {r.flashcards} cards · {r.quizQuestions} questions
                            </p>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </FadeUp>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}