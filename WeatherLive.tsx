import React, { useState } from 'react';
import { 
  Sun, Cloud, CloudRain, CloudLightning, Snowflake, 
  Wind, Droplets, Search, Sparkles, MapPin, 
  Loader2
} from 'lucide-react';
// Correct Library and Types
import { GoogleGenerativeAI } from "@google/generative-ai";

export const WeatherLive: React.FC = () => {
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weather, setWeather] = useState<any>(null);

  const fetchWeather = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!city.trim()) return;

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

      const prompt = `Atmospheric status for: ${city}. Return CURRENT weather data in JSON format. 
      Include: temp (Celsius number), condition (string), humidity (string), wind (string), tip (prestigious health tip string).`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let text = response.text();
      
      // Cleanup JSON if AI adds markdown backticks
      text = text.replace(/```json|```/g, "").trim();
      const data = JSON.parse(text);

      setWeather({
        temp: data.temp,
        condition: data.condition,
        humidity: data.humidity,
        wind: data.wind,
        tip: data.tip,
        city: city
      });
    } catch (err) {
      setError("Celestial synchronization failed. Check coordinates.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('rain')) return <CloudRain className="text-[#D4AF37]" size={64} />;
    if (c.includes('storm')) return <CloudLightning className="text-[#D4AF37]" size={64} />;
    if (c.includes('snow')) return <Snowflake className="text-[#D4AF37]" size={64} />;
    if (c.includes('cloud')) return <Cloud className="text-[#D4AF37]" size={64} />;
    return <Sun className="text-[#D4AF37] animate-pulse" size={64} />;
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-10 max-w-2xl mx-auto shadow-[0_0_80px_rgba(212,175,55,0.1)] relative overflow-hidden group">
      <div className="relative z-10 space-y-10">
        <div className="flex items-center gap-4">
          <Sparkles className="text-[#D4AF37]" size={24} />
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Weather Oracle</h2>
        </div>

        <form onSubmit={fetchWeather} className="flex gap-3">
          <div className="relative flex-grow">
            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#D4AF37]/40" size={20} />
            <input 
              type="text" 
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter Coordinate/City..."
              className="w-full bg-black border border-[#D4AF37]/20 rounded-2xl py-5 pl-14 pr-6 text-white outline-none focus:border-[#D4AF37] transition-all"
            />
          </div>
          <button type="submit" disabled={loading} className="px-8 bg-[#D4AF37] text-black rounded-2xl font-black transition-transform active:scale-95">
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </form>

        {error && (
          <div className="text-rose-400 font-bold p-4 bg-rose-500/5 rounded-xl border border-rose-500/20 animate-bounce">
            {error}
          </div>
        )}

        {weather && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8">
            <div className="flex justify-between items-center p-8 bg-white/5 rounded-[2.5rem] border border-white/5">
               <div>
                 <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-2">{weather.city}</p>
                 <div className="text-7xl font-black text-white">{weather.temp}°C</div>
                 <p className="text-xl font-bold uppercase italic text-white/60">{weather.condition}</p>
               </div>
               {getWeatherIcon(weather.condition)}
            </div>
            <div className="grid grid-cols-2 gap-4">
               <div className="p-6 bg-black border border-white/5 rounded-3xl">
                  <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1 flex items-center gap-2">
                    <Droplets size={10} /> Humidity
                  </p>
                  <p className="text-xl font-black text-white">{weather.humidity}</p>
               </div>
               <div className="p-6 bg-black border border-white/5 rounded-3xl">
                  <p className="text-[9px] font-black uppercase text-gray-500 tracking-widest mb-1 flex items-center gap-2">
                    <Wind size={10} /> Wind Speed
                  </p>
                  <p className="text-xl font-black text-white">{weather.wind}</p>
               </div>
            </div>
            <div className="p-8 bg-[#D4AF37]/5 border border-[#D4AF37]/30 rounded-[2rem] text-lg italic text-white/90">
               "{weather.tip}"
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
