import Navbar from "@/components/Navbar";
import HeroSequence from "@/components/HeroSequence";
import AboutUs from "@/components/AboutUs";
import Places from "@/components/Places";
import Testimonials from "@/components/Testimonials";
import ContactCTA from "@/components/ContactCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-[#fdfcfa] text-[#1a1814]">
      <Navbar />
      {/* Hero video sequence — pins itself while frames play */}
      <HeroSequence />

      {/* Moderate empty white space division as requested */}
      <div className="w-full h-16 md:h-32 bg-[#fdfcfa]"></div>

      {/* Light content sections */}
      <AboutUs />

      <div className="w-full h-16 md:h-32 bg-[#fdfcfa]"></div>
      <Places />

      <div className="w-full h-16 md:h-32 bg-[#fdfcfa]"></div>
      <Testimonials />

      <div className="w-full h-16 md:h-32 bg-[#fdfcfa]"></div>
      <ContactCTA />
      
      {/* Gap matching other sections */}
      <div className="w-full h-16 md:h-32 bg-[#fdfcfa]"></div>

      <Footer />
    </main>
  );
}
