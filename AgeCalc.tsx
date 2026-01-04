import React, { useState } from 'react';
import { Timer, Calendar } from 'lucide-react';

export const AgeCalculator: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [age, setAge] = useState<{ y: number, m: number, d: number } | null>(null);

  const calculateAge = () => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    let y = now.getFullYear() - birth.getFullYear();
    let m = now.getMonth() - birth.getMonth();
    let d = now.getDate() - birth.getDate();

    if (d < 0) { m--; d += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }

    setAge({ y, m, d });
  };

  return (
    <div className="max-w-xl mx-auto p-10 rounded-[3rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl">
      <div className="flex items-center gap-4 mb-8 text-[#D4AF37]">
        <Timer size={24} />
        <h2 className="text-xl font-black uppercase tracking-widest italic">Temporal Chronometer</h2>
      </div>
      
      <input 
        type="date" 
        onChange={(e) => setBirthDate(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white mb-6 outline-none focus:border-[#D4AF37]/50"
      />

      <button 
        onClick={calculateAge}
        className="w-full bg-[#D4AF37] text-black font-black py-4 rounded-2xl uppercase tracking-widest hover:bg-white transition-all"
      >
        Execute Analysis
      </button>

      {age && (
        <div className="grid grid-cols-3 gap-4 mt-8">
          {[
            { label: 'Years', val: age.y },
            { label: 'Months', val: age.m },
            { label: 'Days', val: age.d }
          ].map(item => (
            <div key={item.label} className="bg-white/5 p-4 rounded-2xl text-center border border-white/5">
              <div className="text-3xl font-black font-mono text-white">{item.val.toLocaleString('en-US')}</div>
              <div className="text-[8px] uppercase tracking-widest text-gray-500 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
