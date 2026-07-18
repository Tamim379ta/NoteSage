import { HiOutlineCloudArrowUp, HiOutlineSparkles, HiOutlineAcademicCap } from "react-icons/hi2";
import { FadeUp } from "@/components/animations/FadeUp";

const steps = [
  {
    icon: <HiOutlineCloudArrowUp size={28} />,
    step: "01",
    title: "Upload your notes",
    description: "Drop in a PDF, DOCX, or plain text file — lecture notes, textbook chapters, anything you study from.",
  },
  {
    icon: <HiOutlineSparkles size={28} />,
    step: "02",
    title: "AI does the heavy lifting",
    description: "NoteSage reads your material and generates a summary, flashcard set, and quiz — in seconds.",
  },
  {
    icon: <HiOutlineAcademicCap size={28} />,
    step: "03",
    title: "Study smarter",
    description: "Work through flashcards, take the quiz, and chat with the AI tutor when you get stuck.",
  },
];


export function HowItWorks() {
  return (
    <section className="w-full py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
            Simple by design
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-text mt-3">
            From notes to mastery in 3 steps
          </h2>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, i) => (
            <FadeUp key={step.step} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl border border-neutral-border bg-neutral-bg">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                  {step.icon}
                </div>
                <span className="font-mono text-xs text-primary/60 mb-2">{step.step}</span>
                <h3 className="text-lg font-bold text-neutral-text mb-3">{step.title}</h3>
                <p className="text-sm text-neutral-text/60 leading-relaxed">{step.description}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}