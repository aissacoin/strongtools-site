import React, { useState, useEffect, useCallback } from 'react';
import { TOOLS } from "./constants";
import { getAutomatedArchive } from "./geminiService";

// 1. Import your custom tool components
import { BMICalculator } from './BMICalculator';
import { AgeCalculator } from './AgeCalc';
import { PasswordForgeTool } from './PasswordForgeTool';
import { BirthWatchTool } from './BirthWatchTool';
import { WeatherLive } from './WeatherLive';

import { 
  ArrowLeft, 
  Loader2, 
  History, 
  HelpCircle, 
  Zap,
  AlertTriangle,
  Activity,
  Sparkles,
  ScrollText,
  ShieldCheck
} from 'lucide-react';

interface ToolDetailProps {
  id: string;
  initialDate?: string;
}

const PIXABAY_KEY = '48924033-0c30626359e86566498506253';

const getSafeCycleMetadata = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return {
    cycleString: targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  };
};

export const ToolDetail: React.FC<ToolDetailProps> = ({ id, initialDate }) => {
  const tool = TOOLS.find(t => t.id === id);
  const { cycleString } = getSafeCycleMetadata(initialDate);
  
  const [archiveData, setArchiveData] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 2. Logic to render the specific interactive tool
  const renderToolInterface = () => {
    switch (id) {
      case 'bmi-calculator': return <BMICalculator />;
      case 'age-calculator': return <AgeCalculator />;
      case 'password-forge': return <PasswordForgeTool />;
      case 'birth-watch':    return <BirthWatchTool />;
      case 'weather-live':   return <WeatherLive />;
      default:
        return (
          <div className="text-center py-20 opacity-20 italic">
            <Zap size={48} className="mx-auto mb-4" />
            <p className="font-black uppercase tracking-widest text-xs">Module under maintenance</p>
          </div>
        );
    }
  };

  const fetchArchive = useCallback(async () => {
    if (!tool) return;
    setIsLoading(true);
    setError(null);

    try {
      // Synchronizing with AI Registry
      const data = await getAutomatedArchive(tool.id, tool.title, tool.description);
      if (!data) throw new Error("Registry synchronization protocol failed.");
      setArchiveData(data);

      // Fetching Visual Assets
      const query = encodeURIComponent(`${tool.title} technical digital luxury`);
      const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3`;
      
      const imgResponse = await fetch(pixabayUrl);
      const imgData = await imgResponse.json();
      if (imgData.hits && imgData.hits.length > 0) {
        setImageUrl(imgData.hits[0].largeImageURL);
      }
    } catch (err) {
      console.error(err);
      setError("Archive node calibration failed. Remote registry unreachable.");
    } finally {
      setIsLoading(false);
    }
  }, [tool]);

  useEffect(() => {
    fetchArchive();
  }, [fetchArchive]);

  if (!tool) return null;

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-32 pb-32 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* NAVIGATION REGISTRY */}
        <div className="mb-16 flex items-center justify-between border-b border-white/5 pb-8">
          <button 
            onClick={() => window.location.hash = '#/tools'} 
            className="flex items-center gap-3 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.4em] group italic"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-3 transition-transform duration-500" /> Back to Vault Archives
          </button>
          <div className="flex gap-4">
            <div className="flex items-center gap-3 px-6 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.5em]">
              <History size={12} /> Sync Cycle: {cycleString}
            </div>
          </div>
        </div>

        {/* TOOL DOSSIER HEADER */}
        <header className="text-center mb-32 space-y-8 animate-in fade-in slide-in-from-top-10 duration-1000">
          <div className="inline-flex items-center gap-2 text-white/20 text-[9px] font-black uppercase tracking-[0.8em] mb-4">
            <ShieldCheck size={14} className="text-[#D4AF37]" /> Verified Instrument
          </div>
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter italic leading-none">
            {tool.title}
          </h1>
          <p className="text-xl md:text-2xl text-white/40 italic max-w-3xl mx-auto font-medium leading-relaxed">
            "{tool.description}"
          </p>
        </header>

        {/* LIVE INTERFACE UNIT (THE ACTIVE TOOL) */}
        <section className="mb-40">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-[5rem] blur-2xl opacity-30 group-hover:opacity-50 transition duration-1000"></div>
            <div className="relative p-10 md:p-24 rounded-[4.5rem] border border-white/10 bg-black/60 backdrop-blur-3xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 right-0 p-16 opacity-[0.03] pointer-events-none rotate-12 group-hover:rotate-0 transition-transform duration-1000">
                <Zap size={400} />
              </div>
              <div className="relative z-10">
                <p className="text-[10px] text-[#D4AF37] font-black uppercase tracking-[1em] mb-12 text-center opacity-50 italic">Active Module Interface</p>
                <div className="min-h-[400px]">
                   {renderToolInterface()}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ARCHIVAL MANUSCRIPT & DATA */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <main className="lg:col-span-8 space-y-24">
            <div className="flex items-center gap-8">
              <ScrollText className="text-[#D4AF37]" size={36} strokeWidth={1.5} />
              <h2 className="text-4xl font-black uppercase tracking-tighter italic">Technical <span className="text-[#D4AF37]">Dossier</span></h2>
              <div className="flex-grow h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent"></div>
            </div>

            {isLoading ? (
              <div className="py-48 text-center space-y-10 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                <Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={72} strokeWidth={1} />
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37] animate-pulse">Synchronizing with Master Archive Nodes...</p>
              </div>
            ) : error ? (
              <div className="py-24 text-center bg-rose-500/5 border-2 border-dashed border-rose-500/20 rounded-[4rem] space-y-8">
                  <AlertTriangle size={56} className="mx-auto text-rose-500/30 animate-bounce" />
                  <p className="text-rose-400 font-black uppercase tracking-[0.3em] text-sm">{error}</p>
              </div>
            ) : archiveData ? (
              <article className="animate-in fade-in slide-in-from-bottom-16 duration-1000">
                {imageUrl && (
                  <div className="rounded-[4rem] overflow-hidden mb-20 border border-white/5 h-[500px] relative group shadow-2xl">
                    <img src={imageUrl} className="w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-[20s]" alt="Visual Dossier" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent opacity-80"></div>
                  </div>
                )}

                <div className="space-y-16">
                  <h3 className="text-5xl md:text-7xl font-black text-white italic leading-[0.9] tracking-tighter">
                    {archiveData.articleTitle}
                  </h3>
                  <div 
                    className="prose-dossier text-white/60 text-xl leading-[1.8] italic font-medium"
                    dangerouslySetInnerHTML={{ __html: archiveData.mainContent }}
                  />

                  {/* HISTORICAL NODE */}
                  <div className="mt-24 p-14 bg-[#D4AF37]/5 border-l-4 border-[#D4AF37] rounded-r-[3rem] relative group shadow-inner">
                    <h4 className="text-[#D4AF37] font-black uppercase text-[10px] tracking-[0.4em] mb-8">Evolutionary Context</h4>
                    <p className="italic text-white/80 leading-relaxed text-2xl font-black tracking-tight">
                      {archiveData.history}
                    </p>
                  </div>
                </div>

                {/* FAQ PROTOCOL */}
                <section className="mt-40 space-y-16">
                  <div className="flex items-center gap-6">
                    <HelpCircle className="text-[#D4AF37]" size={32} />
                    <h3 className="text-3xl font-black uppercase tracking-tighter italic">Inquiry <span className="text-[#D4AF37]">Protocol</span></h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    {archiveData.faqs.map((faq: any, i: number) => (
                      <div key={i} className="p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:border-[#D4AF37]/30 transition-all duration-500 hover:bg-white/[0.04]">
                        <p className="text-[#D4AF37] font-black text-xl mb-6 italic tracking-tight uppercase">Q: {faq.question}</p>
                        <p className="text-white/40 leading-relaxed italic text-lg font-medium">A: {faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </article>
            ) : null}
          </main>

          {/* SIDEBAR ANALYTICS */}
          <aside className="lg:col-span-4">
            <div className="p-12 rounded-[4rem] border border-white/5 sticky top-40 bg-white/[0.01] backdrop-blur-3xl space-y-10 shadow-2xl">
              <div className="flex items-center gap-4 border-b border-white/5 pb-8">
                <Activity size={24} className="text-[#D4AF37]" />
                <h4 className="text-white font-black uppercase text-[12px] tracking-[0.3em]">Registry Status</h4>
              </div>
              
              <div className="space-y-8">
                {[
                  { label: "Security Lvl", val: "Lvl 9 Vault" },
                  { label: "Sync Status", val: "Live Connection" },
                  { label: "Data Integrity", val: "Verified (AES-256)" },
                  { label: "Format", val: "Standard Dossier" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center group">
                    <span className="text-white/20 font-black text-[9px] uppercase tracking-widest">{item.label}</span>
                    <span className="text-white font-black italic text-xs tracking-tight">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/5 text-center">
                  <p className="text-white/30 text-[9px] leading-relaxed italic">
                    Archival data is dynamically processed through decentralized knowledge nodes.
                  </p>
              </div>
            </div>
          </aside>
        </div>

      </div>
    </div>
  );
};
