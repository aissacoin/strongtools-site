import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmi = (w / (h * h)).toFixed(1);
      setResult(bmi);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-10 rounded-[3rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl">
      <div className="flex items-center gap-4 mb-8 text-[#D4AF37]">
        <Activity size={24} />
        <h2 className="text-xl font-black uppercase tracking-widest italic">Biological Index</h2>
      </div>
      
      <div className="space-y-4 mb-8">
        <input 
          placeholder="Weight (kg)" 
          type="number"
          onChange={(e) => setWeight(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37]/50"
        />
        <input 
          placeholder="Height (cm)" 
          type="number"
          onChange={(e) => setHeight(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#D4AF37]/50"
        />
      </div>

      <button 
        onClick={calculate}
        className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-white transition-all"
      >
        Sync Metrics
      </button>

      {result && (
        <div className="mt-8 p-6 bg-white/5 rounded-3xl text-center border border-[#D4AF37]/20">
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-2">Your Index Score</p>
          <div className="text-6xl font-black text-white font-mono">{(Number(result)).toLocaleString('en-US')}</div>
        </div>
      )}
    </div>
  );
};
