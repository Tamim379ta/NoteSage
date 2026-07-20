import { HiOutlineSparkles } from "react-icons/hi2";

export default function Loading() {
  return (
    <div className="min-h-[calc(100vh-65px)] w-full flex flex-col items-center justify-center bg-neutral-bg px-6">
      <div className="relative flex items-center justify-center mb-6">
        {/* Pulsing background ring */}
        <div className="absolute w-16 h-16 rounded-2xl bg-primary/20 animate-ping" />
        
        {/* Center Sparkle Badge */}
        <div className="relative w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center shadow-lg">
          <HiOutlineSparkles size={28} className="animate-spin-slow" />
        </div>
      </div>

      <h3 className="text-base font-bold text-neutral-text mb-1">
        Loading NoteSage...
      </h3>
      <p className="text-xs text-neutral-text/50 animate-pulse">
        Fetching your study materials
      </p>
    </div>
  );
}