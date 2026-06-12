"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0e0c0a] text-white overflow-hidden">
      {/* ─── Footer Content ─── */}
      <div className="relative z-10 max-w-7xl 2xl:max-w-screen-2xl mx-auto px-4 sm:px-8 md:px-24 py-16">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between gap-16 pb-16 border-b border-white/10">
          {/* Brand */}
          <div className="md:w-1/3">
            <h2 className="text-5xl md:text-6xl font-light tracking-tight mb-6">Vista</h2>
            <p className="text-sm text-white/40 font-light leading-relaxed max-w-xs">
              Architects of extraordinary travel. Designing bespoke journeys for the world&apos;s most discerning explorers.
            </p>
            {/* Social */}
            <div className="flex gap-5 mt-8">
              {["Instagram", "Twitter", "LinkedIn", "YouTube"].map((s) => (
                <Link
                  key={s}
                  href="#"
                  className="text-xs text-white/30 hover:text-white transition-colors duration-300 uppercase tracking-widest"
                >
                  {s[0]}
                </Link>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-14">
            {[
              { title: "Company", links: ["Home", "About Us", "Careers", "Press"] },
              { title: "Explore", links: ["Destinations", "Experiences", "Luxury", "Adventure"] },
              { title: "Info", links: ["FAQs", "Blogs", "Pricing", "Partnerships"] },
              { title: "Help", links: ["Contact Us", "Support", "Privacy Policy", "Terms"] },
            ].map((col) => (
              <div key={col.title} className="flex flex-col gap-4">
                <span className="text-[10px] uppercase tracking-[0.25em] text-white/30 font-semibold mb-1">
                  {col.title}
                </span>
                {col.links.map((l) => (
                  <Link
                    key={l}
                    href="#"
                    className="text-sm text-white/50 hover:text-white transition-colors duration-300"
                  >
                    {l}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs text-center md:text-left">
          <p className="text-white/30">© {new Date().getFullYear()} Vista Travel Agency. All rights reserved.</p>
          
          {/* Recruiter Callout Badge */}
          <div className="group relative">
            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#d4af37] via-white to-[#d4af37] opacity-20 group-hover:opacity-60 blur transition duration-500" />
            <div className="relative flex items-center gap-2 px-5 py-2 bg-[#0e0c0a] rounded-full border border-white/10 group-hover:border-[#d4af37]/50 transition-colors duration-300 cursor-pointer">
              <span className="text-white/40 tracking-[0.2em] uppercase text-[9px]">Designed & Engineered by</span>
              <span className="font-medium text-white tracking-wide">Abhiram Bhuvanagiri</span>
              <span className="relative flex h-2 w-2 ml-1">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#d4af37]"></span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
