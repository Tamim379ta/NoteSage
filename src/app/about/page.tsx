import Link from "next/link";
import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineSparkles,
  HiOutlineLightBulb,
  HiOutlineHeart,
  HiOutlineShieldCheck,
} from "react-icons/hi2";

const values = [
  {
    icon: <HiOutlineLightBulb size={22} />,
    title: "Learning first",
    description:
      "Every feature we build starts with one question: does this help students actually understand and retain what they read?",
  },
  {
    icon: <HiOutlineSparkles size={22} />,
    title: "AI as an intelligent assistant",
    description:
      "We believe AI should guide you through complex study materials — generating concise summaries and answering questions in exact context.",
  },
  {
    icon: <HiOutlineHeart size={22} />,
    title: "Built with students",
    description:
      "NoteSage was designed with real student feedback from day one. If it doesn't make reading and reviewing lectures faster, it doesn't ship.",
  },
  {
    icon: <HiOutlineShieldCheck size={22} />,
    title: "Privacy by default",
    description:
      "Your documents are yours. You control whether your study materials stay private or are shared publicly in the Explore directory.",
  },
];

const team = [
  {
    name: "Aiden Park",
    role: "Co-founder & CEO",
    avatar: "AP",
    bio: "Former CS student who spent more time building study tools than actually studying.",
  },
  {
    name: "Maya Osei",
    role: "Co-founder & CTO",
    avatar: "MO",
    bio: "ML engineer obsessed with making language models actually useful in education.",
  },
  {
    name: "Riya Sharma",
    role: "Head of Design",
    avatar: "RS",
    bio: "Believes great design is invisible — you just feel like the product understands you.",
  },
  {
    name: "Leo Tanaka",
    role: "Lead Engineer",
    avatar: "LT",
    bio: "Builds fast, breaks nothing. Somehow keeps everything running at 3am.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-neutral-bg">
      {/* Hero */}
      <div className="bg-white border-b border-neutral-border">
        <div className="max-w-7xl mx-auto px-6 py-20 text-center">
          <FadeUp>
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
              Our story
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-text mt-3 mb-4">
              We built the study tool<br />we wish we had.
            </h1>
            <p className="text-neutral-text/60 text-base max-w-xl mx-auto">
              NoteSage started as a side project between students who were tired of drowning in 50-page PDF slides and textbooks right before exam night.
            </p>
          </FadeUp>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        {/* Mission */}
        <FadeUp>
          <div className="bg-primary rounded-3xl px-8 py-14 text-center">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/50">
              Our mission
            </span>
            <h2 className="text-2xl md:text-3xl font-bold text-white mt-3 max-w-2xl mx-auto leading-snug">
              Make deep understanding accessible to every student by transforming long documents into instant summaries and interactive chats.
            </h2>
          </div>
        </FadeUp>

        {/* Values */}
        <div>
          <FadeUp className="text-center mb-12">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
              What we believe
            </span>
            <h2 className="text-3xl font-bold text-neutral-text mt-3">Our values</h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <FadeUp key={v.title} delay={i * 0.1}>
                <div className="h-full bg-white border border-neutral-border rounded-2xl p-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {v.icon}
                  </div>
                  <h3 className="text-base font-bold text-neutral-text mb-2">{v.title}</h3>
                  <p className="text-sm text-neutral-text/60 leading-relaxed">{v.description}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* Team */}
        <div>
          <FadeUp className="text-center mb-12">
            <span className="font-mono text-xs tracking-[0.2em] uppercase text-primary">
              The people
            </span>
            <h2 className="text-3xl font-bold text-neutral-text mt-3">Meet the team</h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <FadeUp key={member.name} delay={i * 0.1}>
                <div className="h-full bg-white border border-neutral-border rounded-2xl p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary text-white text-lg font-bold flex items-center justify-center mx-auto mb-4">
                    {member.avatar}
                  </div>
                  <h3 className="text-sm font-bold text-neutral-text">{member.name}</h3>
                  <p className="text-xs text-primary mb-3">{member.role}</p>
                  <p className="text-xs text-neutral-text/50 leading-relaxed">{member.bio}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* CTA */}
        <FadeUp>
          <div className="text-center bg-white border border-neutral-border rounded-2xl py-14 px-6">
            <h2 className="text-2xl font-bold text-neutral-text mb-3">
              Ready to study smarter?
            </h2>
            <p className="text-sm text-neutral-text/60 mb-8">
              Join thousands of students already using NoteSage to summarize notes and chat with their materials.
            </p>
            <Link href="/register">
              <button
                type="button"
                className="rounded-xl bg-primary text-white px-8 py-3 text-sm font-semibold hover:bg-primary-hover transition-colors"
              >
                Get started free
              </button>
            </Link>
          </div>
        </FadeUp>
      </div>
    </main>
  );
}