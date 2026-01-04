import React, { useState } from 'react';
import { Activity, Info } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);
  const [category, setCategory] = useState('');

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;

    if (w > 0 && h > 0) {
      const score = parseFloat((w / (h * h)).toFixed(1));
      setBmi(score);

      if (score < 18.5) setCategory('Underweight');
      else if (score < 25) setCategory('Optimal');
      else if (score < 30) setCategory('Overweight');
      else setCategory('Obese');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 rounded-[2.5rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl animate-in fade-in duration-700">
      <div className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <Activity className="text-[#D4AF37]" size={24} />
          </div>
          <div>
            <h2 className="text-xl font-black uppercase tracking-tighter italic text-white">Biological Index</h2>
            <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500">Physiological Assessment Protocol</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">Mass (KG)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37]/50 transition-all font-mono"
            placeholder="00.0"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[10px] uppercase tracking-widest text-gray-500 ml-2">Stature (CM)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37]/50 transition-all font-mono"
            placeholder="000"
          />
        </div>
      </div>

      <button
        onClick={calculateBMI}
        className="w-full bg-[#D4AF37] text-black font-black py-5 rounded-2xl uppercase tracking-[0.2em] italic hover:bg-white transition-all shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-8"
      >
        Execute Analysis
      </button>

      {bmi && (
        <div className="p-8 rounded-3xl bg-white/5 border border-[#D4AF37]/30 text-center animate-in zoom-in duration-500">
          <p className="text-[10px] uppercase tracking-[0.5em] text-[#D4AF37] mb-4">Calculated Result</p>
          <div className="text-7xl font-black text-white mb-2 font-mono tracking-tighter">
            {bmi.toLocaleString('en-US')}
          </div>
          <div className="inline-block px-4 py-1 rounded-full border border-[#D4AF37]/50 text-[#D4AF37] text-[10px] uppercase font-bold tracking-widest">
            Status: {category}
          </div>
        </div>
      )}

      <div className="mt-8 flex items-start gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 opacity-50">
        <Info size={14} className="text-[#D4AF37] mt-1" />
        <p className="text-[9px] text-gray-400 leading-relaxed uppercase tracking-wider">
          Institutional Note: This index is a standardized metric. For clinical diagnostics, please consult the medical core.
        </p>
      </div>
    </div>
  );
};
