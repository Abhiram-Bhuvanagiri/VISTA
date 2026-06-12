"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading line reveal
      gsap.fromTo(
        ".about-tag",
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".about-heading",
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
      gsap.fromTo(
        ".about-body",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          delay: 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Image parallax
      gsap.fromTo(
        ".about-img-wrap",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Numbers
      gsap.fromTo(
        ".about-stat",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          stagger: 0.1,
          delay: 0.3,
          scrollTrigger: {
            trigger: ".about-stats",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-[#fdfcfa] py-[5px] px-4 sm:px-8 md:px-24"
    >
      <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        {/* Top label */}
        <p className="about-tag text-xs uppercase tracking-[0.3em] text-[#9a958e] mb-20 flex items-center gap-3">
          <span className="w-8 h-px bg-[#9a958e]" />
          Our Story
        </p>

        {/* Main grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-start">
          {/* Left – Text */}
          <div className="flex flex-col gap-10">
            <h2 className="about-heading text-[clamp(2.2rem,4.5vw,5rem)] font-light leading-[1.1] text-[#1a1814]">
              Crafting Journeys of
              <span className="block font-semibold italic">Uncompromising</span>
              <span className="block">Distinction</span>
            </h2>

            <p className="about-body text-lg font-light leading-relaxed text-[#6a6560]">
              Vista was founded on a singular conviction: travel, at its finest, is not
              a transaction — it is a transformation. We operate as your personal travel
              atelier, architecting immersive experiences that are as unique as your
              aspirations and as enduring as the memories they create.
            </p>
            <p className="about-body text-base font-light leading-relaxed text-[#9a958e]">
              Our globally seasoned travel architects collaborate with an exclusive
              network of luxury properties, private guides, and bespoke charter services
              — ensuring every element of your itinerary is executed with surgical
              precision and genuine passion.
            </p>
            <p className="about-body text-base font-light leading-relaxed text-[#9a958e]">
              From remote wilderness lodges to landmark city residences, from
              gastronomic odysseys to cultural immersions, Vista curates access to
              the world's most coveted experiences — many available exclusively
              through our network.
            </p>

            {/* Key differentiators */}
            <div className="about-body grid grid-cols-1 sm:grid-cols-3 gap-8 pt-6 border-t border-[#e8e4de]">
              {[
                { icon: "◈", label: "White-Glove", sub: "Concierge" },
                { icon: "◇", label: "100% Bespoke", sub: "Itineraries" },
                { icon: "◉", label: "24 / 7", sub: "In-Trip Support" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <span className="text-[#9a958e] text-3xl">{item.icon}</span>
                  <span className="text-xl sm:text-2xl font-bold tracking-wider uppercase text-[#1a1814]">{item.label}</span>
                  <span className="text-base sm:text-lg font-medium text-[#9a958e] tracking-wide">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Image stack */}
          <div className="about-img-wrap relative w-full h-[500px] sm:h-[600px] lg:h-[780px] 2xl:h-[900px] mt-10 lg:mt-0">
            {/* Main image */}
            <div
              className="absolute top-0 left-0 right-0 bottom-0 rounded-3xl overflow-hidden"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=1800&auto=format&fit=crop')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            {/* Floating stat card */}
            <div className="absolute -bottom-4 left-0 right-0 sm:-bottom-6 sm:-left-6 sm:-right-6 bg-white rounded-3xl sm:rounded-[40px] p-8 sm:p-12 shadow-2xl z-10 about-stats">
              <div className="flex gap-12 sm:gap-20 justify-around">
                {[
                  { n: "12K+", l: "Travelers" },
                  { n: "80+", l: "Destinations" },
                ].map((s) => (
                  <div key={s.l} className="about-stat flex flex-col items-center">
                    <span className="text-4xl sm:text-6xl font-light text-[#1a1814]">{s.n}</span>
                    <span className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#9a958e] mt-2 font-medium">{s.l}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Small top-right floating badge */}
            <div className="absolute -top-4 -right-2 sm:-top-4 sm:right-4 bg-[#1a1814] text-white rounded-2xl px-4 py-3 sm:px-6 sm:py-4 z-10 shadow-xl about-stat">
              <p className="text-[10px] sm:text-xs uppercase tracking-widest text-white/50 mb-1">Since</p>
              <p className="text-xl sm:text-2xl font-light">2009</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
