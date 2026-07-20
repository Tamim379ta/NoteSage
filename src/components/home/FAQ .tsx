"use client";

import { useState } from "react";
import { FadeUp } from "@/components/animations/FadeUp";
import { HiPlus, HiMinus } from "react-icons/hi2";

const faqs = [
  {
    question: "What file types does NoteSage support?",
    answer:
      "NoteSage currently supports PDF documents as well as plain text files. You can upload lecture notes, textbook chapters, or research papers in these formats.",
  },
  {
    question: "How accurate are the AI-generated summaries?",
    answer:
      "Summaries are extracted directly from your uploaded document's contents. This ensures that key concepts stay grounded in your exact study material.",
  },
  {
    question: "Can I choose to make my documents public or keep them private?",
    answer:
      "Yes! When uploading a document, you can toggle its visibility. Public documents appear in the community Explore tab, while private documents remain visible only to you.",
  },
  {
    question: "How does the AI Chat assistant use my document?",
    answer:
      "When you initiate a chat with a specific document attached, NoteSage uses that document as its primary reference to ground its answers, ensuring accurate explanations.",
  },
  {
    question: "Can I chat with NoteSage without attaching a document?",
    answer:
      "Absolutely! You can use NoteSage as a general AI tutor anytime to ask general study questions or brainstorm topics.",
  },
  {
    question: "Is my data safe and private?",
    answer:
      "Your uploaded documents and personal chats are securely stored and accessible only according to your privacy settings. You can manage or delete your materials at any time.",
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