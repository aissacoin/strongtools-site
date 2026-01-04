import React from 'react';
import { ArrowLeft, Share2, Info } from 'lucide-react';
// Import your tool components here
import { BMICalculator } from './BMICalculator';
import { AgeCalculator } from './AgeCalc'; // Ensure the filename matches yours

interface ToolDetailProps {
  id: string;
  initialDate?: string;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ id }) => {
  // Navigation function to go back
  const goBack = () => {
    window.location.hash = '#/tools';
  };

  // Logic to determine which tool component to render
  const renderTool = () => {
    switch (id) {
      case 'bmi-calculator':
        return <BMICalculator />;
      case 'age-calculator':
        return <AgeCalculator />;
      // Add more cases here as you create more tools
      default:
        return (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-[#D4AF37]">Instrument Not Found</h2>
            <p className="text-gray-500 mt-4">The requested digital tool is currently being calibrated.</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Navigation Bar */}
        <nav className="flex items-center justify-between mb-16 animate-in fade-in slide-in-from-top-5 duration-700">
          <button 
            onClick={goBack}
            className="group flex items-center gap-3 text-gray-400 hover:text-[#D4AF37] transition-colors"
          >
            <div className="p-2 rounded-full bg-white/5 border border-white/10 group-hover:border-[#D4AF37]/50 transition-all">
              <ArrowLeft size={20} />
            </div>
            <span className="text-xs uppercase font-black tracking-[0.3em]">Back to Archive</span>
          </button>

          <div className="flex gap-4">
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all">
              <Share2 size={18} className="text-gray-400" />
            </button>
            <button className="p-3 rounded-2xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all">
              <Info size={18} className="text-gray-400" />
            </button>
          </div>
        </nav>

        {/* Tool Rendering Area */}
        <main className="animate-in fade-in zoom-in duration-1000">
          {renderTool()}
        </main>

        {/* System Footer */}
        <footer className="mt-24 pt-12 border-t border-white/5 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-gray-600">
            StrongTools Precision Instruments • Security Verified
          </p>
        </footer>
      </div>
    </div>
  );
};
