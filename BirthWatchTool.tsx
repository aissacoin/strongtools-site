import React, { useState } from 'react';
import { History, Sparkles, Loader2, Music, Film, Trophy } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export const BirthWatchTool: React.FC = () => {
  const [year, setYear] = useState<string>(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = async () => {
    if (!year || parseInt(year) < 1900) {
      setError("Please provide a valid historical year (1900+).");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiKey = import.meta.env.VITE_API_KEY || "";
      if (!apiKey) throw new Error("API Key missing");

      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Provide cultural highlights for the year ${year} in JSON format with keys: music, cinema, majorEvent. Max 15 words per value.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text().replace(/```json|```/g, "").trim();
      
      const parsedData = JSON.parse(text);
      setData(parsedData);
    } catch (err) {
      console.error(err);
      setError("Temporal node synchronization failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#141414] border border-[#D4AF37]/30 rounded-[2.5rem] p-6 sm:p-8 max-w-xl mx-auto shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <History className="text-[#D4AF37]" size={28} />
        <h2 className="text-xl font-black text-white uppercase italic tracking-tight">Temporal Registry</h2>
      </div>

      <div className="space-y-6">
        <div className="flex gap-2">
          <input 
            type="number" 
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="flex-grow bg-black border border-[#D4AF37]/20 rounded-2xl p-4 text-[#D4AF37] text-xl font-black outline-none focus:border-[#D4AF37]"
            placeholder="Year..."
          />
          <button 
            onClick={fetchHistory}
            disabled={loading}
            className="px-6 bg-[#D4AF37] text-black rounded-2xl font-black hover:scale-105 transition-transform disabled:opacity-50"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          </button>
        </div>

        {error && <p className="text-rose-400 text-xs italic px-2">{error}</p>}

        {data && !loading && (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4">
            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
              <Music className="text-[#D4AF37] shrink-0" size={20} />
              <div>
                <p className="text-[8px] font-black uppercase text-[#D4AF37]/40 tracking-widest">Audio Archive</p>
                <p className="text-sm text-white/90 italic">{data.music}</p>
              </div>
            </div>
            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
              <Film className="text-[#D4AF37] shrink-0" size={20} />
              <div>
                <p className="text-[8px] font-black uppercase text-[#D4AF37]/40 tracking-widest">Visual Archive</p>
                <p className="text-sm text-white/90 italic">{data.cinema}</p>
              </div>
            </div>
            <div className="p-4 bg-black/40 border border-white/5 rounded-2xl flex items-center gap-4">
              <Trophy className="text-[#D4AF37] shrink-0" size={20} />
              <div>
                <p className="text-[8px] font-black uppercase text-[#D4AF37]/40 tracking-widest">Global Record</p>
                <p className="text-sm text-white/90 italic">{data.majorEvent}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
