
import React, { useState } from 'react';
import { Layout } from './Layout';
import { ToolModal } from './ToolModal';
import { TOOLS, NAV_LINKS } from './constants';
import { getAutomatedArchive } from './geminiService';

// Direct imports from the root folder
import { BMICalculator } from './BMICalculator';
import { WordCounter } from './WordCounter';
import { AgeCalc } from './AgeCalc';
import { PercentageCalc } from './PercentageCalc';
import { MorseCodeTool } from './MorseCodeTool';
import { WeatherLive } from './WeatherLive';
import { BirthWatchTool } from './BirthWatchTool';
import { 
  Clock, History, Zap, ChevronRight, Quote, Landmark, 
  QrCode, RefreshCw, BookOpen, ArrowUpRight, Loader2,
  ScrollText, Sparkles, ShieldCheck
} from 'lucide-react';

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
    default: return (
      <div className="text-center py-10 bg-white/5 rounded-3xl border border-dashed border-white/10 opacity-20">
        <Zap size={32} className="mx-auto" />
      </div>
    );
  }
};

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
  const [quote, setQuote] = React.useState<{ quote: string; author: string } | null>(null);
  const [historyEvent, setHistoryEvent] = React.useState<string | null>(null);
  const [currentTime, setCurrentTime] = React.useState(new Date());
  const [activeToolId, setActiveToolId] = React.useState<string | null>(null);
  const [chronicles, setChronicles] = React.useState<ArchivalRecord[]>([]);
  const [loadingChronicles, setLoadingChronicles] = React.useState(true);

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
        // Automatically generate/fetch content for the top 3 tools for the home page feed
        const featuredIds = ['weather-live', 'bmi-calc', 'scribe-counter'];
        const results = await Promise.all(featuredIds.map(id => getAutomatedArchive(id)));
        setChronicles(results.filter((r): r is ArchivalRecord => r !== null));
      } catch (e) {
        console.error("Chronicle Sync Failed", e);
      } finally {
        setLoadingChronicles(false);
      }
    };

    fetchData();
    fetchHomeChronicles();
    return () => clearInterval(timer);
  }, []);

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  return (
    <div className="pb-32 px-4 sm:px-6 lg:px-8 overflow-x-hidden">
      {/* Hero Section */}
      <section className="pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.6em] mb-12 animate-gold-pulse shadow-xl">
          <Zap size={16} /> Registry v4.2 Secured
        </div>
        <h1 className="text-5xl md:text-9xl font-black tracking-tighter text-white mb-10 leading-[0.85] uppercase italic font-serif-scholarly">
          THE <span className="text-[#D4AF37] text-glow">ULTIMATE</span><br/>
          UTILITY <span className="opacity-40">VAULT</span>
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg italic font-medium mb-12">
          "Where absolute mathematical rigor meets digital craftsmanship."
        </p>
      </section>

      {/* Dashboard Metrics */}
      <section className="max-w-7xl mx-auto mb-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          <div className="md:col-span-3 glass-3d rounded-[3rem] p-10 flex flex-col justify-between min-h-[300px]">
            <div className="flex items-center gap-3 text-[#D4AF37]/60 mb-6"><Clock size={20} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Temporal Node</span></div>
            <div className="text-6xl font-black text-white tabular-nums tracking-tighter leading-none">
              {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-[11px] text-white/40 font-black uppercase tracking-[0.3em] leading-relaxed">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long' })}<br/>{currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
          </div>

          <div className="md:col-span-6 glass-3d rounded-[4rem] p-12 border-2 border-[#D4AF37]/30 relative overflow-hidden flex flex-col justify-between">
            <div className="flex items-center gap-4 text-[#D4AF37] mb-10"><History size={24} /><span className="text-[11px] font-black uppercase tracking-[0.6em]">Archival Record</span></div>
            <p className="text-3xl sm:text-4xl font-black text-white leading-tight italic tracking-tight">{historyEvent || "Retrieving Historical Context..."}</p>
            <div className="pt-10 flex items-center justify-between border-t border-white/5 text-[9px] font-bold text-[#D4AF37]/30 uppercase tracking-widest italic">
              Registry Verified • {new Date().getFullYear()}
            </div>
          </div>

          <div className="md:col-span-3 glass-3d rounded-[3rem] p-10 flex flex-col justify-between text-center min-h-[300px]">
            <div className="flex items-center justify-center gap-3 text-[#D4AF37]/60 mb-6"><Quote size={20} /><span className="text-[10px] font-black uppercase tracking-[0.4em]">Sovereign Quote</span></div>
            <p className="text-xl font-bold text-white leading-relaxed italic">"{quote?.quote || "Fetching wisdom..."}"</p>
            <div className="mt-8 text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">— {quote?.author}</div>
          </div>
        </div>
      </section>

      {/* Tool Index Grid */}
      <section className="max-w-7xl mx-auto mb-32 space-y-16">
        <div className="flex items-center gap-8">
          <Landmark className="text-[#D4AF37] shrink-0" size={32} />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.5em] text-white">THE <span className="text-[#D4AF37] text-glow">VAULT</span> INDEX</h2>
          <div className="flex-grow h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent"></div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {TOOLS.slice(0, 8).map(tool => {
            const IconComponent = (LucideIcons as any)[tool.icon] || LucideIcons.Zap;
            const colors = CATEGORY_COLORS[tool.category] || { bg: 'bg-zinc-800', text: 'text-white' };
            return (
              <div key={tool.id} className="tool-card-3d">
                <button 
                  onClick={() => setActiveToolId(tool.id)}
                  className="w-full text-left h-full glass-3d p-10 rounded-[4rem] flex flex-col items-center text-center space-y-8 group relative overflow-hidden transition-all"
                >
                  <div className={`w-28 h-28 rounded-[2.5rem] flex items-center justify-center ${colors.bg} ${colors.text} shadow-2xl group-hover:scale-110 transition-all duration-500`}>
                    <IconComponent size={48} strokeWidth={2} />
                  </div>
                  <div className="space-y-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/40 italic">{tool.category}</span>
                    <h4 className="text-3xl font-black text-white leading-none italic tracking-tighter">{tool.name}</h4>
                    <p className="text-[var(--text-dim)] text-sm font-medium italic line-clamp-2">"{tool.description}"</p>
                  </div>
                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-[#D4AF37] text-[10px] font-black uppercase tracking-widest">
                    Open Module <ChevronRight size={14}/>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* AD Banner Alpha */}
      <div className="max-w-7xl mx-auto mb-32 ad-placeholder h-24"> [High-Frequency Registry Ad Inventory] </div>

      {/* Automated Daily Chronicles Section */}
      <section className="max-w-7xl mx-auto mb-40 space-y-20">
        <div className="flex items-center gap-8">
          <ScrollText className="text-[#D4AF37] shrink-0" size={32} />
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-[0.5em] text-white">DAILY <span className="text-[#D4AF37] text-glow">CHRONICLES</span></h2>
          <div className="flex-grow h-px bg-gradient-to-r from-[#D4AF37]/40 to-transparent"></div>
          <span className="text-[10px] font-black text-[#D4AF37]/50 uppercase tracking-widest italic flex items-center gap-2">
            <RefreshCw size={12} className="animate-spin-slow" /> Cycle: {getCycleSeed()}
          </span>
        </div>

        {loadingChronicles ? (
          <div className="py-24 text-center space-y-6">
            <Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={64} />
            <p className="text-[12px] font-black uppercase tracking-[0.4em] text-[#D4AF37] animate-pulse">Synchronizing Archival Excerpts...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {chronicles.map((record, idx) => (
              <article key={idx} className="glass-3d rounded-[4rem] overflow-hidden group hover:border-[#D4AF37]/50 transition-all flex flex-col h-full bg-white/[0.01]">
                {record.imageUrl && (
                  <div className="h-64 relative overflow-hidden bg-black/40 border-b border-white/5">
                    <img src={record.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]" alt={record.title} />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
                    <div className="absolute top-6 left-6 flex items-center gap-2 bg-[#D4AF37]/20 backdrop-blur-md px-4 py-2 rounded-full border border-[#D4AF37]/30">
                      <Sparkles size={12} className="text-[#D4AF37]" />
                      <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest">{record.type} Node</span>
                    </div>
                  </div>
                )}
                <div className="p-10 flex-grow flex flex-col space-y-6">
                  <div className="flex items-center gap-4 text-[#D4AF37]/40 text-[9px] font-black uppercase tracking-widest">
                    <History size={14} /> {record.cycle}
                  </div>
                  <h3 className="text-2xl font-black text-white italic font-serif-scholarly leading-tight group-hover:text-[#D4AF37] transition-colors">{record.title}</h3>
                  <div 
                    className="text-gray-400 text-sm italic line-clamp-4 leading-relaxed opacity-80"
                    dangerouslySetInnerHTML={{ __html: record.content.substring(0, 300) + '...' }}
                  />
                  <div className="pt-4 flex-grow flex items-end">
                    <button 
                      onClick={() => {
                        const toolMatch = TOOLS.find(t => record.title.includes(t.name));
                        if (toolMatch) setActiveToolId(toolMatch.id);
                      }}
                      className="inline-flex items-center gap-2 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em] hover:text-white transition-all"
                    >
                      Read Full Manuscript <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        <div className="text-center pt-10">
           <a href="#/blog" className="px-16 py-6 bg-white/5 border-2 border-[#D4AF37]/20 text-white rounded-[2.5rem] font-black uppercase tracking-[0.4em] text-xs hover:bg-[#D4AF37]/10 hover:border-[#D4AF37] transition-all shadow-2xl">
             Explore Full Chronicle Vault
           </a>
        </div>
      </section>

      {/* Footer Credentials */}
      <section className="max-w-7xl mx-auto py-20 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
         <div className="flex items-center gap-4 text-[#D4AF37]/60">
           <ShieldCheck size={24} />
           <span className="text-[10px] font-black uppercase tracking-[0.5em]">High-Fidelity AdSense Optimized Architecture</span>
         </div>
         <div className="flex gap-4">
           {[1,2,3,4,5].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#D4AF37]/10"></div>)}
         </div>
      </section>

      {/* Automated Tool Modal */}
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
