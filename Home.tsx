import React, { useState } from 'react';
import * as LucideIcons from 'lucide-react'; // FIX: Proper import for Lucide
import { 
  Clock, History, Zap, ChevronRight, Quote, Landmark, 
  QrCode, RefreshCw, BookOpen, ArrowUpRight, Loader2,
  ScrollText, Sparkles, ShieldCheck
} from 'lucide-react';

import { ToolModal } from './ToolModal';
import { TOOLS } from './constants';
import { getAutomatedArchive } from './geminiService';

// Direct imports
import { BMICalculator } from './BMICalculator';
import { WordCounter } from './WordCounter';
import { AgeCalc } from './AgeCalc';
import { PercentageCalc } from './PercentageCalc';
import { MorseCodeTool } from './MorseCodeTool';
import { WeatherLive } from './WeatherLive';
import { BirthWatchTool } from './BirthWatchTool';

// FIX: Define missing type locally if not imported
interface ArchivalRecord {
  title: string;
  content: string;
  type: string;
  cycle: string;
  imageUrl?: string;
}

// FIX: Helper functions to prevent "Sync failure"
const getDailyQuote = async () => ({ quote: "Quality is not an act, it is a habit.", author: "Aristotle" });
const getOnThisDay = async () => "A new era of digital tools begins today.";
const getCycleSeed = () => (window as any).getCycleSeed ? (window as any).getCycleSeed() : new Date().getDate();

// Tool Components Implementation Mapper
export const renderToolLogic = (id: string) => {
  switch (id) {
    case 'weather-live': return <WeatherLive />;
    case 'bmi-calc': return <BMICalculator />;
    case 'scribe-counter': return <WordCounter />;
    case 'basic-calc': return <BasicCalcTool />;
    case 'perc-calc': return <PercentageCalc />;
    case 'age-calc': return <AgeCalc />;
    case 'birth-watch': return <BirthWatchTool />;
    case 'morse-code': return <MorseCodeTool />;
    case 'unit-conv': return <UnitConvTool />;
    case 'pwd-gen': return <PasswordForgeTool />;
    case 'qr-gen': return (
      <div className="text-center p-8 bg-black/40 rounded-[2rem] border border-[#D4AF37]/20">
        <QrCode className="mx-auto text-[#D4AF37] mb-4" size={48} />
        <p className="text-sm font-bold text-white mb-2">Registry QR Generator</p>
        <img src={`https://chart.googleapis.com/chart?cht=qr&chs=150x150&chl=${encodeURIComponent('https://strongtools.site')}`} className="mx-auto bg-white p-2 rounded-xl" alt="QR" />
      </div>
    );
    default: return <div className="text-center py-10"><Zap size={32} className="mx-auto opacity-20" /></div>;
  }
};

// Internal Tools
const BasicCalcTool: React.FC = () => {
  const [val, setVal] = React.useState('0');
  const add = (v: string) => setVal(p => (p === '0' || p === 'Error' ? v : p + v));
  const solve = () => { try { setVal(String(Function(`"use strict"; return (${val.replace(/[^-+*/.0-9]/g, '')})`)())); } catch { setVal('Error'); } };
  return (
    <div className="max-w-xs mx-auto bg-black p-6 rounded-[2rem] border border-[#D4AF37]/20">
      <div className="bg-black/80 p-6 rounded-xl text-right text-3xl font-black text-white mb-4 border border-white/5 h-20 flex items-center justify-end">{val}</div>
      <div className="grid grid-cols-4 gap-2">
        {['7','8','9','/','4','5','6','*','1','2','3','-','0','.','=','+'].map(b => (
          <button key={b} onClick={() => b === '=' ? solve() : add(b)} className={`p-3 rounded-xl font-bold transition-all ${b === '=' ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-[#D4AF37] hover:bg-white/10'}`}>{b}</button>
        ))}
      </div>
    </div>
  );
};

const UnitConvTool: React.FC = () => {
  const [input, setInput] = React.useState('1');
  const [type, setType] = React.useState('length');
  const [result, setResult] = React.useState('');
  React.useEffect(() => {
    const v = parseFloat(input) || 0;
    if (type === 'length') setResult(`${(v * 0.621371).toFixed(2)} Miles`);
    else if (type === 'weight') setResult(`${(v * 2.20462).toFixed(2)} lbs`);
    else setResult(`${((v * 9/5) + 32).toFixed(2)} °F`);
  }, [input, type]);
  return (
    <div className="max-w-xs mx-auto space-y-4">
      <div className="flex justify-around gap-2 mb-4">
        {['length', 'weight', 'temp'].map(t => (
          <button key={t} onClick={() => setType(t)} className={`px-3 py-1 rounded-full text-[9px] font-black uppercase border ${type === t ? 'bg-[#D4AF37] text-black' : 'bg-white/5 text-white/40'}`}>{t}</button>
        ))}
      </div>
      <input type="number" value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-[#D4AF37] font-bold" />
      <div className="p-4 bg-black/60 border border-[#D4AF37]/20 rounded-xl text-center text-white font-black">{result}</div>
    </div>
  );
};

const PasswordForgeTool: React.FC = () => {
  const [pwd, setPwd] = React.useState('Generating...');
  const gen = () => {
    const c = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*";
    setPwd(Array.from({length: 16}, () => c[Math.floor(Math.random() * c.length)]).join(''));
  };
  React.useEffect(gen, []);
  return (
    <div className="max-w-xs mx-auto space-y-6 text-center">
      <div className="bg-black/60 p-4 rounded-xl text-[#D4AF37] font-mono break-all border border-white/5">{pwd}</div>
      <button onClick={gen} className="w-full bg-[#D4AF37] text-black p-3 rounded-xl font-black uppercase text-[10px] tracking-widest">Forge New Cipher</button>
    </div>
  );
};

export const Home: React.FC = () => {
  const [quote, setQuote] = useState<{ quote: string; author: string } | null>(null);
  const [historyEvent, setHistoryEvent] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [chronicles, setChronicles] = useState<ArchivalRecord[]>([]);
  const [loadingChronicles, setLoadingChronicles] = useState(true);

  React.useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    const fetchData = async () => {
      try {
        const [q, h] = await Promise.all([getDailyQuote(), getOnThisDay()]);
        setQuote(q);
        setHistoryEvent(h);
      } catch (e) { console.error("Sync failure", e); }
    };
    
    const fetchHomeChronicles = async () => {
      setLoadingChronicles(true);
      try {
        const featuredIds = ['weather-live', 'bmi-calc', 'scribe-counter'];
        const results = await Promise.all(featuredIds.map(id => getAutomatedArchive(id)));
        setChronicles(results.filter((r): r is ArchivalRecord => r !== null));
      } catch (e) { console.error("Chronicle Sync Failed", e); }
      finally { setLoadingChronicles(false); }
    };

    fetchData();
    fetchHomeChronicles();
    return () => clearInterval(timer);
  }, []);

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  return (
    <div className="pb-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden text-white">
      {/* Hero Section */}
      <section className="pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] mb-12 shadow-xl">
          <Zap size={16} /> Registry v4.2 Secured
        </div>
        <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-white mb-10 leading-[0.85] uppercase italic">
          THE <span className="text-[#D4AF37]">ULTIMATE</span><br/>
          UTILITY <span className="opacity-40">VAULT</span>
        </h1>
      </section>

      {/* Dashboard Metrics */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-3 bg-white/5 rounded-[3rem] p-10 flex flex-col justify-between min-h-[300px]">
            <Clock size={20} className="text-[#D4AF37]/60" />
            <div className="text-6xl font-black text-white tabular-nums tracking-tighter">
              {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div className="md:col-span-6 bg-white/5 rounded-[4rem] p-12 border-2 border-[#D4AF37]/30 relative flex flex-col justify-between">
            <History size={24} className="text-[#D4AF37]" />
            <p className="text-3xl font-black text-white italic">{historyEvent || "Retrieving Context..."}</p>
          </div>

          <div className="md:col-span-3 bg-white/5 rounded-[3rem] p-10 flex flex-col justify-between text-center">
            <Quote size={20} className="mx-auto text-[#D4AF37]/60" />
            <p className="text-xl font-bold text-white italic">"{quote?.quote || "Fetching..."}"</p>
          </div>
        </div>
      </section>

      {/* Tool Index Grid */}
      <section className="max-w-7xl mx-auto mb-32 space-y-16">
        <div className="flex items-center gap-8">
          <Landmark className="text-[#D4AF37]" size={32} />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.5em] text-white">THE <span className="text-[#D4AF37]">VAULT</span> INDEX</h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {TOOLS.slice(0, 8).map(tool => {
            // FIX: Safely access icons
            const IconComponent = (LucideIcons as any)[tool.icon] || Zap;
            const categoryColor = (window as any).CATEGORY_COLORS?.[tool.category] || '#D4AF37';
            return (
              <div key={tool.id} className="relative group cursor-pointer" onClick={() => setActiveToolId(tool.id)}>
                <div className="bg-white/5 p-10 rounded-[4rem] border border-white/10 hover:border-[#D4AF37]/50 transition-all text-center space-y-6">
                  <div className="w-20 h-20 mx-auto rounded-3xl flex items-center justify-center bg-black/40 text-[#D4AF37]">
                    <IconComponent size={32} />
                  </div>
                  <h4 className="text-2xl font-black uppercase italic">{tool.name}</h4>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Automated Daily Chronicles */}
      <section className="max-w-7xl mx-auto mb-40 space-y-20">
        <div className="flex items-center gap-8">
          <ScrollText className="text-[#D4AF37]" size={32} />
          <h2 className="text-3xl font-black uppercase tracking-[0.5em]">DAILY <span className="text-[#D4AF37]">CHRONICLES</span></h2>
          <span className="text-[10px] opacity-50 ml-auto">Cycle: {getCycleSeed()}</span>
        </div>

        {loadingChronicles ? (
          <div className="py-24 text-center"><Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={48} /></div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {chronicles.map((record, idx) => (
              <article key={idx} className="bg-white/5 rounded-[3rem] p-8 border border-white/5 hover:border-[#D4AF37]/30 transition-all">
                <h3 className="text-xl font-black text-[#D4AF37] mb-4 italic">{record.title}</h3>
                <div className="text-gray-400 text-sm italic" dangerouslySetInnerHTML={{ __html: record.content.substring(0, 150) + '...' }} />
              </article>
            ))}
          </div>
        )}
      </section>

      <ToolModal isOpen={!!activeToolId} onClose={() => setActiveToolId(null)} title={activeTool ? activeTool.name : ''} toolId={activeToolId || ''}>
        {activeToolId && renderToolLogic(activeToolId)}
      </ToolModal>
    </div>
  );
};
