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
      {/* Navbar container */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* White space gap between navbar and hero */}
      <div className="w-full h-20 md:h-28 bg-[#fdfcfa]" />

      {/* Hero section container */}
      <div className="w-full">
        <HeroSequence />
      </div>

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
