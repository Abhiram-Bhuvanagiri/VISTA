"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#0e0c0a] text-white overflow-hidden">
      {/* ─── Footer Content ─── */}
      <div style={{ maxWidth: "2560px", margin: "0 auto", padding: "60px 40px" }} className="relative z-10 px-6 md:px-12">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 pb-16 border-b border-white/10" style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold leading-[0.82] tracking-[-0.06em]" style={{ paddingLeft: "10px", marginBottom: "20px" }}>VISTA</h2>
            <p className="text-sm text-white/60 font-medium" style={{ paddingLeft: "10px", marginBottom: "20px" }}>Luxury Travel & Bespoke Experiences</p>
          </div>
          <div className="flex flex-col md:text-right gap-1" style={{ paddingRight: "10px" }}>
            <p className="text-lg md:text-xl font-medium">+1 (800) 847 8228</p>
            <p className="text-base text-white/60">hello@vistatravel.com</p>
          </div>
        </div>

        {/* Middle Section - Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-20 py-16 border-b border-white/10" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          {[
            { title: "Company", links: ["Home", "About Us", "Careers", "Press"] },
            { title: "Explore", links: ["Destinations", "Experiences", "Luxury", "Adventure"] },
            { title: "Info", links: ["FAQs", "Blogs", "Pricing", "Partnerships"] },
            { title: "Help", links: ["Contact Us", "Support", "Privacy Policy", "Terms"] },
          ].map((col) => (
            <div key={col.title} className="flex flex-col gap-4">
              <span className="text-lg font-bold text-white mb-2" style={{ paddingLeft: "5px" }}>
                {col.title}
              </span>
              {col.links.map((l) => (
                <Link
                  key={l}
                  href="#"
                  className="text-sm text-white/60 hover:text-white transition-colors duration-300"
                  style={{ paddingLeft: "5px", paddingTop: "2px", paddingBottom: "2px" }}
                >
                  {l}
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-10 text-xs md:text-sm text-white/50" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
          <p className="text-base md:text-lg" style={{ paddingLeft: "5px", marginTop: "15px" }}>Made by Abhiram Bhuvanagiri</p>

          <div className="flex gap-6" style={{ paddingRight: "5px" }}>
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
