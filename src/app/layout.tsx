import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";
import { FooterWrapper } from "@/components/shared/FooterWrapper";

export const metadata: Metadata = {
  title: "Notesage",
  description: "AI-powered study companion — turn your notes into summaries and interactive AI chats.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-bg text-neutral-text flex flex-col min-h-screen">
        <Navbar />
        {children}
        <FooterWrapper />
      </body>
    </html>
  );
}