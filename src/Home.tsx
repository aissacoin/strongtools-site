import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Clock, History, Zap, Landmark, 
  Terminal, ShieldCheck, Activity, Cpu 
} from 'lucide-react';

// Importing Tool Components
import { BMICalculator } from './BMICalculator';
import { WordCounter } from './WordCounter';
import { AgeCalc } from './AgeCalc';
import { PercentageCalc } from './PercentageCalc';
import { MorseCodeTool } from './MorseCodeTool';
import { WeatherLive } from './WeatherLive';
import { BirthWatchTool } from './BirthWatchTool';
import { PasswordForgeTool } from './PasswordForgeTool';
import { ToolModal } from './ToolModal';
import { TOOLS } from './constants';

export const Home: React.FC = () => {
  const [activeToolId, setActiveToolId] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Tool Logic Dispatcher
  const renderTool = (id: string) => {
    switch (id) {
      case 'weather-live': return <WeatherLive />;
      case 'bmi-calc': return <BMICalculator />;
      case 'scribe-counter': return <WordCounter />;
      case 'perc-calc': return <PercentageCalc />;
      case 'age-calc': return <AgeCalc />;
      case 'birth-watch': return <BirthWatchTool />;
      case 'morse-code': return <MorseCodeTool />;
      case 'pwd-gen': return <PasswordForgeTool />;
      default: return (
        <div className="flex flex-col items-center justify-center p-12 opacity-20 italic">
          <Cpu className="animate-spin mb-4" />
          <p className="text-xs uppercase tracking-widest font-black">Initializing Module...</p>
        </div>
      );
    }
  };

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  return (
    <div className="pb-32 px-4 sm:px-6 lg:px-8 text-white font-sans bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      
      {/* HERO SECTION - INSTITUTIONAL BRANDING */}
      <section className="pt-24 pb-32 text-center relative overflow-hidden">
        {/* Ambient Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#D4AF37]/5 via-transparent to-transparent opacity-50 pointer-events-none" />
        
        <div className="relative z-10">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.6em] mb-12 animate-pulse">
            <ShieldCheck size={12} /> Registry Protocol V4.2 Secured
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter mb-8 italic uppercase leading-[0.85]">
            The <span className="text-[#D4AF37]">Ultimate</span><br/>
            <span className="text-white/90">Utility Vault</span>
          </h1>
          
          <p className="text-white/30 text-xs md:text-sm font-bold uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed italic">
            High-precision digital instruments engineered for the modern professional.
          </p>
        </div>
      </section>

      {/* DASHBOARD METRICS - SYSTEM STATUS */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
        {/* Temporal Synchronizer */}
        <div className="bg-white/[0.03] p-12 rounded-[3.5rem] border border-white/5 flex flex-col items-center justify-center hover:bg-white/[0.05] transition-colors group shadow-2xl">
          <Clock className="text-[#D4AF37] mb-6 group-hover:rotate-12 transition-transform" size={28} />
          <div className="text-6xl font-black tabular-nums tracking-tighter italic">
            {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
          <p className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-black mt-4">Universal Time Coordinate</p>
        </div>
        
        {/* Performance & Status Module */}
        <div className="md:col-span-2 bg-white/[0.03] p-12 rounded-[3.5rem] border-2 border-[#D4AF37]/10 flex flex-col justify-center relative overflow-hidden group shadow-2xl">
          <div className="absolute right-0 top-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={120} />
          </div>
          <div className="flex items-center gap-4 mb-4">
            <History className="text-[#D4AF37]" size={20} />
            <span className="text-[10px] font-black uppercase tracking-widest text-[#D4AF37]">Active System Pulse</span>
          </div>
          <p className="text-3xl font-black uppercase italic leading-tight max-w-md">
            Optimized for <span className="text-[#D4AF37]">Global Wonders</span> & Archival Excellence.
          </p>
        </div>
      </div>

      {/* THE VAULT GRID - TOOL SELECTION */}
      <section className="max-w-7xl mx-auto space-y-16">
        <div className="flex items-center justify-between border-b border-white/5 pb-8">
          <div className="flex items-center gap-4">
            <Landmark className="text-[#D4AF37]" size={24} />
            <h2 className="text-3xl font-black uppercase italic tracking-tighter">The Vault Index</h2>
          </div>
          <div className="hidden md:flex items-center gap-2 text-white/20 text-[10px] font-black uppercase tracking-widest">
            <Terminal size={14} /> System Ready
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOOLS.map(tool => {
            const Icon = (LucideIcons as any)[tool.icon] || Zap;
            return (
              <div 
                key={tool.id} 
                onClick={() => setActiveToolId(tool.id)}
                className="group relative bg-white/[0.03] p-10 rounded-[3rem] border border-white/10 hover:border-[#D4AF37]/40 cursor-pointer transition-all duration-500 hover:-translate-y-2 shadow-2xl overflow-hidden"
              >
                {/* Decorative Background Element */}
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-3xl group-hover:bg-[#D4AF37]/10 transition-colors" />
                
                <div className="w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-[#D4AF37] mb-8 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 border border-white/5 shadow-xl">
                  <Icon size={28} />
                </div>
                
                <h3 className="text-2xl font-black uppercase italic mb-3 tracking-tighter group-hover:text-[#D4AF37] transition-colors">
                  {tool.name}
                </h3>
                
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/30 font-black">
                    {tool.category}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* TOOL MODAL INTERFACE */}
      <ToolModal 
        isOpen={!!activeToolId} 
        onClose={() => setActiveToolId(null)} 
        title={activeTool?.name || 'Instrument'} 
        toolId={activeToolId || ''}
      >
        <div className="py-6">
          {activeToolId && renderTool(activeToolId)}
        </div>
      </ToolModal>

      {/* FOOTER BRANDING */}
      <footer className="mt-40 py-12 border-t border-white/5 text-center">
        <p className="text-[10px] font-black uppercase tracking-[1em] text-white/10 italic">
          StrongTools • Institutional Digital Registry
        </p>
      </footer>
    </div>
  );
};
