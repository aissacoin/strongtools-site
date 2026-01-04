import React, { useState } from 'react';
import { History, Search, Binary } from 'lucide-react';

export const BirthWatchTool: React.FC = () => {
  const [year, setYear] = useState('');
  const [fact, setFact] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchFact = async () => {
    if (!year || year.length < 4) return;
    setLoading(true);
    try {
      const res = await fetch(`https://numbersapi.com/${year}/year`);
      const text = await res.text();
      setFact(text);
    } catch {
      setFact("Data synchronization failed for this specific temporal coordinate.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xs mx-auto space-y-4 bg-black/40 p-6 rounded-[2rem] border border-[#D4AF37]/20">
      <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
        <Binary size={18} /> 
        <span className="text-[10px] font-black uppercase tracking-widest">Temporal Archive</span>
      </div>
      
      <div className="relative">
        <input 
          type="number" 
          placeholder="Enter Year (e.g. 1995)" 
          value={year} 
          onChange={(e) => setYear(e.target.value)} 
          className="w-full bg-black border border-white/10 rounded-xl p-4 text-[#D4AF37] font-bold tabular-nums focus:border-[#D4AF37] outline-none transition-all" 
        />
      </div>

      <button 
        onClick={fetchFact} 
        disabled={loading}
        className="w-full bg-[#D4AF37] text-black font-black p-4 rounded-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2"
      >
        {loading ? "Searching..." : "Decrypt Era History"}
      </button>

      {fact && (
        <div className="p-5 bg-white/5 rounded-2xl border border-white/5 mt-4 animate-in fade-in slide-in-from-bottom-2">
          <p className="text-[11px] text-white/70 leading-relaxed italic font-serif">
            <History size={12} className="inline mr-2 text-[#D4AF37]" />
            "{fact}"
          </p>
        </div>
      )}
    </div>
  );
};
