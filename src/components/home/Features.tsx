import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineDocumentText,
  HiOutlineRectangleStack,
  HiOutlineClipboardDocumentList,
  HiOutlineChatBubbleLeftRight,
  HiOutlineChartBar,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineDocumentText size={24} />,
    title: "AI Summaries",
    description: "Get the key points from any document in seconds — no more re-reading 40 pages the night before an exam.",
  },
  {
    icon: <HiOutlineRectangleStack size={24} />,
    title: "Smart Flashcards",
    description: "AI pulls the most important concepts and turns them into flashcards you can flip through anywhere.",
  },
  {
    icon: <HiOutlineClipboardDocumentList size={24} />,
    title: "Auto Quizzes",
    description: "Test yourself with AI-generated questions based on your actual notes — not generic practice questions.",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight size={24} />,
    title: "AI Tutor Chat",
    description: "Ask the AI anything about your uploaded material. It knows your notes and explains concepts clearly.",
  },
  {
    icon: <HiOutlineChartBar size={24} />,
    title: "Progress Tracking",
    description: "See which topics you've mastered and which need more work — with streaks to keep you consistent.",
  },
  {
    icon: <HiOutlineArrowDownTray size={24} />,
    title: "Export Summaries",
    description: "Download your AI-generated summaries as PDFs to review offline or share with classmates.",
  },
];

export function Features() {
  return (
    <section className="w-full py-24 bg-neutral-bg">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
            Everything you need
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-text mt-3">
            Built for students who actually want to learn
          </h2>
          <p className="text-neutral-text/60 mt-4 max-w-xl mx-auto text-sm">
            Every feature in NoteSage is designed around one goal — helping you retain what you study, not just read it.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.1}>
              <div className="h-full bg-white border border-neutral-border rounded-2xl p-6 hover:border-primary/40 hover:shadow-sm transition-all">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-base font-bold text-neutral-text mb-2">{feature.title}</h3>
                <p className="text-sm text-neutral-text/60 leading-relaxed">{feature.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}