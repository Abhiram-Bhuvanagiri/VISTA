"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "12K+", label: "Happy Travelers" },
  { number: "80+", label: "Destinations" },
  { number: "15", label: "Years of Expertise" },
  { number: "4.9★", label: "Average Rating" },
];

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".stat-item",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="w-full bg-[#1a1814] py-24 md:py-32 px-8 md:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-0 divide-y-2 md:divide-y-0 md:divide-x divide-white/10">
        {stats.map((s, i) => (
          <div key={i} className="stat-item flex flex-col items-center justify-center py-8 md:py-0 gap-3 group cursor-default">
            <span className="text-[clamp(2.5rem,5vw,4.5rem)] font-light text-white leading-none tracking-tight group-hover:text-[#c8f0b0] transition-colors duration-500">
              {s.number}
            </span>
            <span className="text-xs uppercase tracking-[0.25em] text-white/40 font-medium">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
