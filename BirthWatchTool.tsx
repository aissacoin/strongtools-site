import React, { useState } from 'react';
import { History, Sparkles, Loader2, Music, Film, Trophy } from 'lucide-react';
// Correct Library and Types
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
      // 1. Correct Environment Variable for Vite
      const apiKey = import.meta.env.VITE_API_KEY || "";
      if (!apiKey) throw new Error("API Key is missing");

      // 2. Initialize correct Class
      const genAI = new GoogleGenerativeAI(apiKey);
      
      // 3. Use stable model name
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
      });

      const prompt = `What were the cultural highlights of the year ${year}? Return the data strictly in JSON format.`;

      const result = await model.generateContent({
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.7,
        }
      });

      const response = await result.response;
      let text = response.text();
      
      // Cleanup JSON if needed
      text = text.replace(/```json|```/g, "").trim();
      const finalResult = JSON.parse(text);

      setData(finalResult);
    } catch (err) {
      setError("Archive node failed to retrieve data for this temporal coordinate.");
      console.error(err);
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
            className="flex-grow bg-black border border-[#D4AF37]/20 rounded-2xl p-4 text-[#D4AF37] text-xl font-black outline-none focus:border-[#D4AF37] transition-all"
            placeholder="Year..."
          />
          <button 
            onClick={fetchHistory}
            disabled={loading}
            className="px-6 bg-[#D4AF37] text-black rounded-2xl font-black hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#D4AF37]/10"
          >
            {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
          </button>
        </div>

        {error && <p className="text-rose-40
