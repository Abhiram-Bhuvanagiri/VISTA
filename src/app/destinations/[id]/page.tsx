import { destinations } from "../../../data/destinations";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, MapPin, CheckCircle2 } from "lucide-react";

export default async function DestinationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const destId = parseInt(resolvedParams.id);
  const dest = destinations.find((d) => d.id === destId);

  if (!dest) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#0e0c0a] w-full text-white flex flex-col lg:flex-row p-4 lg:p-6 gap-6 lg:gap-10">
      
      {/* ─── LEFT SIDE: Sticky Image Pane ─── */}
      <div className="relative w-full lg:w-[45%] h-[60vh] lg:h-[calc(100vh-3rem)] rounded-[2rem] overflow-hidden shrink-0 lg:sticky top-6 shadow-2xl">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${dest.image})` }}
        />
        {/* Subtle gradients for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

        <Link
          href="/#places"
          className="absolute top-6 left-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-full text-[10px] font-medium tracking-[0.2em] uppercase hover:bg-white hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </Link>

        <div className="absolute bottom-10 left-10 pr-10">
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/70 mb-2">
            {dest.country}
          </p>
          <p className="text-3xl font-light tracking-wide leading-tight">
            {dest.tag}
          </p>
        </div>
      </div>

      {/* ─── RIGHT SIDE: Scrollable Information ─── */}
      <div className="w-full lg:w-[55%] py-10 lg:py-20 px-4 lg:px-12 flex flex-col gap-16 lg:gap-24">
        
        {/* Header */}
        <div>
          <h1 className="text-5xl lg:text-7xl font-light tracking-tight mb-8 leading-[1.1]">
            {dest.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-xs text-white/50 uppercase tracking-[0.2em] font-medium">
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#c8f0b0]" /> {dest.country}
            </span>
            <span className="hidden sm:inline">|</span>
            <span>{dest.duration}</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-[15px] lg:text-[17px] text-white/60 leading-loose font-light max-w-2xl">
            {dest.description}
          </p>
        </div>

        {/* Specialties */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 border-b border-white/10 pb-4">
            Exclusive Specialties
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
            {dest.specialties?.map((spec, i) => (
              <li key={i} className="flex items-start gap-4 text-white/80">
                <CheckCircle2 className="w-4 h-4 text-[#475569] mt-0.5 shrink-0" />
                <span className="text-sm font-light tracking-wide leading-relaxed">{spec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Services Provided */}
        <div>
          <p className="text-[10px] uppercase tracking-[0.3em] text-white/40 mb-8 border-b border-white/10 pb-4">
            Services We Provide
          </p>
          <div className="flex flex-col gap-8">
            {[
              {
                id: "01",
                title: "Bespoke Itineraries",
                desc: "Hand-crafted journeys meticulously designed to flawlessly match your desires.",
                image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
              },
              {
                id: "02",
                title: "Luxury Resorts",
                desc: "Exclusive access to the world's most breathtaking private villas and boutiques.",
                image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?q=80&w=800&auto=format&fit=crop",
              },
              {
                id: "03",
                title: "Private Transfers",
                desc: "Seamless door-to-door comfort via luxury car, helicopter, or chartered flight.",
                image: "https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=800&auto=format&fit=crop",
              },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-6 group cursor-pointer p-4 -mx-4 rounded-3xl hover:bg-white/5 transition-colors duration-500">
                {/* Image */}
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 rounded-2xl overflow-hidden shadow-2xl">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 ease-out group-hover:scale-110"
                    style={{ backgroundImage: `url(${s.image})` }}
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Info */}
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono tracking-widest text-white/40">
                    {s.id}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-light text-white tracking-wide">
                    {s.title}
                  </h3>
                  <p className="text-[13px] sm:text-sm text-white/50 leading-relaxed font-light max-w-sm">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="pt-4 pb-20">
          <button className="w-full sm:w-auto bg-white text-[#0e0c0a] px-10 py-5 rounded-full text-[11px] font-bold tracking-[0.2em] uppercase hover:bg-[#c8f0b0] transition-colors duration-300 shadow-xl shadow-white/5">
            Enquire About This Journey
          </button>
        </div>

      </div>
    </main>
  );
}
