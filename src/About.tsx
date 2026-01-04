import React from 'react';
import { Landmark, ScrollText, ShieldCheck, Target, Users, Zap, Award, Crown, Compass, BookOpen, Diamond, Star } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white pt-40 pb-32 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-6 space-y-40">
        
        {/* SUPERIOR HERO SECTION */}
        <div className="text-center space-y-12 animate-in fade-in slide-in-from-top-12 duration-1000">
          <div className="inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[12px] font-black uppercase tracking-[0.8em] mb-4 shadow-[0_0_60px_rgba(212,175,55,0.1)] backdrop-blur-3xl">
            <Crown size={18} /> Est. MMXXIV • Sovereign in Logic
          </div>
          <h1 className="text-7xl md:text-[13rem] font-black uppercase tracking-tighter leading-[0.8] italic mb-10 drop-shadow-2xl">
            <span className="block opacity-10 text-white">THE SUPREME</span>
            <span className="text-[#D4AF37] text-glow relative inline-block">
              StrongTools
              <div className="absolute -bottom-6 left-0 w-full h-1.5 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent rounded-full opacity-40"></div>
            </span> 
            <span className="block opacity-10 text-white">ARCHIVE</span>
          </h1>
          <p className="text-2xl md:text-5xl font-light text-white/40 italic max-w-5xl mx-auto leading-tight tracking-tight">
            "A sanctuary where the absolute rigor of mathematics meets the pinnacle of digital aesthetic excellence."
          </p>
        </div>

        {/* THE INSTITUTIONAL MANDATE */}
        <div className="relative group">
          <div className="absolute -inset-4 bg-[#D4AF37]/20 rounded-[5rem] blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity duration-1000"></div>
          <div className="relative bg-[#0a0a0a] border border-white/5 rounded-[5rem] p-16 md:p-32 shadow-[0_40px_100px_rgba(0,0,0,1)] space-y-24 overflow-hidden backdrop-blur-3xl">
            <div className="absolute -top-20 -right-20 p-20 opacity-[0.02] pointer-events-none rotate-[25deg] text-[#D4AF37]">
              <Landmark size={800} strokeWidth={0.5} />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
              <div className="space-y-12 relative z-10">
                <div className="flex items-center gap-6">
                   <div className="w-20 h-20 bg-[#D4AF37] rounded-[2rem] flex items-center justify-center text-black shadow-2xl rotate-3 group-hover:rotate-0 transition-transform duration-700">
                     <Award size={40} />
                   </div>
                   <h2 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter italic">Institutional <span className="text-[#D4AF37]">Mandate</span></h2>
                </div>
                <p className="text-2xl md:text-3xl text-white/70 leading-[1.8] font-medium italic first-letter:text-9xl first-letter:font-black first-letter:text-[#D4AF37] first-letter:mr-8 first-letter:float-left first-letter:leading-[0.7] first-letter:mt-2">
                  StrongTools.site is not merely a utility portal; it is a curated sanctuary for the discerning professional. In an era of digital noise, we provide the silence of absolute data, wrapped in an interface designed for those who demand uncompromising accuracy.
                </p>
                <p className="text-xl text-white/30 leading-relaxed font-light italic">
                  Every instrument in our sovereign vault—from the high-fidelity Weather Oracle to our cryptographic Scribe Counter—undergoes rigorous verification against global computational benchmarks. We serve the architects, the analysts, and the visionaries who understand that the quality of their tools dictates the quality of their outcome.
                </p>
                <div className="pt-10 flex flex-wrap gap-4">
                  {['Veritas', 'Aequitas', 'Fidelitas'].map((tag) => (
                    <div key={tag} className="px-8 py-3 bg-white/[0.03] border border-white/10 rounded-full text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.4em] hover:bg-[#D4AF37]/10 transition-colors">
                      {tag}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-10">
                {[
                  { icon: <Zap size={36} />, title: "Sub-Pixel Perfection", desc: "Engineered for sub-millisecond logical processing and visual precision that respects the professional eye." },
                  { icon: <ShieldCheck size={36} />, title: "Absolute Data Privacy", desc: "No tracking. No telemetry. Your data remains local to your browser, protected by our foundational Privacy Pact." },
                  { icon: <Diamond size={36} />, title: "The Aureate Standard", desc: "A design language rooted in gold and depth, reflecting the inherent value of information precision." }
                ].map((item, idx) => (
                  <div key={idx} className="p-12 rounded-[4rem] border border-white/5 flex items-start gap-8 group/item hover:border-[#D4AF37]/30 transition-all duration-700 bg-white/[0.01] hover:bg-white/[0.03]">
                    <div className="w-20 h-20 rounded-[2.5rem] bg-[#D4AF37]/5 flex items-center justify-center text-[#D4AF37] group-hover/item:scale-110 group-hover/item:bg-[#D4AF37] group-hover/item:text-black transition-all duration-500 shadow-xl">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-2xl font-black uppercase tracking-widest text-white mb-3 italic">{item.title}</h3>
                      <p className="text-lg text-white/30 italic leading-relaxed font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOUNDER'S VISION GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          {[
            { icon: <Compass size={56} strokeWidth={1} />, title: "Guiding Meridian", desc: "Our algorithms are cross-referenced with IEEE standards to ensure every decimal point is a crystalline statement of truth." },
            { icon: <ScrollText size={56} strokeWidth={1} />, title: "Archival Legacy", desc: "We preserve the history of measurement, providing a scholarly context that enriches the utility of modern digital instruments." },
            { icon: <Target size={56} strokeWidth={1} />, title: "Mathematical Rigor", desc: "Design is not a decorative layer; it is the logical foundation. A beautiful tool is, by definition, a more efficient tool." }
          ].map((card, idx) => (
            <div key={idx} className="text-center space-y-8 group px-4">
              <div className="w-36 h-36 bg-white/[0.02] border border-white/5 rounded-full flex items-center justify-center text-[#D4AF37] mx-auto shadow-2xl group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-1000 relative">
                {idx === 0 && <Star className="absolute top-2 right-2 text-[#D4AF37] animate-pulse" size={24} />}
                {card.icon}
              </div>
              <h4 className="text-3xl font-black uppercase tracking-tighter text-white italic">{card.title}</h4>
              <p className="text-white/30 text-xl italic leading-relaxed px-4 font-medium">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* INSTITUTIONAL FOOTER SECTION */}
        <div className="pt-40 border-t border-white/5 text-center space-y-12">
          <div className="flex justify-center items-center gap-10">
            <div className="w-32 h-px bg-gradient-to-r from-transparent to-[#D4AF37]/50"></div>
            <BookOpen className="text-[#D4AF37]/20" size={40} strokeWidth={1} />
            <div className="w-32 h-px bg-gradient-to-l from-transparent to-[#D4AF37]/50"></div>
          </div>
          <div className="space-y-4">
            <p className="text-[#D4AF37]/40 text-[12px] font-black uppercase tracking-[1.8em] italic">
              StrongTools Master Registry • Sovereign Edition v4.0
            </p>
            <p className="text-white/10 text-[9px] uppercase tracking-[0.5em] font-bold">
              All Logical Computations Authenticated By Central Vault
            </p>
          </div>
          <div className="flex justify-center gap-8">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/20"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
