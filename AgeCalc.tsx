import React, { useState, useEffect } from 'react';
import { UserCheck } from 'lucide-react';

export const AgeCalc: React.FC = () => {
  const [birthDate, setBirthDate] = useState<string>(() => {
    const d = new Date();
    d.setFullYear(d.getFullYear() - 25);
    return d.toISOString().split('T')[0];
  });
  
  // Storage for age as strings to ensure formatting
  const [age, setAge] = useState<{y: string, m: string, d: string} | null>(null);

  useEffect(() => {
    if (!birthDate) return;
    const birth = new Date(birthDate);
    const now = new Date();
    
    if (birth > now) {
      setAge({y: "0", m: "0", d: "0"});
      return;
    }

    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      days += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Force English numbers (en-US) regardless of browser locale
    setAge({
      y: years.toLocaleString('en-US'),
      m: months.toLocaleString('en-US'),
      d: days.toLocaleString('en-US')
    });
  }, [birthDate]);

  return (
    <div className="max-w-xs mx-auto space-y-4 bg-[#141414] p-6 rounded-[2rem] border border-[#D4AF37]/20 shadow-xl">
      <div className="flex items-center gap-2 mb-2 text-[#D4AF37]">
        <UserCheck size={18} /> 
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Chronos Baseline</span>
      </div>

      {/* Input forced to use Western number formatting via CSS in index.html */}
      <input 
        type="date" 
        value={birthDate}
        max={new Date().toISOString().split('T')[0]}
        onChange={(e) => setBirthDate(e.target.value)}
        className="w-full bg-black border border-white/10 rounded-xl p-4 text-[#D4AF37] outline-none focus:border-[#D4AF37] font-bold text-sm uppercase tracking-tighter"
        style={{ colorScheme: 'dark' }}
      />

      <div className="grid grid-cols-3 gap-2 mt-2">
        {/* Years Card */}
        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
          <div className="text-3xl font-black text-white leading-none tabular-nums">
            {age?.y || "0"}
          </div>
          <div className="text-[8px] uppercase text-white/30 font-black mt-2 tracking-widest">Years</div>
        </div>

        {/* Months Card */}
        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
          <div className="text-3xl font-black text-white leading-none tabular-nums">
            {age?.m || "0"}
          </div>
          <div className="text-[8px] uppercase text-white/30 font-black mt-2 tracking-widest">Months</div>
        </div>

        {/* Days Card */}
        <div className="bg-white/5 p-4 rounded-xl text-center border border-white/5">
          <div className="text-3xl font-black text-white leading-none tabular-nums">
            {age?.d || "0"}
          </div>
          <div className="text-[8px] uppercase text-white/30 font-black mt-2 tracking-widest">Days</div>
        </div>
      </div>

      <div className="pt-4 border-t border-white/5">
        <p className="text-[7px] text-white/20 uppercase font-black text-center tracking-[0.3em]">
          Verified Utility Meridian
        </p>
      </div>
    </div>
  );
};
