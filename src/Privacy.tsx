import React from 'react';
import { ShieldCheck, Lock, Eye, Scale, Globe, Database, FileText, Landmark, Cookie, ShieldAlert } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-[#050505] min-h-screen text-white pt-40 pb-32 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-5xl mx-auto px-6 space-y-24">
        
        {/* PROTOCOL HEADER */}
        <header className="text-center space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-3 px-8 py-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[11px] font-black uppercase tracking-[0.6em] mb-4 shadow-2xl backdrop-blur-3xl">
            <ShieldCheck size={18} /> Sovereign Privacy Protocol
          </div>
          <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-none">
            Privacy <span className="text-[#D4AF37] text-glow">Pact</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/40 italic max-w-2xl mx-auto leading-relaxed font-medium">
            "Transparency is the cornerstone of trust. Our commitment to your data sovereignty is absolute, verified, and uncompromising."
          </p>
          <div className="flex justify-center gap-3 pt-6">
            {[1,2,3,4,5].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/30"></div>)}
          </div>
        </header>

        {/* REGULATORY CONTENT */}
        <div className="space-y-16">
          
          {/* 1. ADSENSE COMPLIANCE */}
          <section className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-[4rem] blur-2xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative rounded-[4rem] p-12 md:p-20 border border-white/5 bg-[#0a0a0a] overflow-hidden group shadow-2xl">
              <Landmark className="absolute -bottom-16 -right-16 opacity-[0.02] text-[#D4AF37] rotate-12 group-hover:opacity-[0.05] transition-opacity duration-700" size={400} />
              
              <div className="relative z-10 space-y-10">
                <div className="flex items-center gap-6 text-[#D4AF37]">
                  <Globe size={32} strokeWidth={1.5} />
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">I. Advertising & Digital Cookies</h2>
                </div>
                
                <div className="space-y-8 text-white/50 text-xl leading-relaxed italic font-medium">
                  <p>
                    To maintain the <span className="text-white">StrongTools Master Registry</span> as a free scholarly resource, we utilize <span className="text-white underline decoration-[#D4AF37]/50">Google AdSense</span> to serve high-fidelity advertisements.
                  </p>
                  <p className="text-lg">
                    Google, as a third-party vendor, employs cookies to serve ads on this station. The use of the <span className="text-[#D4AF37]">DoubleClick cookie</span> enables Google and its partners to serve tailored advertisements based on your archival history across the global network.
                  </p>
                  
                  <div className="p-10 bg-[#D4AF37]/5 rounded-[2.5rem] border border-[#D4AF37]/20 flex flex-col md:flex-row items-center gap-8">
                    <Cookie className="text-[#D4AF37] shrink-0" size={40} />
                    <div className="space-y-2">
                       <p className="text-sm font-black uppercase tracking-widest text-[#D4AF37]">Opt-Out Protocol</p>
                       <p className="text-sm leading-relaxed">
                        You may decline personalized advertising via the 
                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-white underline mx-2 hover:text-[#D4AF37] transition-colors italic">Google Ad Settings</a> 
                        portal or by visiting 
                        <a href="http://www.aboutads.info" target="_blank" rel="noopener noreferrer" className="text-white underline ml-2 hover:text-[#D4AF37] transition-colors italic">aboutads.info</a>.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2 & 3. DATA & AI */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <section className="rounded-[3.5rem] p-14 bg-white/[0.02] border border-white/5 space-y-8 hover:border-[#D4AF37]/30 transition-all duration-700 backdrop-blur-xl">
              <div className="flex items-center gap-5 text-[#D4AF37]">
                <Database size={28} />
                <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white">II. Data Locality</h3>
              </div>
              <p className="text-white/40 leading-relaxed italic text-lg font-medium">
                Our infrastructure is designed for <span className="text-white">Local Execution</span>. We do not maintain centralized databases of your personal inputs. All utility results are sequestered within your browser’s <span className="text-white">Secure Local Storage</span>. No Personal Identifiable Information (PII) is ever transmitted to our command servers.
              </p>
            </section>

            <section className="rounded-[3.5rem] p-14 bg-white/[0.02] border border-white/5 space-y-8 hover:border-[#D4AF37]/30 transition-all duration-700 backdrop-blur-xl">
              <div className="flex items-center gap-5 text-[#D4AF37]">
                <FileText size={28} />
                <h3 className="text-2xl font-black uppercase tracking-tighter italic text-white">III. AI Content Clause</h3>
              </div>
              <p className="text-white/40 leading-relaxed italic text-lg font-medium">
                The manuscripts within our Chronicles are synthesized by advanced <span className="text-white">Generative Intelligence (Gemini 3 Flash)</span>. These insights are intended for scholarly and informational use only. StrongTools does not provide legal, financial, or medical counsel.
              </p>
            </section>
          </div>

          {/* 4. GOVERNANCE (GDPR/CCPA) */}
          <section className="rounded-[4rem] p-12 md:p-20 border border-[#D4AF37]/20 bg-[#D4AF37]/5 space-y-12 shadow-inner">
            <div className="flex items-center gap-6 text-[#D4AF37]">
              <Scale size={32} />
              <h2 className="text-3xl font-black uppercase tracking-tighter italic">IV. Governance (GDPR & CCPA)</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Right to Access", desc: "You maintain the absolute right to view your local data logs at any moment via internal browser settings." },
                { title: "Right to Erasure", desc: "Purging your browser cache immediately terminates any temporary link to your archival history." },
                { title: "Right to Object", desc: "You may decline non-essential data processing through our preference center at any time." }
              ].map((right, idx) => (
                <div key={idx} className="space-y-4">
                  <h4 className="text-white font-black text-sm uppercase tracking-[0.2em] italic">{right.title}</h4>
                  <p className="text-base text-white/30 italic font-medium leading-relaxed">{right.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* INSTITUTIONAL FOOTER */}
          <footer className="text-center space-y-10 pt-20">
            <div className="w-16 h-16 bg-[#D4AF37] rounded-[1.5rem] flex items-center justify-center text-black mx-auto shadow-[0_0_50px_rgba(212,175,55,0.3)] rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Lock size={32} />
            </div>
            <div className="space-y-2">
              <p className="text-white/30 italic font-medium text-lg leading-relaxed">
                For inquiries regarding archival security or data protocols, contact the Registry Scribe:
              </p>
              <span className="text-white font-black uppercase tracking-[0.3em] text-2xl mt-4 inline-block hover:text-[#D4AF37] transition-colors cursor-crosshair">
                legal@strongtools.site
              </span>
            </div>
            
            <div className="pt-20 border-t border-white/5 space-y-4">
              <div className="flex justify-center gap-6 opacity-20">
                 <ShieldAlert size={20} />
                 <Eye size={20} />
                 <Lock size={20} />
              </div>
              <p className="text-white/10 text-[10px] font-black uppercase tracking-[1.2em]">
                Sovereign Registry Edition v4.0.2 • Verified MMXXIV
              </p>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
};
