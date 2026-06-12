"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    id: "01",
    title: "Bespoke Itineraries",
    desc: "Hand-crafted journeys designed by our travel architects to flawlessly match your desires.",
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1800&auto=format&fit=crop", // Aircraft / Above Clouds
    colSpan: "md:col-span-8",
  },
  {
    id: "02",
    title: "Luxury Resorts",
    desc: "Exclusive access to the world's most breathtaking private villas and boutique hotels.",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=1800&auto=format&fit=crop", // Maldives overwater villa
    colSpan: "md:col-span-4",
  },
  {
    id: "03",
    title: "Private Transfers",
    desc: "Seamless door-to-door comfort via private car, helicopter, or chartered flight.",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1800&auto=format&fit=crop", // Luxury car
    colSpan: "md:col-span-5",
  },
  {
    id: "04",
    title: "Exclusive Experiences",
    desc: "Immerse yourself in carefully curated, once-in-a-lifetime VIP moments designed to leave a lasting impression.",
    image: "https://images.unsplash.com/photo-1560624052-449f5ddf0c31?q=80&w=1800&auto=format&fit=crop", // Champagne
    colSpan: "md:col-span-7",
  },
];

export default function Services() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-card",
        { y: 100, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="services" className="w-full bg-[#fdfcfa] py-[5px] px-4 sm:px-8 md:px-24">
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        <div className="mb-20 md:mb-36 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#9a958e] mb-6 flex items-center gap-3">
              <span className="w-8 h-px bg-[#9a958e]" />
              What We Offer
            </p>
            <h2 className="text-[clamp(2.5rem,5vw,5rem)] font-light leading-none text-[#1a1814]">
              Crafted for the<br />
              <span className="font-semibold italic">Discerning Traveler</span>
            </h2>
          </div>
          <button className="flex-shrink-0 flex items-center gap-2 text-xs font-semibold tracking-widest uppercase pb-1 border-b border-[#1a1814] hover:text-[#6a6560] hover:border-[#6a6560] transition-colors duration-300">
            View All Services <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
          {services.map((s, i) => (
            <div
              key={i}
              className={`bento-card relative overflow-hidden rounded-3xl group cursor-pointer ${s.colSpan}`}
            >
              {/* Background Image */}
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-110"
                style={{ backgroundImage: `url(${s.image})` }}
              />
              
              {/* Gradient Overlay for Readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-90" />
              <div className="absolute inset-0 bg-black/10 transition-colors duration-500 group-hover:bg-black/40" />

              {/* Top Tag */}
              <div className="absolute top-6 left-6 md:top-8 md:left-8 z-20">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-mono tracking-widest border border-white/20 shadow-lg">
                  {s.id}
                </span>
              </div>

              {/* Content - Centered */}
              <div className="absolute inset-0 p-6 md:p-10 z-20 flex flex-col items-center justify-center text-center">
                <h3 className="text-2xl md:text-3xl font-medium text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  {s.title}
                </h3>
                
                <p className="text-white/80 text-sm md:text-[15px] leading-relaxed opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out delay-75 max-w-[80%]">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
