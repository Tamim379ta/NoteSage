import { FadeUp } from "@/components/animations/FadeUp";

const stats = [
  { value: "50K+", label: "Students enrolled" },
  { value: "2M+", label: "Notes processed" },
  { value: "8M+", label: "Flashcards generated" },
  { value: "95%", label: "Report better grades" },
];

export function Stats() {
  return (
    <section className="w-full py-24 bg-primary">
      <div className="max-w-7xl mx-auto px-6">
        <FadeUp className="text-center mb-16">
          <span className="font-mono text-xs tracking-[0.2em] uppercase text-white/60">
            By the numbers
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3">
            Trusted by students worldwide
          </h2>
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.1}>
              <div className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/10 border border-white/20">
                <span className="text-4xl md:text-5xl font-bold text-white mb-2">
                  {stat.value}
                </span>
                <span className="text-sm text-white/60">{stat.label}</span>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}