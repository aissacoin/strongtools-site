
import React, { useState, useEffect } from 'react';
import { Percent } from 'lucide-react';

export const PercentageCalc: React.FC = () => {
  const [val1, setVal1] = useState<string>('10');
  const [val2, setVal2] = useState<string>('100');
  const [result, setResult] = useState<number | null>(10);

  useEffect(() => {
    const num1 = parseFloat(val1) || 0;
    const num2 = parseFloat(val2) || 0;
    setResult((num1 / 100) * num2);
  }, [val1, val2]);

  return (
    <div className="max-w-xs mx-auto space-y-4 bg-[#141414] p-6 rounded-[2rem] border border-[#D4AF37]/20 shadow-xl">
      <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
        <Percent size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Ratio Analysis</span>
      </div>
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <input 
            type="number" 
            value={val1} 
            onChange={(e) => setVal1(e.target.value)}
            className="w-full sm:w-20 bg-black border border-white/10 rounded-xl p-3 text-[#D4AF37] text-center outline-none focus:border-[#D4AF37] font-bold"
          />
          <span className="text-white/40 font-bold">% of</span>
          <input 
            type="number" 
            value={val2} 
            onChange={(e) => setVal2(e.target.value)}
            className="w-full flex-grow bg-black border border-white/10 rounded-xl p-3 text-white outline-none focus:border-[#D4AF37] font-bold"
          />
        </div>
        <div className="bg-[#D4AF37] text-black p-5 rounded-xl text-center font-black text-3xl shadow-lg animate-in zoom-in duration-300">
          {result?.toLocaleString(undefined, { maximumFractionDigits: 2 }) || '0'}
        </div>
      </div>
    </div>
  );
};
