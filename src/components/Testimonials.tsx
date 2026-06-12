"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote:
      "Vista transformed our honeymoon into something out of a dream. Every detail was flawless — from the private villa in Santorini to the sunset dinner on the water.",
    author: "Priya & Arjun Mehta",
    destination: "Santorini, Greece",
    avatar: "PM",
  },
  {
    quote:
      "I've traveled with many agencies, but Vista operates on a completely different level. The itinerary they built for our Japan trip was nothing short of extraordinary.",
    author: "James Whitmore",
    destination: "Kyoto, Japan",
    avatar: "JW",
  },
  {
    quote:
      "The 24/7 concierge service alone is worth every penny. They rearranged our entire schedule mid-trip without a single hiccup. Truly world class.",
    author: "Sofia Evangelou",
    destination: "Swiss Alps",
    avatar: "SE",
  },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testi-card",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
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
    <section ref={ref} className="w-full bg-[#f3f0eb] py-40 md:py-64 px-8 md:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="mb-40 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a958e] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#9a958e]" />
              Testimonials
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-none text-[#1a1814]">
              Travelers Who<br />
              <span className="font-semibold italic">Trust Vista</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="testi-card flex flex-col justify-between bg-white rounded-3xl p-10 group hover:-translate-y-2 hover:shadow-2xl transition-all duration-500"
            >
              <div>
                <p className="text-4xl text-[#c0bab1] leading-none mb-6">"</p>
                <p className="text-[#3a3630] leading-relaxed text-base font-light">
                  {t.quote}
                </p>
              </div>
              <div className="flex items-center gap-4 mt-10 pt-8 border-t border-[#e8e4de]">
                <div className="w-12 h-12 rounded-full bg-[#1a1814] flex items-center justify-center text-white text-sm font-medium flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1a1814]">{t.author}</p>
                  <p className="text-xs text-[#9a958e] tracking-wider">{t.destination}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
