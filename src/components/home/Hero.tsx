"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { HiSparkles } from "react-icons/hi2";

const fadeLeft = {
  hidden: { opacity: 0, x: -30 },
  show: { opacity: 1, x: 0 },
};

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="w-full min-h-[80vh] flex items-center">
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
            Turn messy notes into study material that actually sticks.
          </motion.h1>

          <motion.p
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="text-base md:text-lg text-neutral-text/70 max-w-md mb-8"
          >
            Upload your notes and NoteSage turns them into summaries,
            flashcards, and quizzes — then keeps quizzing you until it sticks.
          </motion.p>

          <motion.div
            variants={fadeLeft}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link href="/register">
              <button
                type="button"
                className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition hover:opacity-90"
              >
                Start studying free
              </button>
            </Link>
            <Link href="/explore">
              <button
                type="button"
                className="rounded-md border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-primary hover:text-primary"
              >
                See it in action
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Right: signature element — note becomes flashcard */}
        <div className="relative h-[360px] hidden md:block">
          {/* Messy note card */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -12 }}
            animate={{ opacity: 1, x: 0, rotate: -8 }}
            transition={{ duration: 0.6 }}
            className="absolute left-2 top-6 w-[220px] h-[270px] bg-white border border-neutral-border rounded-lg shadow-md p-5"
          >
            <div className="space-y-3">
              <div className="h-2 w-3/4 bg-neutral-text/20 rounded-full" />
              <div className="h-2 w-full bg-neutral-text/20 rounded-full" />
              <div className="h-2 w-5/6 bg-accent/40 rounded-full" />
              <div className="h-2 w-2/3 bg-neutral-text/20 rounded-full" />
              <div className="h-2 w-full bg-neutral-text/20 rounded-full" />
              <div className="h-2 w-1/2 bg-accent/40 rounded-full" />
              <div className="h-2 w-3/4 bg-neutral-text/20 rounded-full" />
            </div>
            <span className="absolute bottom-3 right-4 text-[10px] font-mono text-neutral-text/40">
              lecture_09.pdf
            </span>
          </motion.div>

          {/* Center spark badge */}
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

          {/* Flashcard result */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 12 }}
            animate={{ opacity: 1, x: 0, rotate: 6 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="absolute right-2 top-0 w-[230px] h-[290px] bg-primary text-white rounded-2xl shadow-xl p-6 flex flex-col justify-between"
          >
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-white/60">
                Flashcard · 3 of 12
              </span>
              <p className="mt-4 text-lg font-semibold leading-snug">
                What triggers the light-dependent reactions in photosynthesis?
              </p>
            </div>
            <span className="text-xs text-white/60">Tap to flip →</span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}