import { FadeUp } from "@/components/animations/FadeUp";
import { HiStar } from "react-icons/hi2";
import Marquee from "react-fast-marquee";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Medical Student, Johns Hopkins",
    avatar: "SC",
    review:
      "I uploaded 3 months of anatomy PDFs and NoteSage generated clean, point-by-point summaries in under a minute. It saved me hours during exam review.",
  },
  {
    name: "Marcus Williams",
    role: "Computer Science, MIT",
    avatar: "MW",
    review:
      "The AI tutor actually understands my notes and explains complex code concepts in context. It's like having a study partner who read everything I did.",
  },
  {
    name: "Priya Patel",
    role: "Law Student, Harvard",
    avatar: "PP",
    review:
      "Case briefs used to take me hours to summarize. Now I upload the PDF and get a clean summary in seconds. NoteSage is non-negotiable for me.",
  },
  {
    name: "James Okafor",
    role: "Finance, LSE",
    avatar: "JO",
    review:
      "Being able to upload a lecture slide deck and immediately start asking the chatbot specific questions about formulas is an incredible feature.",
  },
  {
    name: "Lena Müller",
    role: "Biology, TU Berlin",
    avatar: "LM",
    review:
      "I was skeptical at first but the summaries are genuinely good. They don't miss important details and they're actually readable.",
  },
  {
    name: "Diego Ramirez",
    role: "History, UCLA",
    avatar: "DR",
    review:
      "Being able to chat with the AI about my notes and ask follow-up questions is a game changer. It remembers the context of my entire document.",
  },
  {
    name: "Aisha Kamara",
    role: "Nursing, University of Toronto",
    avatar: "AK",
    review:
      "I use NoteSage before every clinical rotation. The summaries help me quickly review what I need without drowning in textbook pages.",
  },
  {
    name: "Tom Fischer",
    role: "Economics, Oxford",
    avatar: "TF",
    review:
      "I love checking the Explore section to see public study materials uploaded by other students. It's a huge time saver for shared topics.",
  },
];

function TestimonialCard({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div className="w-[320px] flex flex-col justify-between bg-white border border-neutral-border rounded-2xl p-6 mx-3">
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, j) => (
          <HiStar key={j} size={16} className="text-accent" />
        ))}
      </div>
      <p className="text-sm text-neutral-text/70 leading-relaxed flex-1">
        &ldquo;{t.review}&rdquo;
      </p>
      <div className="flex items-center gap-3 mt-6">
        <div className="w-10 h-10 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center flex-shrink-0">
          {t.avatar}
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-text">{t.name}</p>
          <p className="text-xs text-neutral-text/50">{t.role}</p>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  const firstRow = testimonials.slice(0, 4);
  const secondRow = testimonials.slice(4);

  return (
    <section className="w-full py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
            Student stories
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-text mt-3">
            What students are saying
          </h2>
          <p className="text-neutral-text/60 mt-4 max-w-xl mx-auto text-sm">
            From med school to law school — students across every discipline use NoteSage to study less and retain more.
          </p>
        </FadeUp>
      </div>

      {/* Row 1 — left to right */}
      <FadeUp>
        <Marquee pauseOnHover speed={40} gradient gradientColor="#ffffff" gradientWidth={80}>
          {firstRow.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </FadeUp>

      {/* Row 2 — right to left (uncomment if you want to display both rows) */}
      {/* 
      <FadeUp delay={0.1} className="mt-4">
        <Marquee pauseOnHover speed={40} direction="right" gradient gradientColor="#ffffff" gradientWidth={80}>
          {secondRow.map((t) => (
            <TestimonialCard key={t.name} t={t} />
          ))}
        </Marquee>
      </FadeUp> 
      */}
    </section>
  );
}