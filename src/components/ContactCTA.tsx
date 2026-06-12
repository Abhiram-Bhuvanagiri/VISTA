"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Send, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const destinationOptions = [
  "Swiss Alps",
  "Santorini, Greece",
  "Kyoto, Japan",
  "Amalfi Coast, Italy",
  "Bali, Indonesia",
  "Patagonia, Argentina",
  "Maldives",
  "Marrakech, Morocco",
  "Other / Not sure yet",
];

export default function ContactCTA() {
  const ref = useRef<HTMLElement>(null);
  const [formState, setFormState] = useState({
    name: "", email: "", destination: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".cta-tag",   { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.7, ease: "power3.out", scrollTrigger: { trigger: ref.current, start: "top 80%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".cta-left",  { y: 50, opacity: 0 },  { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.1, scrollTrigger: { trigger: ref.current, start: "top 78%", toggleActions: "play none none reverse" } });
      gsap.fromTo(".cta-form",  { y: 60, opacity: 0 },  { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.25, scrollTrigger: { trigger: ref.current, start: "top 78%", toggleActions: "play none none reverse" } });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white border border-[#cbd5e1] rounded-xl px-5 py-4 text-sm text-[#0f172a] placeholder-[#94a3b8] focus:outline-none focus:border-[#2563eb] focus:ring-1 focus:ring-[#2563eb] transition-all duration-300 font-light shadow-sm";

  return (
    <section
      ref={ref}
      id="contact"
      className="w-full bg-[#f0f9ff] py-32 md:py-44 px-4 sm:px-8 md:px-24 overflow-hidden relative min-h-screen flex items-center"
    >
      {/* Background Image - Made darker/more visible by increasing opacity */}
      <div 
        className="absolute inset-0 bg-[url('/world-map.jpg.avif')] bg-cover bg-center bg-no-repeat opacity-[0.5]" 
      />

      {/* Light gradient overlay - Reduced opacity to let image show through */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff]/60 via-[#f0f9ff]/50 to-[#e0f2fe]/70 pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl 2xl:max-w-screen-2xl mx-auto">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20 items-center">

          {/* Left — Headline, Destinations and contact details */}
          <div className="cta-left lg:col-span-2 flex flex-col gap-12">
            
            <div>
              {/* ── Section tag ── */}
              <p className="cta-tag text-[10px] font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-8 flex items-center gap-3">
                <span className="w-8 h-px bg-[#94a3b8]" />
                Start Your Journey
              </p>

              {/* ── Headline ── */}
              <h2 className="text-[clamp(3rem,5vw,6rem)] font-light leading-[1.05] text-[#0f172a]">
                Let&apos;s Plan Your <br />
                <span className="font-light italic text-[#1e3a8a]">Dream Escape</span>
              </h2>
            </div>

            {/* Popular destinations */}
            <div>
              <p className="text-[10px] font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-5">Popular Destinations</p>
              <div className="flex flex-wrap gap-2">
                {["Swiss Alps", "Santorini", "Kyoto", "Bali", "Maldives", "Amalfi Coast", "Patagonia", "+70 more"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-[10px] font-light uppercase tracking-widest text-[#64748b] bg-white/60 border border-[#cbd5e1]/60 rounded-full px-4 py-2 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors duration-300 cursor-default"
                  >
                    <MapPin className="w-2.5 h-2.5 text-[#2563eb] flex-shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5">
              <p className="text-[10px] font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-1">Get In Touch Directly</p>
              {[
                { label: "Email", value: "hello@vistatravel.com" },
                { label: "Phone", value: "+1 (800) 847 8228" },
                { label: "Hours", value: "Mon – Fri, 9am – 7pm GMT" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-5">
                  <span className="text-[10px] font-light uppercase tracking-widest text-[#94a3b8] w-12">{c.label}</span>
                  <span className="text-base text-[#475569] font-light">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form card */}
          <div className="cta-form lg:col-span-3 w-full">
            {/* Elevated separate card */}
            <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] border border-[#e2e8f0] shadow-2xl shadow-[#1e293b]/10 overflow-hidden">

              {/* Card header bar */}
              <div className="px-6 sm:px-12 pt-8 sm:pt-12 pb-8 border-b border-[#e2e8f0]">
                <p className="text-[10px] font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-4 flex items-center gap-3">
                  <span className="w-8 h-px bg-[#94a3b8]" />
                  Enquiry Form
                </p>
                <h3 className="text-2xl font-light text-[#0f172a]">
                  Contact <span className="font-light italic text-[#1e3a8a]">Our Team</span>
                </h3>
                <p className="text-sm font-light text-[#64748b] mt-3">
                  We typically respond within 2–4 business hours.
                </p>
              </div>

              {/* Form body */}
              <div className="px-6 sm:px-14 py-10 sm:py-14">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center text-center py-20 gap-8">
                    <div className="w-20 h-20 rounded-full bg-[#f0f9ff] border border-[#bae6fd] flex items-center justify-center">
                      <span className="text-3xl text-[#2563eb]">✦</span>
                    </div>
                    <h3 className="text-2xl font-light text-[#0f172a]">
                      Enquiry <span className="font-light italic">Received</span>
                    </h3>
                    <p className="text-[#64748b] font-light leading-relaxed max-w-sm text-base">
                      Your dedicated travel architect will reach out within 24 hours to begin crafting your journey.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setFormState({ name: "", email: "", destination: "", message: "" }); }}
                      className="mt-4 text-sm font-light uppercase tracking-widest text-[#94a3b8] underline underline-offset-4 hover:text-[#2563eb] transition-colors duration-300"
                    >
                      Submit another enquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-8">

                    {/* Name + Email row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-3">
                        <label className="text-[11px] font-light uppercase tracking-widest text-[#64748b]">Full Name</label>
                        <input
                          required type="text"
                          placeholder="Alexandra Rossi"
                          value={formState.name}
                          onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                      <div className="flex flex-col gap-3">
                        <label className="text-[11px] font-light uppercase tracking-widest text-[#64748b]">Email Address</label>
                        <input
                          required type="email"
                          placeholder="hello@example.com"
                          value={formState.email}
                          onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    {/* Destination */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[11px] font-light uppercase tracking-widest text-[#64748b]">Destination Interest</label>
                      <div className="relative">
                        <select
                          required
                          value={formState.destination}
                          onChange={(e) => setFormState({ ...formState, destination: e.target.value })}
                          className={inputClass + " appearance-none cursor-pointer pr-12"}
                        >
                          <option value="" disabled>Select a destination…</option>
                          {destinationOptions.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                        {/* Custom chevron */}
                        <div className="pointer-events-none absolute inset-y-0 right-6 flex items-center">
                          <svg className="w-5 h-5 text-[#94a3b8]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="flex flex-col gap-3">
                      <label className="text-[11px] font-light uppercase tracking-widest text-[#64748b]">Your Message</label>
                      <textarea
                        required rows={5}
                        placeholder="Tell us about your dream journey — travel dates, group size, special occasions, budget range…"
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        className={inputClass + " resize-none"}
                      />
                    </div>

                    {/* Submit */}
                    <div className="flex flex-col sm:flex-row items-center gap-6 pt-4">
                      <button
                        type="submit"
                        className="group flex items-center justify-center gap-3 bg-[#2563eb] text-white text-sm font-medium tracking-widest uppercase w-full sm:w-auto px-8 sm:px-10 py-4 rounded-full hover:bg-[#1d4ed8] transition-colors duration-300 shadow-lg shadow-blue-500/30"
                      >
                        Send Enquiry
                        <Send className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-300" />
                      </button>
                      <p className="text-[11px] text-[#94a3b8] font-light leading-relaxed text-center sm:text-left">
                        We respect your privacy.<br className="hidden sm:block" /> No spam, ever. Unsubscribe any time.
                      </p>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
