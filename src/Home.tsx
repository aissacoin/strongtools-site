import React, { useState, useEffect } from 'react';
import * as LucideIcons from 'lucide-react';
import { 
  Clock, History, Zap, Quote, Landmark, 
  QrCode, ScrollText, Loader2 
} from 'lucide-react';

// استيراد الأدوات من نفس المجلد (src)
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
      default: return <div className="text-center opacity-20 italic">Module loading...</div>;
    }
  };

  const activeTool = TOOLS.find(t => t.id === activeToolId);

  return (
    <div className="pb-32 px-4 sm:px-6 lg:px-8 text-white font-sans bg-[#050505]">
      {/* Hero Section */}
      <section className="pt-20 pb-24 text-center">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-12">
          <Zap size={14} /> Registry V4.2 Secured
        </div>
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 italic uppercase">
          The <span className="text-[#D4AF37]">Ultimate</span><br/>Utility Vault
        </h1>
      </section>

      {/* Stats Dashboard */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
        <div className="bg-white/5 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center">
          <Clock className="text-[#D4AF37] mb-4" />
          <div className="text-5xl font-black tabular-nums">
            {currentTime.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' })}
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-30 mt-2">Temporal Node</p>
        </div>
        
        <div className="md:col-span-2 bg-white/5 p-10 rounded-[3rem] border-2 border-[#D4AF37]/20 flex flex-col justify-center italic">
          <History className="text-[#D4AF37] mb-2" size={20} />
          <p className="text-2xl font-bold opacity-80">System Pulse: Optimized for Global Operations</p>
        </div>
      </div>

      {/* Index Grid */}
      <section className="max-w-7xl mx-auto space-y-12">
        <div className="flex items-center gap-4">
          <Landmark className="text-[#D4AF37]" />
          <h2 className="text-2xl font-black uppercase tracking-widest">The Vault Index</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TOOLS.map(tool => {
            const Icon = (LucideIcons as any)[tool.icon] || Zap;
            return (
              <div 
                key={tool.id} 
                onClick={() => setActiveToolId(tool.id)}
                className="group bg-white/5 p-8 rounded-[2.5rem] border border-white/10 hover:border-[#D4AF37]/50 cursor-pointer transition-all hover:bg-[#D4AF37]/5"
              >
                <div className="w-14 h-14 bg-black/40 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="text-xl font-black uppercase italic mb-2">{tool.name}</h3>
                <p className="text-[9px] uppercase tracking-widest opacity-30 font-bold">{tool.category}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Modal Tool Rendering */}
      <ToolModal 
        isOpen={!!activeToolId} 
        onClose={() => setActiveToolId(null)} 
        title={activeTool?.name || ''} 
        toolId={activeToolId || ''}
      >
        {activeToolId && renderTool(activeToolId)}
      </ToolModal>
    </div>
  );
};
