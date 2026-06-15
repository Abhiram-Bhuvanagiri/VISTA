"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

import Link from "next/link";
import { destinations } from "../data/destinations";
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
      className="group flex flex-col cursor-pointer select-none"
    >
      {/* Image Container */}
      <div className="w-full aspect-[4/5] rounded-3xl mb-6 shadow-sm p-4 md:p-6 bg-white/50 box-border">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-105"
            style={{ backgroundImage: `url(${dest.image})` }}
          />
          
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-1.5 bg-white/20 backdrop-blur-md text-white text-[10px] font-medium tracking-widest uppercase px-3 py-1.5 rounded-full border border-white/20 shadow-lg">
              <MapPin className="w-3 h-3" />
              {dest.tag}
            </span>
          </div>
          
          {/* Subtle overlay */}
          <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10 pointer-events-none" />
        </div>
      </div>

      {/* Info Container */}
      <div className="flex flex-col px-2 pt-4">
        <div className="flex items-start justify-between gap-4" style={{ marginTop: "30px" }}>
          <div>
            <h3 className="text-2xl font-light leading-[0.82] tracking-[-0.06em] text-[#1a1814] mb-1 group-hover:text-[#6a6560] transition-colors duration-300">
              {dest.title}
            </h3>
            <p className="text-sm text-[#9a958e] font-medium tracking-wide">
              {dest.country}
            </p>
          </div>
          
          <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#e8e4de] text-[#1a1814] group-hover:bg-[#1a1814] group-hover:text-white transition-all duration-300 shrink-0">
             <ArrowRight className="w-4 h-4 -rotate-45 group-hover:rotate-0 transition-transform duration-500 ease-out" />
          </div>
        </div>
        
        <div className="mt-5 pt-5 border-t border-[#e8e4de]/60 flex items-center justify-between">
           <span className="text-[11px] uppercase tracking-[0.25em] text-[#6a6560] font-semibold">{dest.duration}</span>
           <span className="text-[10px] uppercase tracking-widest text-[#1a1814] font-bold group-hover:tracking-[0.3em] transition-all duration-300">Explore</span>
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
      className="w-full bg-[#fdfcfa] py-[5px] px-4 sm:px-8 md:px-24"
    >
      <div style={{ maxWidth: "2560px", margin: "0 auto", padding: "20px 40px" }}>
        {/* Top label */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#9a958e] mb-0 flex items-center gap-3">
          <span className="w-8 h-px bg-[#9a958e]" />
          Destinations
        </p>

        {/* Header */}
        <div className="places-header flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <h2 
              className="text-[clamp(2.5rem,5.5vw,5.5rem)] font-light leading-[0.82] tracking-[-0.06em] text-[#1a1814]"
              style={{
                display: "block",
                marginBlockStart: "0px",
                marginTop: "0px",
                marginBlockEnd: "0.83em",
                marginInlineStart: "0px",
                marginInlineEnd: "0px",
                paddingTop: "0px"
              }}
            >
              Signature <span className="font-semibold italic">Escapes</span>
            </h2>
          </div>
          <button 
            onClick={() => alert("Navigating to All Destinations...")}
            className="flex-shrink-0 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase border border-[#1a1814] hover:bg-[#1a1814] hover:text-white transition-all duration-300 px-6 py-3 rounded-full"
            style={{ marginBottom: "10px" }}
          >
            All Destinations <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Cards grid — 2 col on desktop */}
        <div className="dest-grid grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-x-12 lg:gap-y-20">
          {destinations.map((d) => (
            <Link href={`/destinations/${d.id}`} key={d.id} className="dest-card block">
              <DestCard dest={d} />
            </Link>
          ))}
        </div>

        {/* Bottom strip */}
        <div className="flex items-center justify-center">
          <p className="text-[#9a958e] font-light tracking-wide" style={{ marginTop: "50px", fontSize: "24px" }}>
            and <span className="font-medium text-[#1a1814]">70+</span> more destinations curated for you
          </p>
        </div>
      </div>
    </section>
  );
}
