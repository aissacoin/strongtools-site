import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Clock, History, Zap, ChevronRight, Quote, Landmark, 
  QrCode, RefreshCw, BookOpen, ArrowUpRight, Loader2,
  ScrollText, Sparkles, ShieldCheck
} from 'lucide-react';

import { ToolModal } from './ToolModal';
import { TOOLS } from './constants';
import { getAutomatedArchive } from './geminiService';

// Direct Component Imports
import { BMICalculator } from './BMICalculator';
import { WordCounter } from './WordCounter';
import { AgeCalc } from './AgeCalc'; 
import { PercentageCalc } from './PercentageCalc';
import { MorseCodeTool } from './MorseCodeTool';
import { WeatherLive } from './WeatherLive';
import { BirthWatchTool } from './BirthWatchTool';
import { BinaryConverter } from './BinaryConverter';
import { StopwatchTimer } from './StopwatchTimer';

interface ArchivalRecord {
  title: string;
  content: string;
  type: string;
  cycle: string;
  imageUrl?: string;
}

// Global UI Helpers
const getDailyQuote = async () => ({ 
    quote: "Precision is the soul of digital craftsmanship.", 
    author: "Registry Chronicles" 
});

const getOnThisDay = async () => {
    const dateStr = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    return `System Pulse: Optimized for ${dateStr}`;
};

const getCycleSeed = () => {
    return new Date().getDate().toString().padStart(4, '0');
};

// Tool Execution Engine - Handles routing to the correct component
export const renderToolLogic = (id: string) => {
  switch (id) {
    case 'weather-live': 
    case 'real-time-weather':   return <WeatherLive />;
    case 'bmi-calc':            return <BMICalculator />;
    case 'scribe-counter':      return <WordCounter />;
    case 'perc-calc':           return <PercentageCalc />;
    case 'age-calc':            return <AgeCalc />;
    case 'birth-watch': 
    case 'birth-year-history':  return <BirthWatchTool />;
    case 'morse-code':          return <MorseCodeTool />;
    case 'text-to-binary':
    case 'binary-conv':         return <BinaryConverter />;
    case 'stopwatch-timer':
    case 'countdown-timer':     return <StopwatchTimer />;
    case 'pwd-gen':             return <PasswordForgeTool />;
    case 'unit-conv':           return <UnitConvTool />;
    case 'basic-calc':          return <BasicCalcTool />;
    case 'qr-gen': return (
      <div className="text-center p-8 bg-black/40 rounded-[2rem] border border-[#D4AF37]/20">
        <QrCode className="mx-auto text-[#D4AF37] mb-4" size={48} />
        <p className="text-sm font-bold text-white mb-4 italic uppercase tracking-widest">Vault QR Generator</p>
        <img 
          src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent('https://aissacoin.github.io/strongtools-site/')}`} 
          className="mx-auto bg-white p-2 rounded-xl" 
          alt="QR Code" 
        />
      </div>
    );
    default: return (
      <div className="text-center py-20 opacity-20">
        <Zap size={48} className="mx-auto mb-4 text-[#D4AF37]" />
        <p className="text-[10px] uppercase font-black tracking-widest">Accessing Secure Module...</p>
      </div>
    );
  }
};

/** INTERNAL CORE TOOLS (Simplified Utilities) **/
const BasicCalcTool: React.FC = () => {
  const [val, setVal] = useState('0');
  const add = (v: string) => setVal(p => (p === '0' || p === 'Error' ? v : p + v));
  const solve = () => { 
    try { 
        const result = Function(`"use strict"; return (${val.replace(/[^-+*/.0-9]/g, '')})`)();
        setVal(String(result)); 
    } catch { setVal('Error'); } 
  };
  return (
    <div className="max-w-xs mx-auto bg-black p-6 rounded-[2rem] border border-[#D4AF37]/20">
      <div className="bg-black/80 p-6 rounded-xl text-right text-3xl font-black text-white mb-4 border border-white/5 h-20 flex items-center justify-end font-mono">
        {val}
      </div>
      <div className="grid grid-cols-4 gap-2">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(b => (
          <button key={b} onClick={() => b === '=' ? solve() : add(b)} className={`p-3 rounded-xl font-bold transition-all ${b === '=' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-[#D4AF37] hover:bg-white/10'}`}>
            {b}
          </button>
        ))}
      </div>
    </div>
  );
};

const UnitConvTool: React.FC = () => {
  const [input, setInput] = useState('1');
  const [type, setType] = useState('length');
  const [result, setResult] = useState('');
  useEffect(() => {
    const v = parseFloat(input) || 0;
    const opt = { minimumFractionDigits: 2, maximumFractionDigits: 2 };
    if (type === 'length') setResult(`${(v * 0.621371).toLocaleString('en-US', opt)} Miles`);
    else if (type === 'weight') setResult(`${(v * 2.20462).toLocaleString('en-US', opt)} lbs`);
    else setResult(`${((v * 9/5) + 32).toLocaleString('en-US', opt)} °F`);
  }, [input, type]);
  return (
    <div className="max-w-xs mx-auto space-y-4 text-white">
      <div className="flex justify-around gap-2 mb-4">
        {['length', 'weight', 'temp'].map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${type === t ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/40'}`}>{t}</button>
        ))}
      </div>
      <input type="number" value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-[#D4AF37] font-bold focus:outline-none" />
      <div className="p-4 bg-black/60 border border-[#D4AF37]/20 rounded-xl text-center text-white font-black">{result}</div>
    </div>
  );
};

const PasswordForgeTool: React.FC = () => {
  const [pwd, setPwd] = useState('Generating...');
  const gen = () => {
    const c = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setPwd(Array.from({length: 16}, () => c[Math.floor(Math.random() * c.length)]).join(''));
  };
  useEffect(gen, []);
  return (
    <div className="max-w-xs mx-auto space-y-6 text-center">
      <div className="bg-black/60 p-4 rounded-xl text-[#D4AF37] font-mono break-all border border-white/5">{pwd}</div>
      <button onClick={gen} className="w-full bg-[#D4AF37] text-black p-3 rounded-xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-transform">Forge New Cipher</button>
    </div>
  );
};

// MAIN HOME COMPONENT
export const Home: React.FC = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [historyEvent, setHistoryEvent] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [chronicles, setChronicles] = useState<ArchivalRecord[]>([]);
  const [loadingChronicles, setLoadingChronicles] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const fetchData = async () => {
      try {
        const [q, h] = await Promise.all([getDailyQuote(), getOnThisDay()]);
        setQuote(q);
        setHistoryEvent(h);
      } catch (e) { console.error("Archive Sync failure", e); }
    };
    
    const fetchHomeChronicles = async () => {
      setLoadingChronicles(true);
      try {
        const featuredIds = ['weather-live', 'bmi-calc', 'scribe-counter'];
        const results = await Promise.all(featuredIds.map(id => getAutomatedArchive(id)));
        setChronicles(results.filter((r): r is ArchivalRecord => r !== null));
      } catch (e) { console.error("Chronicle Registry Sync Failed", e); }
      finally { setLoadingChronicles(false); }
    };

    fetchData();
    fetchHomeChronicles();
    return () => clearInterval(timer);
  }, []);

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  return (
    <div className="pb-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden text-white bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      
      {/* HERO SECTION - INSTITUTIONAL BRANDING */}
      <section className="pt-32 pb-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] mb-12 shadow-2xl animate-pulse">
          <ShieldCheck size={16} /> Registry Access: Tier 1 Secured
        </div>
        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white mb-10 leading-[0.85] uppercase italic">
          THE <span className="text-[#D4AF37]">ULTIMATE</span><br/>
          UTILITY <span className="opacity-40">VAULT</span>
        </h1>
        <p className="text-white/30 text-lg md:text-xl uppercase tracking-[0.4em] italic font-medium">Digital Craftsmanship & Professional Instruments</p>
      </section>

      {/* DASHBOARD METRICS */}
      <section className="max-w-7xl mx-auto mb-40">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-3 bg-white/[0.02] rounded-[3rem] p-10 flex flex-col justify-between min-h-[300px] border border-white/5 group hover:border-[#D4AF37]/30 transition-all duration-700">
            <Clock size={20} className="text-[#D4AF37]/60 group-hover:rotate-45 transition-transform" />
            <div className="text-6xl font-black text-white tabular-nums tracking-tighter">
              {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[10px] uppercase tracking-widest opacity-40 font-bold italic">Temporal Synchronization Node</div>
          </div>

          <div className="md:col-span-6 bg-[#D4AF37]/5 rounded-[4rem] p-12 border-2 border-[#D4AF37]/20 relative flex flex-col justify-between shadow-[0_0_50px_rgba(212,175,55,0.05)]">
            <History size={24} className="text-[#D4AF37]" />
            <p className="text-3xl md:text-4xl font-black text-white italic leading-tight uppercase tracking-tight">
                {historyEvent || "Calibrating Archive Context..."}
            </p>
          </div>

          <div className="md:col-span-3 bg-white/[0.02] rounded-[3rem] p-10 flex flex-col justify-between text-center border border-white/5">
            <Quote size={20} className="mx-auto text-[#D4AF37]/60" />
            <p className="text-xl font-bold text-white italic leading-relaxed">"{quote?.quote || "Fetching wisdom..."}"</p>
            <div className="text-[9px] uppercase tracking-widest opacity-20 font-black">— {quote?.author}</div>
          </div>
        </div>
      </section>

      {/* TOOL INDEX GRID */}
      <section className="max-w-7xl mx-auto mb-48 space-y-20">
        <div className="flex items-center gap-8">
          <Landmark className="text-[#D4AF37]" size={32} />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.5em] text-white italic">THE <span className="text-[#D4AF37]">VAULT</span> INDEX</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {TOOLS.map(tool => {
            const IconComponent = (LucideIcons as any)[tool.icon] || Zap;
            return (
              <div 
                key={tool.id} 
                className="relative group cursor-pointer" 
                onClick={() => setActiveToolId(tool.id)}
              >
                <div className="absolute -inset-2 bg-[#D4AF37]/10 rounded-[4.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="relative bg-white/[0.02] p-12 rounded-[4rem] border border-white/5 hover:border-[#D4AF37]/50 transition-all text-center space-y-8 group-hover:-translate-y-2 group-hover:bg-[#0a0a0a]">
                  <div className="w-24 h-24 mx-auto rounded-[2rem] flex items-center justify-center bg-black/60 text-[#D4AF37] border border-[#D4AF37]/10 group-hover:scale-110 group-hover:border-[#D4AF37]/50 transition-all duration-700">
                    <IconComponent size={40} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-2xl font-black uppercase italic tracking-tighter text-white group-hover:text-[#D4AF37] transition-colors">{tool.name}</h4>
                    <p className="text-[9px] opacity-30 uppercase font-black tracking-[0.3em] mt-3 italic">{tool.category}</p>
                  </div>
                  <div className="pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <ArrowUpRight size={18} className="mx-auto text-[#D4AF37]" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DAILY CHRONICLES - AI CONTENT */}
      <section className="max-w-7xl mx-auto mb-40 space-y-20">
        <div className="flex items-center gap-8">
          <ScrollText className="text-[#D4AF37]" size={32} />
          <h2 className="text-3xl font-black uppercase tracking-[0.5em] italic">DAILY <span className="text-[#D4AF37]">CHRONICLES</span></h2>
          <span className="text-[10px] opacity-50 ml-auto tabular-nums font-mono border border-white/10 px-4 py-1 rounded-full uppercase tracking-widest italic">
            Cycle_ID: #{getCycleSeed()}
          </span>
        </div>

        {loadingChronicles ? (
          <div className="py-40 text-center space-y-6">
            <Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={56} strokeWidth={1} />
            <p className="text-[9px] font-black uppercase tracking-[0.5em] text-[#D4AF37] animate-pulse">Syncing Knowledge Nodes...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {chronicles.map((record, idx) => (
              <article 
                key={idx} 
                className="group bg-white/[0.02] rounded-[3.5rem] p-10 border border-white/5 hover:border-[#D4AF37]/30 transition-all flex flex-col justify-between hover:bg-[#0a0a0a]"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Sparkles size={14} className="text-[#D4AF37]" />
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 italic">Automated Dispatch</span>
                  </div>
                  <h3 className="text-2xl font-black text-white group-hover:text-[#D4AF37] mb-6 italic uppercase tracking-tighter leading-none transition-colors">{record.title}</h3>
                  <div 
                    className="text-white/40 text-base italic leading-relaxed opacity-70 prose-sm" 
                    dangerouslySetInnerHTML={{ __html: record.content.substring(0, 180) + '...' }} 
                  />
                </div>
                <div className="mt-10 pt-6 border-t border-white/5 flex items-center justify-between opacity-30 text-[9px] font-black uppercase tracking-widest">
                   <span>Archival Node: Vault_{idx + 1}</span>
                   <span>{record.cycle}</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="max-w-7xl mx-auto pt-24 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.8em] text-white/20 mb-4">StrongTools Registry © 2026</p>
        <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest text-white/10">
            <a href="#/privacy" className="hover:text-[#D4AF37] transition-colors">Privacy Protocol</a>
            <a href="#/terms" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a>
        </div>
      </footer>

      {/* MODAL SYSTEM */}
      <ToolModal 
        isOpen={!!activeToolId} 
        onClose={() => setActiveToolId(null)} 
        title={activeTool ? activeTool.name : ''} 
        toolId={activeToolId || ''}
      >
        {activeToolId && renderToolLogic(activeToolId)}
      </ToolModal>
    </div>
  );
};
