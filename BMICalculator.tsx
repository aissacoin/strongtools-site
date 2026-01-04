import React, { useState } from 'react';
import { Activity } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState<string | null>(null);

  const calculate = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w && h) {
      const result = (w / (h * h)).toFixed(1);
      setBmi(Number(result).toLocaleString('en-US'));
    }
  };

  return (
    <div className="max-w-xs mx-auto space-y-4 bg-black/40 p-6 rounded-[2rem] border border-[#D4AF37]/20">
      <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
        <Activity size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Biometric Scan</span>
      </div>
      <input type="number" placeholder="Weight (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-[#D4AF37] font-bold" />
      <input type="number" placeholder="Height (cm)" value={height} onChange={(e) => setHeight(e.target.value)} className="w-full bg-black border border-white/10 rounded-xl p-4 text-[#D4AF37] font-bold" />
      <button onClick={calculate} className="w-full bg-[#D4AF37] text-black font-black p-4 rounded-xl uppercase text-xs">Analyze BMI</button>
      {bmi && (
        <div className="text-center p-4 bg-white/5 rounded-2xl border border-white/5">
          <div className="text-4xl font-black text-white tabular-nums">{bmi}</div>
          <div className="text-[8px] uppercase text-[#D4AF37] font-black mt-2">Index Result</div>
        </div>
      )}
    </div>
  );
};
