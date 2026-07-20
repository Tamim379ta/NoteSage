"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiSparkles, HiPaperAirplane } from "react-icons/hi2";

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full min-h-[80vh] flex items-center py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: copy */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: shouldReduceMotion ? 0 : 0.15,
              },
            },
          }}
        >
          <motion.span
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="inline-block font-mono text-xs tracking-[0.2em] uppercase text-primary mb-4"
          >
            Study smarter, not longer
          </motion.span>

          <motion.h1
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] text-neutral-text mb-6"
          >
            Turn long PDFs into instant summaries and interactive chats.
          </motion.h1>

          <motion.p
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-neutral-text/70 max-w-md mb-8"
          >
            Upload your study materials, get concise AI-generated summaries, and ask NoteSage anything about your documents in real-time.
          </motion.p>

          <motion.div
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/register">
              <button
                type="button"
                className="rounded-md bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90 shadow-sm"
              >
                Start studying free
              </button>
            </Link>
            <Link href="/explore">
              <button
                type="button"
                className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 transition hover:border-primary hover:text-primary"
              >
                Explore materials
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: PDF Document -> AI Chat preview */}
        <div className="relative h-[380px] hidden md:block">
          {/* Uploaded PDF preview card */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -8 }}
            animate={{ opacity: 1, x: 0, rotate: -6 }}
            transition={{ duration: 0.6 }}
            className="absolute left-2 top-8 w-[230px] h-[280px] bg-white border border-neutral-200 rounded-xl shadow-md p-5 flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center gap-2 mb-2">
                <span className="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-0.5 rounded">PDF</span>
                <span className="text-xs font-medium text-neutral-700 truncate">lecture_notes.pdf</span>
              </div>
              <div className="h-2 w-3/4 bg-neutral-200 rounded-full" />
              <div className="h-2 w-full bg-neutral-200 rounded-full" />
              <div className="h-2 w-5/6 bg-primary/20 rounded-full" />
              <div className="h-2 w-2/3 bg-neutral-200 rounded-full" />
              <div className="h-2 w-full bg-neutral-200 rounded-full" />
              <div className="h-2 w-1/2 bg-primary/20 rounded-full" />
            </div>
            <div className="bg-neutral-50 p-2 rounded text-[11px] text-neutral-500 border border-neutral-100">
              ⚡ Summary Ready
            </div>
          </motion.div>

          {/* Sparkle badge connector */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={
              shouldReduceMotion
                ? { opacity: 1, scale: 1 }
                : { opacity: 1, scale: [1, 1.12, 1] }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0.4, delay: 0.3 }
                : { duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
            }
            className="absolute z-10 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-3 shadow-lg"
          >
            <HiSparkles size={22} />
          </motion.div>

          {/* Interactive Chat window result */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 6 }}
            animate={{ opacity: 1, x: 0, rotate: 4 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute right-2 top-2 w-[260px] h-[330px] bg-neutral-900 text-white rounded-2xl shadow-xl p-4 flex flex-col justify-between border border-neutral-800"
          >
            {/* Header */}
            <div className="flex items-center gap-2 border-b border-neutral-800 pb-3">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-xs font-medium text-neutral-300">NoteSage AI Assistant</span>
            </div>

            {/* Chat Body */}
            <div className="space-y-3 my-2 text-xs">
              <div className="bg-neutral-800 text-neutral-200 p-2.5 rounded-lg rounded-tl-none self-start max-w-[85%]">
                How can I help with <span className="text-primary font-medium">lecture_notes.pdf</span>?
              </div>
              <div className="bg-primary text-white p-2.5 rounded-lg rounded-tr-none ml-auto max-w-[85%]">
                Summarize chapter 3 for me!
              </div>
            </div>

            {/* Input Bar */}
            <div className="flex items-center gap-2 bg-neutral-800 p-2 rounded-lg border border-neutral-700">
              <span className="text-[11px] text-neutral-400 flex-1">Ask a question...</span>
              <div className="p-1.5 bg-primary text-white rounded-md">
                <HiPaperAirplane size={12} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}