"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power4.out", delay: 0.3 }
    );

    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Places", href: "#places" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        style={{ marginBottom: "20px", padding: "0px" }}
        className={`fixed top-0 left-0 w-full z-[100] transition-[padding,background-color,backdrop-filter,border-color] duration-500 transform-gpu border-b ${scrolled
            ? "bg-white/95 backdrop-blur-md border-[#e5e7eb] py-6"
            : "bg-transparent border-transparent py-12"
          }`}
      >
        <div className="max-w-7xl 2xl:max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="text-5xl font-bold tracking-[0.25em] uppercase transition-colors duration-500 text-[#1a1814]"
            style={{ paddingLeft: "20px", paddingBottom: "5px", paddingTop: "5px" }}
          >
            Vista
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-14" style={{ paddingBottom: "5px" }}>
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="text-sm font-medium tracking-[0.2em] uppercase transition-colors duration-300 text-[#6a6560] hover:text-[#1a1814]"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="hidden md:inline-flex items-center justify-center text-lg lg:text-xl font-bold bg-black text-white hover:bg-white hover:text-black active:bg-gray-400 border border-transparent hover:border-black active:border-transparent transition-all duration-300"
            style={{ borderRadius: "50px", padding: "5px 10px", marginBottom: "5px", marginTop: "5px", marginLeft: "5px" }}
          >
            Book Now
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[7px] z-50"
            aria-label="Toggle menu"
            style={{ borderRadius: "50px", padding: "10px 12px", marginBottom: "5px" }}
          >
            <span
              className={`w-8 h-[2px] block transition-all duration-300 bg-[#1a1814] ${menuOpen ? "rotate-45 translate-y-[9px]" : ""
                }`}
            />
            <span
              className={`w-8 h-[2px] block transition-all duration-300 bg-[#1a1814] ${menuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`w-8 h-[2px] block transition-all duration-300 bg-[#1a1814] ${menuOpen ? "-rotate-45 -translate-y-[9px]" : ""
                }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#fdfcfa] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${menuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="flex flex-col items-center gap-10">
          {links.map((l) => (
            <Link
              key={l.label}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              className="text-4xl font-light text-[#1a1814] tracking-tight hover:text-[#9a958e] transition-colors duration-300"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}