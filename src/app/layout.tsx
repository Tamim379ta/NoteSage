import type { Metadata } from "next";
import "./globals.css";
import { Navbar,  } from "@/components/shared/Navbar";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "Notesage",
  description: "AI-powered study companion — turn your notes into summaries, quizzes, and flashcards.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-neutral-bg text-neutral-text">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}