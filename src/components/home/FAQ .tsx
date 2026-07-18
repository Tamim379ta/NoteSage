"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { HiPlus, HiMinus } from "react-icons/hi2";

const faqs = [
  {
    question: "What file types does NoteSage support?",
    answer:
      "NoteSage supports PDF, DOCX, and plain TXT files. You can upload lecture notes, textbook chapters, case briefs, or any study material in these formats.",
  },
  {
    question: "How accurate are the AI-generated summaries?",
    answer:
      "The summaries are generated directly from your uploaded content — not from general knowledge. This means they stay accurate and relevant to your specific material, not a generic topic overview.",
  },
  {
    question: "Can I edit the flashcards and quizzes after they're generated?",
    answer:
      "Yes — every flashcard and quiz question is editable. You can tweak wording, remove irrelevant cards, or add your own manually.",
  },
  {
    question: "Is my data private?",
    answer:
      "Your uploaded documents are only used to generate your study material and are never shared with other users or used to train AI models. You can delete your files at any time.",
  },
  {
    question: "Does the AI chat know what's in my notes?",
    answer:
      "Yes. When you open the AI chat from a document, it has full context of that document's content. You can ask it to explain a concept, quiz you, or clarify something confusing — and it answers based on your actual notes.",
  },
  {
    question: "Is NoteSage free to use?",
    answer:
      "NoteSage has a free tier that lets you process up to 5 documents per month. For unlimited uploads, priority processing, and export features, you can upgrade to a paid plan anytime.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-neutral-border rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-neutral-bg transition-colors"
      >
        <span className="text-sm font-semibold text-neutral-text pr-4">
          {question}
        </span>
        <span className="text-primary flex-shrink-0">
          {open ? <HiMinus size={18} /> : <HiPlus size={18} />}
        </span>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="px-6 pb-5 text-sm text-neutral-text/60 leading-relaxed border-t border-neutral-border pt-4">
          {answer}
        </p>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="w-full py-24 bg-neutral-bg">
      <div className="max-w-3xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
            Got questions?
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-text mt-3">
            Frequently asked questions
          </h2>
          <p className="text-neutral-text/60 mt-4 text-sm">
            Can't find what you're looking for?{" "}
            <a href="/contact" className="text-primary hover:underline font-medium">
              Reach out to us.
            </a>
          </p>
        </FadeUp>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <FadeUp key={faq.question} delay={i * 0.07}>
              <FAQItem question={faq.question} answer={faq.answer} />
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}