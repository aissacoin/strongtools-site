import React, { useState, useEffect, useCallback } from 'react';
import { TOOLS } from "./constants";
import { getAutomatedArchive } from "./geminiService";

// 1. Import your custom tool components
import { BMICalculator } from './BMICalculator';
import { AgeCalculator } from './AgeCalc';
import { PasswordForgeTool } from './PasswordForgeTool';
import { BirthWatchTool } from './BirthWatchTool';
import { WeatherLive } from './WeatherLive';
import { WordCounter } from './WordCounter'; // Added this as we created it earlier

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

  // 2. Logic to render the specific interactive tool - MATCHED WITH constants.ts
  const renderToolInterface = () => {
    switch (id) {
      case 'bmi-calc': return <BMICalculator />;
      case 'age-calc': return <AgeCalculator />;
      case 'pwd-gen': return <PasswordForgeTool />;
      case 'birth-watch': return <BirthWatchTool />;
      case 'weather-live': return <WeatherLive />;
      case 'scribe-counter': return <WordCounter />;
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
      const data = await getAutomatedArchive(tool.id);
      if (!data) throw new Error("Registry synchronization protocol failed.");
      setArchiveData(data);

      // Fetching Visual Assets
      const query = encodeURIComponent(`${tool.name} technical digital luxury`);
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
            {tool.name}
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
                <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37] animate-pulse">Synchronizing
