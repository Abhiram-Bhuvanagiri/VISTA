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
      className="w-full bg-[#f0f9ff] py-[5px] px-4 sm:px-8 md:px-24 overflow-hidden relative min-h-[120vh] flex items-center"
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
              <p className="cta-tag text-[10px] font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-8 flex items-center gap-3" style={{ paddingLeft: "20px" }}>
                <span className="w-8 h-px bg-[#94a3b8]" />
                Start Your Journey
              </p>

              {/* ── Headline ── */}
              <h2 className="text-[clamp(3rem,5vw,6rem)] font-light leading-[0.82] tracking-[-0.06em] text-[#0f172a]" style={{ paddingLeft: "20px" }}>
                Let&apos;s Plan Your <br />
                <span className="font-light italic text-[#1e3a8a]">Dream Escape</span>
              </h2>
            </div>

            {/* Popular destinations */}
            <div style={{ paddingLeft: "20px" }}>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-5">Popular Destinations</p>
              <div className="flex flex-wrap gap-2" style={{ marginTop: "20px" }}>
                {["Swiss Alps", "Santorini", "Kyoto", "Bali", "Maldives", "Amalfi Coast", "Patagonia", "+70 more"].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 text-xs font-light uppercase tracking-widest text-[#64748b] bg-white/60 border border-[#cbd5e1]/60 rounded-full px-4 py-2 hover:border-[#2563eb] hover:text-[#2563eb] transition-colors duration-300 cursor-default"
                  >
                    <MapPin className="w-3 h-3 text-[#2563eb] flex-shrink-0" />
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact details */}
            <div className="flex flex-col gap-5" style={{ paddingLeft: "20px" }}>
              <p className="text-xs font-light uppercase tracking-[0.3em] text-[#94a3b8] mb-1">Get In Touch Directly</p>
              {[
                { label: "Email", value: "hello@vistatravel.com" },
                { label: "Phone", value: "+1 (800) 847 8228" },
                { label: "Hours", value: "Mon – Fri, 9am – 7pm GMT" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-5">
                  <span className="text-xs font-light uppercase tracking-widest text-[#94a3b8] w-16">{c.label}</span>
                  <span className="text-lg text-[#475569] font-light">{c.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Contact form card */}
          <div className="cta-form lg:col-span-3 w-full px-4 sm:px-0">
            <div className="bg-transparent rounded-[24px] p-[30px] sm:p-[40px] md:p-[50px] w-full max-w-[700px] mx-auto lg:ml-auto lg:mr-0">
              <h3 
                className="text-[34px] md:text-[48px] font-medium text-[#1f2937] leading-[0.82] tracking-[-0.06em] mb-[36px]"
                style={{ paddingLeft: "20px", marginBottom: "30px" }}
              >
                We’d love to hear from you!<br/>Let's get in touch
              </h3>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-10 text-center animate-in fade-in zoom-in duration-500">
                  <div className="w-16 h-16 bg-[#5b4a8b] rounded-full flex items-center justify-center mb-6 shadow-lg shadow-[#5b4a8b]/30">
                    <Send className="w-8 h-8 text-white -ml-1" />
                  </div>
                  <h4 className="text-[28px] md:text-[34px] font-medium text-[#1f2937] mb-3 leading-tight tracking-[-0.04em]">Message Sent!</h4>
                  <p className="text-[#64748b] text-[16px] max-w-sm mx-auto">Thank you for reaching out. We'll get back to you shortly to start planning your dream escape.</p>
                  <button onClick={() => setSubmitted(false)} className="mt-8 text-sm font-medium text-[#5b4a8b] hover:underline underline-offset-4">Send another message</button>
                </div>
              ) : (
                <form 
                  className="flex flex-col" 
                  onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
                  style={{ paddingLeft: "20px", marginBottom: "30px" }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[24px]">
                    <div className="flex flex-col">
                      <label className="text-[16px] text-[#374151] font-medium mb-[10px]">Full Name</label>
                      <input type="text" className="w-full h-[52px] bg-white/80 backdrop-blur-sm border border-[#d7d7d7] rounded-[10px] px-[16px] text-[16px] outline-none focus:border-[#5b4a8b]" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[16px] text-[#374151] font-medium mb-[10px]">Company</label>
                      <input type="text" className="w-full h-[52px] bg-white/80 backdrop-blur-sm border border-[#d7d7d7] rounded-[10px] px-[16px] text-[16px] outline-none focus:border-[#5b4a8b]" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-[20px] mb-[24px]">
                    <div className="flex flex-col">
                      <label className="text-[16px] text-[#374151] font-medium mb-[10px]">Email</label>
                      <input type="email" required className="w-full h-[52px] bg-white/80 backdrop-blur-sm border border-[#d7d7d7] rounded-[10px] px-[16px] text-[16px] outline-none focus:border-[#5b4a8b]" />
                    </div>
                    <div className="flex flex-col">
                      <label className="text-[16px] text-[#374151] font-medium mb-[10px]">Phone Number</label>
                      <input type="tel" className="w-full h-[52px] bg-white/80 backdrop-blur-sm border border-[#d7d7d7] rounded-[10px] px-[16px] text-[16px] outline-none focus:border-[#5b4a8b]" />
                    </div>
                  </div>

                  <div className="flex flex-col mb-[24px]">
                    <label className="text-[16px] text-[#374151] font-medium mb-[10px]">Address</label>
                    <input type="text" className="w-full h-[52px] bg-white/80 backdrop-blur-sm border border-[#d7d7d7] rounded-[10px] px-[16px] text-[16px] outline-none focus:border-[#5b4a8b]" />
                  </div>

                  <div className="flex flex-col">
                    <label className="text-[16px] text-[#374151] font-medium mb-[10px]">Your Message</label>
                    <textarea required className="w-full h-[120px] bg-white/80 backdrop-blur-sm border border-[#d7d7d7] rounded-[10px] p-[16px] text-[16px] resize-none outline-none focus:border-[#5b4a8b]"></textarea>
                  </div>

                  <button type="submit" className="self-start bg-[#5b4a8b] text-white text-[16px] font-medium cursor-pointer hover:bg-[#4a3c72] transition-all duration-300" style={{ borderRadius: "50px", padding: "10px 24px", marginTop: "40px" }}>
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
