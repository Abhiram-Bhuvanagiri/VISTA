"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

// Added reviews to the portraits array for the back of the cards
const portraits = [
  { src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop", top: "5%", left: "5%", size: "w-24 h-32 md:w-32 md:h-40", delay: 0, rating: "5.0", review: "A trip of a lifetime. The attention to detail was beyond our expectations.", author: "Elena M." },
  { src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop", top: "15%", left: "85%", size: "w-28 h-28 md:w-40 md:h-40", delay: 0.1, rating: "4.8", review: "Seamless travel from start to finish. Highly recommend their services.", author: "Jessica R." },
  { src: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?q=80&w=400&auto=format&fit=crop", top: "60%", left: "8%", size: "w-28 h-36 md:w-40 md:h-52", delay: 0.2, rating: "4.9", review: "Every recommendation was spot on. We loved every second of it.", author: "Sarah T." },
  { src: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop", top: "35%", left: "10%", size: "w-20 h-24 md:w-28 md:h-36", delay: 0.4, rating: "4.7", review: "Incredible itineraries and top-notch customer support.", author: "Chloe S." },
  { src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop", top: "70%", left: "80%", size: "w-24 h-32 md:w-32 md:h-44", delay: 0.5, rating: "4.5", review: "They took all the stress out of planning. We just showed up and enjoyed.", author: "Emma L." },
  { src: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop", top: "2%", left: "28%", size: "w-20 h-24 md:w-28 md:h-36", delay: 0.7, rating: "4.8", review: "An unforgettable honeymoon experience. Thank you, Vista!", author: "Chris K." },
  { src: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?q=80&w=400&auto=format&fit=crop", top: "5%", left: "65%", size: "w-24 h-24 md:w-32 md:h-32", delay: 0.8, rating: "4.9", review: "Beautiful accommodations and exclusive access we couldn't get elsewhere.", author: "Mark W." },
];

export default function Testimonials() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating animation for portraits (animating the outer container to avoid CSS transform conflicts)
      gsap.to(".portrait-img-floater", {
        y: "random(-10, 10)",
        x: "random(-8, 8)",
        duration: "random(3, 5)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
          amount: 2,
          from: "random"
        }
      });

      // Scroll reveal animation
      gsap.fromTo(
        ".testi-content",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 75%",
          },
        }
      );
      
      gsap.fromTo(
        ".portrait-container",
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "back.out(1.2)",
          stagger: 0.05,
          scrollTrigger: {
            trigger: ref.current,
            start: "top 65%",
          },
        }
      );
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="relative w-full bg-[#f3f0eb] py-[5px] overflow-hidden flex items-center justify-center min-h-[90vh]">
      {/* Background Portraits Grid */}
      <div className="absolute inset-0 w-full h-full pointer-events-none max-w-[100rem] mx-auto z-0">
        {portraits.map((p, i) => {
          return (
            <div
              key={i}
              className={`portrait-container absolute pointer-events-auto`}
              style={{ top: p.top, left: p.left }}
            >
              <div className="flex flex-col items-center gap-3">
                {/* GSAP floater container */}
                <div className="portrait-img-floater relative group">
                  
                  {/* 3D Perspective Container */}
                  <div 
                    className={`relative ${p.size}`}
                    style={{ perspective: '1000px' }}
                  >
                    
                    {/* Flipping Inner Container */}
                    <div 
                      className="w-full h-full rounded-2xl shadow-lg transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:[transform:rotateY(180deg)]"
                      style={{ 
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      
                      {/* Front Face (Image & Rating) */}
                      <div 
                        className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gray-200"
                        style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
                      >
                        <Image
                          src={p.src}
                          alt={`Traveler ${i + 1}`}
                          fill
                          className="object-cover"
                        />
                        {/* Rating inside bottom left */}
                        <div className="absolute bottom-2 left-2 flex items-center gap-1 z-10 transition-opacity duration-300 drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]">
                          <svg width="10" height="10" viewBox="0 0 12 12" fill="none" className="text-yellow-400">
                            <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/>
                          </svg>
                          <span className="text-[10px] md:text-xs font-bold text-white leading-none">
                            {p.rating}<span className="text-white/80 font-medium">/5</span>
                          </span>
                        </div>
                      </div>

                      {/* Back Face (Review Text) */}
                      <div 
                        className="absolute inset-0 w-full h-full rounded-2xl bg-[#1a1814]/90 backdrop-blur-md border border-white/10 p-3 md:p-5 flex flex-col items-center justify-center text-center shadow-xl overflow-hidden"
                        style={{ 
                          backfaceVisibility: 'hidden', 
                          WebkitBackfaceVisibility: 'hidden',
                          transform: 'rotateY(180deg)'
                        }}
                      >
                        <div className="text-yellow-400 mb-2 flex space-x-1">
                          {[...Array(5)].map((_, idx) => (
                            <svg key={idx} width="8" height="8" viewBox="0 0 12 12" fill="currentColor" className="md:w-3 md:h-3 drop-shadow-md">
                              <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" />
                            </svg>
                          ))}
                        </div>
                        <p className="text-[10px] md:text-xs font-medium text-white/90 leading-snug line-clamp-4 italic mb-2">
                          "{p.review}"
                        </p>
                        <p className="text-[9px] md:text-[10px] font-semibold text-white/50 uppercase tracking-wider mt-auto">
                          — {p.author}
                        </p>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Centered Content */}
      <div className="testi-content relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto bg-[#f3f0eb]/90 backdrop-blur-md py-12 mt-16 md:mt-24 rounded-3xl pointer-events-none">
        <div className="inline-block mb-8 px-5 py-2 rounded-full border border-[#e8e4de] bg-white pointer-events-auto">
          <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#9a958e] font-semibold" style={{ paddingLeft: "20px" }}>
            Loved by Travelers
          </p>
        </div>
        
        <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] md:text-[clamp(3.5rem,6vw,6rem)] font-light leading-[0.82] tracking-[-0.06em] text-[#1a1814] mb-8 pointer-events-auto" style={{ paddingLeft: "20px" }}>
          Unforgettable<br />
          <span className="font-semibold italic font-serif">Experiences</span>
        </h2>
        
        <p className="text-lg md:text-2xl text-[#3a3630] font-light max-w-3xl mx-auto pointer-events-auto" style={{ paddingLeft: "20px" }}>
          Join thousands of travelers who have trusted Vista to curate their dream journeys across the globe.
        </p>
      </div>
    </section>
  );
}
