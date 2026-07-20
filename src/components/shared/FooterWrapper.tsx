"use client";

import { usePathname } from "next/navigation";
import { Footer } from "@/components/shared/Footer";

export function FooterWrapper() {
  const pathname = usePathname();
  const isChatPage = pathname === "/chat";

  if (isChatPage) return null;

  return <Footer />;
}