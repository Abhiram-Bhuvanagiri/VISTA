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
    { label: "Services", href: "#services" },
    { label: "Places", href: "#places" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-sm py-4"
            : "bg-transparent py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className={`text-xl font-bold tracking-[0.25em] uppercase transition-colors duration-500 ${
              scrolled ? "text-[#1a1814]" : "text-white"
            }`}
          >
            Vista
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-10">
            {links.map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className={`text-xs font-medium tracking-[0.2em] uppercase transition-colors duration-300 ${
                  scrolled
                    ? "text-[#6a6560] hover:text-[#1a1814]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <button
            className={`hidden md:inline-flex items-center gap-2 text-xs font-semibold tracking-widest uppercase px-6 py-3 rounded-full border transition-all duration-300 ${
              scrolled
                ? "border-[#1a1814] text-[#1a1814] hover:bg-[#1a1814] hover:text-white"
                : "border-white/50 text-white hover:bg-white hover:text-[#1a1814]"
            }`}
          >
            Book Now
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] z-50 p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`w-6 h-[1.5px] block transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-[6.5px]" : ""
              } ${scrolled || menuOpen ? "bg-[#1a1814]" : "bg-white"}`}
            />
            <span
              className={`w-6 h-[1.5px] block transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              } ${scrolled ? "bg-[#1a1814]" : "bg-white"}`}
            />
            <span
              className={`w-6 h-[1.5px] block transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""
              } ${scrolled || menuOpen ? "bg-[#1a1814]" : "bg-white"}`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[90] bg-[#fdfcfa] flex flex-col items-center justify-center transition-all duration-500 md:hidden ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
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
