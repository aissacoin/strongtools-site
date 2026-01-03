import React, { useState } from 'react';
import { Scale, Info } from 'lucide-react';

export const BMICalculator: React.FC = () => {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<{ bmi: string; status: string } | null>(null);

  const calculateBMI = () => {
    const w = parseFloat(weight);
    const h = parseFloat(height) / 100;
    if (w > 0 && h > 0) {
      const bmiValue = (w / (h * h)).toFixed(1);
      let status = '';
      if (parseFloat(bmiValue) < 18.5) status = 'Underweight';
      else if (parseFloat(bmiValue) < 25) status = 'Normal Weight';
      else if (parseFloat(bmiValue) < 30) status = 'Overweight';
      else status = 'Obese';
      setResult({ bmi: bmiValue, status });
    }
  };

  return (
    <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-[2.5rem] p-8 max-w-xl mx-auto shadow-[0_0_50px_rgba(212,175,55,0.1)]">
      <div className="flex items-center gap-3 mb-8">
        <Scale className="text-[#D4AF37]" size={32} />
        <h2 className="text-2xl font-black text-white uppercase italic">Bio-Metric Analyzer</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2 ml-4">Weight (KG)</label>
          <input 
            type="number" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)}
            className="w-full bg-black border border-[#D4AF37]/20 rounded-2xl p-4 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] transition-all"
            placeholder="e.g. 75"
          />
        </div>

        <div>
          <label className="block text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold mb-2 ml-4">Height (CM)</label>
          <input 
            type="number" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)}
            className="w-full bg-black border border-[#D4AF37]/20 rounded-2xl p-4 text-[#D4AF37] focus:outline-none focus:border-[#D4AF37] transition-all"
            placeholder="e.g. 180"
          />
        </div>

        <button 
          onClick={calculateBMI}
          className="w-full bg-[#D4AF37] text-black font-black uppercase tracking-widest py-4 rounded-2xl hover:bg-white transition-all transform hover:scale-[1.02]"
        >
          Execute Analysis
        </button>

        {result && (
          <div className="mt-8 p-6 bg-black/50 border border-[#D4AF37]/40 rounded-3xl text-center animate-in fade-in slide-in-from-bottom-4">
            <div className="text-4xl font-black text-[#D4AF37] mb-2">{result.bmi}</div>
            <div className="text-sm uppercase tracking-widest text-white font-bold">{result.status}</div>
          </div>
        )}
        
        <div className="flex items-start gap-3 mt-4 px-4 opacity-40">
           <Info size={14} className="mt-0.5 text-[#D4AF37]" />
           <p className="text-[9px] font-bold text-white uppercase tracking-wider leading-relaxed">
             The Archive recommends consulting medical professionals for definitive physiological diagnostics. This module serves as an informational estimator.
           </p>
        </div>
      </div>
    </div>
  );
};