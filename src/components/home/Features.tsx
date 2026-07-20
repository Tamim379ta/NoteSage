import { FadeUp } from "@/components/animations/FadeUp";
import {
  HiOutlineDocumentText,
  HiOutlineChatBubbleLeftRight,
  HiOutlineFolderOpen,
  HiOutlineGlobeAlt,
  HiOutlineBolt,
  HiOutlineArrowDownTray,
} from "react-icons/hi2";

const features = [
  {
    icon: <HiOutlineDocumentText size={24} />,
    title: "Instant AI Summaries",
    description: "Upload any lecture PDF or notes to instantly generate clear 5-7 point summaries focused on key concepts.",
  },
  {
    icon: <HiOutlineChatBubbleLeftRight size={24} />,
    title: "Context-Aware AI Tutor",
    description: "Chat with NoteSage anytime. It references your uploaded documents directly to answer questions precisely.",
  },
  {
    icon: <HiOutlineFolderOpen size={24} />,
    title: "Organized Study Library",
    description: "Keep all your PDFs, lecture slides, and subject materials neatly organized in one accessible space.",
  },
  {
    icon: <HiOutlineGlobeAlt size={24} />,
    title: "Explore Public Materials",
    description: "Browse and discover shared study materials from other students organized by categories and subjects.",
  },
  {
    icon: <HiOutlineBolt size={24} />,
    title: "Lightning Fast Responses",
    description: "Powered by high-performance Llama 3 models so you get instant summaries and real-time streaming answers.",
  },
  {
    icon: <HiOutlineArrowDownTray size={24} />,
    title: "Easy Material Sharing",
    description: "Toggle privacy settings on your uploaded documents to share notes seamlessly with peers or keep them private.",
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
            Built for effortless document-based learning
          </h2>
          <p className="text-neutral-text/60 mt-4 max-w-xl mx-auto text-sm">
            Upload your materials, get instant summaries, and chat directly with your notes to master any topic.
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