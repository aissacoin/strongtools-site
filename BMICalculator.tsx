import React, { useState } from 'react';
import { Calculator, Activity, Target } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ bmi: string; status: string; color: string } | null>(null);

  const calculateBMI = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    
    if (h > 0 && w > 0) {
      // Logic for English numbers only
      const bmiValue = (w / (h * h)).toFixed(1);
      let status = '';
      let color = '';

      const bmiNum = parseFloat(bmiValue);
      if (bmiNum < 18.5) { status = 'Underweight'; color = '#3b82f6'; }
      else if (bmiNum < 25) { status = 'Healthy Weight'; color = '#D4AF37'; }
      else if (bmiNum < 30) { status = 'Overweight'; color = '#f59e0b'; }
      else { status = 'Obese'; color = '#ef4444'; }

      setResult({ bmi: bmiValue, status, color });
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-12 rounded-[3rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl backdrop-blur-xl">
      {/* Header */}
      <div className="flex items-center gap-5 mb-12 text-[#D4AF37]">
        <div className="p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
          <Activity size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest italic leading-none">Body Index</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mt-1">Composition Registry</p>
        </div>
      </div>

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-2">Weight (KG)</label>
          <input 
            type="number" 
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-[#D4AF37]/50 transition-all text-2xl font-mono text-white"
            placeholder="00"
          />
        </div>
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37] ml-2">Height (CM)</label>
          <input 
            type="number" 
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-[#D4AF37]/50 transition-all text-2xl font-mono text-white"
            placeholder="000"
          />
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={calculateBMI}
        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_20px_40px_rgba(212,175,55,0.15)] group"
      >
        <span className="flex items-center justify-center gap-2">
          Execute Analysis <Target size={18} className="group-hover:rotate-90 transition-transform" />
        </span>
      </button>

      {/* Results Display */}
      {result && (
        <div className="mt-12 p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10 text-center space-y-6">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500">Analysis Status</p>
            {/* forcing English numbers via .toLocaleString('en-US') */}
            <h3 className="text-8xl font-black font-mono tracking-tighter" style={{ color: result.color }}>
              {Number(result.bmi).toLocaleString('en-US', { minimumFractionDigits: 1 })}
            </h3>
            <div className="inline-block px-6 py-2 rounded-full border border-white/10 bg-white/5">
              <p className="text-sm italic font-medium text-white/90">{result.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
