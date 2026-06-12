"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const destinations = [
  {
    id: 1,
    title: "The Swiss Alps",
    country: "Switzerland",
    tag: "Mountain Escape",
    duration: "7–14 Days",
    image:
      "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=1800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Santorini",
    country: "Greece",
    tag: "Island Paradise",
    duration: "5–10 Days",
    image:
      "https://images.unsplash.com/photo-1533105079780-92b9be482077?q=80&w=1800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Kyoto",
    country: "Japan",
    tag: "Cultural Immersion",
    duration: "7–12 Days",
    image:
      "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Amalfi Coast",
    country: "Italy",
    tag: "Coastal Luxury",
    duration: "6–10 Days",
    image:
      "https://images.unsplash.com/photo-1612698093158-e07ac200d44e?q=80&w=1800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Bali",
    country: "Indonesia",
    tag: "Tropical Sanctuary",
    duration: "8–14 Days",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1800&auto=format&fit=crop",
  },
  {
    id: 6,
    title: "Patagonia",
    country: "Argentina",
    tag: "Wilderness Adventure",
    duration: "10–21 Days",
    image:
      "https://images.unsplash.com/photo-1501854140801-50d01698950b?q=80&w=1800&auto=format&fit=crop",
  },
];

function DestCard({
  dest,
}: {
  dest: (typeof destinations)[0];
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative flex flex-col overflow-hidden rounded-2xl bg-gray-100 aspect-[3/4] cursor-pointer select-none"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-in-out group-hover:scale-110"
        style={{ backgroundImage: `url(${dest.image})` }}
      />

      {/* Dark gradient always present at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10" />

      {/* Top pill tag */}
      <div className="absolute top-5 left-5 z-20">
        <span className="inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20">
          <MapPin className="w-2.5 h-2.5" />
          {dest.tag}
        </span>
      </div>

      {/* Bottom content */}
      <div className="relative z-10 flex flex-col justify-end h-full p-6 text-white">
        {/* Duration — slides up on hover */}
        <p
          className={`text-[10px] uppercase tracking-[0.25em] text-white/50 mb-2 transition-all duration-500 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
        >
          {dest.duration}
        </p>

        <h3 className="text-2xl md:text-3xl font-medium leading-tight">{dest.title}</h3>
        <p className="text-sm text-white/60 mt-1">{dest.country}</p>

        {/* Animated underline */}
        <div className="mt-5 flex items-center justify-between">
          <div
            className={`h-px bg-white/40 transition-all duration-700 ${
              hovered ? "w-full" : "w-0"
            }`}
          />
          <div
            className={`ml-4 w-8 h-8 rounded-full bg-white flex items-center justify-center flex-shrink-0 transition-all duration-500 ${
              hovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <ArrowRight className="w-4 h-4 text-[#1a1814]" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Places() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".places-header",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".dest-card",
        { y: 80, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: { amount: 0.6, from: "start" },
          scrollTrigger: {
            trigger: ".dest-grid",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="places"
      ref={sectionRef}
      className="w-full bg-[#fdfcfa] py-32 md:py-48 px-8 md:px-24"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="places-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-36">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a958e] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#9a958e]" />
              Destinations
            </p>
            <h2 className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-light leading-none text-[#1a1814]">
              Signature <span className="font-semibold italic">Escapes</span>
            </h2>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase pb-1 border-b border-[#1a1814] hover:text-[#6a6560] hover:border-[#6a6560] transition-colors duration-300">
            All Destinations <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cards grid — 3 col on desktop */}
        <div className="dest-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.map((d) => (
            <div key={d.id} className="dest-card">
              <DestCard dest={d} />
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="mt-16 flex items-center justify-center">
          <p className="text-sm text-[#9a958e] font-light tracking-wide">
            and <span className="font-medium text-[#1a1814]">70+</span> more destinations curated for you
          </p>
        </div>
      </div>
    </section>
  );
}
