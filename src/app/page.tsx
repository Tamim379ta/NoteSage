import { CTA } from "@/components/home/CTA ";
import { FAQ } from "@/components/home/FAQ ";
import { Features } from "@/components/home/Features";
import { Hero } from "@/components/home/Hero";
import { HowItWorks } from "@/components/home/HowItWork";
import { Stats } from "@/components/home/Stats ";
import { Testimonials } from "@/components/home/Testimonials ";

export default function Home() {
  return (
    <>
      <Hero />
      <HowItWorks/>
      <Features/>
      <Stats/>
      <Testimonials/>
      <FAQ/>
      <CTA/>
    </>
  );
}
