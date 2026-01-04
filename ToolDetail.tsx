import React from 'react';
import { ArrowLeft, Share2, Info, Zap } from 'lucide-react';

// Import your tool components - Ensure these filenames match your actual files exactly
import { BMICalculator } from './BMICalculator';
import { AgeCalculator } from './AgeCalc';
import { PasswordForgeTool } from './PasswordForgeTool';
import { WordCounter } from './WordCounter';
import { BirthWatchTool } from './BirthWatchTool';
import { UnitConverter } from './UnitConverter';
import { WeatherLive } from './WeatherLive';

interface ToolDetailProps {
  id: string;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ id }) => {
  
  const goBack = () => {
    window.location.hash = '#/tools';
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("System Link Copied: Access protocol saved to clipboard.");
  };

  const handleInfo = () => {
    alert("StrongTools Protocol: This instrument processes data locally for maximum security. No user data is stored on external servers.");
  };

  const renderTool = () => {
    switch (id) {
      case 'bmi-calc':       return <BMICalculator />;
      case 'age-calc':       return <AgeCalculator />;
      case 'pwd-gen':        return <PasswordForgeTool />;
      case 'scribe-counter': return <WordCounter />;
      case 'birth-watch':    return <BirthWatchTool />;
      case 'unit-conv':      return <UnitConverter />;
      case 'weather-live':   return <WeatherLive />;
      default:
        return (
          <div className="text-center py-32 animate-pulse">
            <Zap size={48} className="mx-auto text-[#D4AF37] mb-6 opacity-20" />
            <h2 className="text-2xl font-black text-[#D4AF37] uppercase tracking-widest italic">Instrument Offline</h2>
            <p className="text-gray-500 mt-4 text-xs uppercase tracking-[0.3em]">The requested module is currently undergoing calibration.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation Interface */}
        <nav className="flex items-center justify-between mb-20 animate-in fade-in slide-in-from-top-5 duration-1000">
          <button 
            onClick={goBack}
            className="group flex items-center gap-4 text-gray-500 hover:text-[#D4AF37] transition-all"
          >
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all shadow-xl">
              <ArrowLeft size={18} />
            </div>
            <span className="text-[10px] uppercase font-black tracking-[0.4em] italic">Return to Vault</span>
          </button>

          <div className="flex gap-3">
            <button 
              onClick={handleShare}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
            >
              <Share2 size={16} className="text-gray-500 group-hover:text-[#D4AF37]" />
            </button>
            <button 
              onClick={handleInfo}
              className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all group"
            >
              <Info size={16} className="text-gray-500 group-hover:text-[#D4AF37]" />
            </button>
          </div>
        </nav>

        {/* Live Module Interaction Area */}
        <main className="animate-in fade-in zoom-in duration-1000 delay-200">
          {renderTool()}
        </main>

        {/* System Credentials */}
        <footer className="mt-32 pt-12 border-t border-white/5 text-center opacity-30">
          <p className="text-[9px] font-black uppercase tracking-[0.8em] text-gray-400 italic">
            StrongTools Precision Instruments • Security Protocol Verified • 2026
          </p>
        </footer>
      </div>
    </div>
  );
};
