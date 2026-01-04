import React, { useState, useEffect } from 'react';
import { Search, MapPin, Wind, Droplets, Thermometer, CloudRain, Sun, Cloud, Loader2, Globe } from 'lucide-react';

const API_KEY = '5d6c8b935d8d4778841121650242205'; // Current Active API Key

const STRATEGIC_HUBS = [
  'London', 'New York', 'Dubai', 'Tokyo', 'Paris', 
  'Riyadh', 'Singapore', 'Zurich', 'Sydney', 'Hong Kong'
];

export const WeatherLive: React.FC = () => {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [hubsData, setHubsData] = useState<any[]>([]);
  const [error, setError] = useState('');

  const fetchWeather = async (location: string, isHub = false) => {
    if (!isHub) setLoading(true);
    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}&aqi=no`
      );
      const data = await response.json();
      if (data.error) throw new Error("Location unauthorized");
      
      if (isHub) return data;
      setWeather(data);
    } catch (err) {
      if (!isHub) setError('Coordinate decryption failed.');
    } finally {
      if (!isHub) setLoading(false);
    }
  };

  useEffect(() => {
    const initializeOracle = async () => {
      // Fetch data for the first 5 hubs to display initially
      const hubPromises = STRATEGIC_HUBS.map(city => fetchWeather(city, true));
      const results = await Promise.all(hubPromises);
      setHubsData(results.filter(r => r));
      
      // Default view: Dubai
      fetchWeather('Dubai');
    };
    initializeOracle();
  }, []);

  const getVisualIcon = (condition: string) => {
    const c = condition.toLowerCase();
    if (c.includes('sun') || c.includes('clear')) return <Sun className="text-yellow-500" size={32} />;
    if (c.includes('rain')) return <CloudRain className="text-blue-500" size={32} />;
    return <Cloud className="text-gray-400" size={32} />;
  };

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      
      {/* SEARCH INTERFACE - COMMAND LINE STYLE */}
      <div className="relative max-w-2xl mx-auto">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37]/50 uppercase text-[10px] font-black tracking-widest hidden md:block">
          Input Location:
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && fetchWeather(query)}
          placeholder="SEARCH GLOBAL COORDINATES..."
          className="w-full bg-black/40 border-2 border-white/5 rounded-2xl py-7 px-10 md:pl-36 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D4AF37]/40 transition-all font-black uppercase text-xs tracking-[0.2em]"
        />
        <button 
          onClick={() => fetchWeather(query)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-[#D4AF37] text-black rounded-xl hover:scale-105 transition-transform shadow-xl shadow-[#D4AF37]/20"
        >
          <Search size={18} strokeWidth={3} />
        </button>
      </div>

      {/* PRIMARY DATA DISPLAY */}
      {loading ? (
        <div className="h-64 flex flex-col items-center justify-center space-y-4">
          <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#D4AF37] animate-pulse">Syncing Satellite Data</p>
        </div>
      ) : weather && (
        <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[3.5rem] p-12 overflow-hidden group shadow-2xl">
          <div className="absolute top-0 right-0 p-16 opacity-5 group-hover:opacity-10 transition-opacity">
            <Globe size={200} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-black/40 border border-[#D4AF37]/30">
                <MapPin className="text-[#D4AF37]" size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/80">
                  {weather.location.name} // {weather.location.country}
                </span>
              </div>
              
              <div className="flex items-baseline gap-4">
                <h2 className="text-9xl font-black italic tracking-tighter tabular-nums leading-none text-white">
                  {Math.round(weather.current.temp_c)}°
                </h2>
                <span className="text-3xl font-light text-white/20 uppercase tracking-tighter italic">Celsius</span>
              </div>

              <div className="flex items-center gap-6">
                {getVisualIcon(weather.current.condition.text)}
                <p className="text-2xl font-black uppercase italic tracking-widest text-[#D4AF37]">
                  {weather.current.condition.text}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Wind, label: 'Velocity', value: `${weather.current.wind_kph} KPH` },
                { icon: Droplets, label: 'Atmosphere', value: `${weather.current.humidity}% HUM` },
                { icon: Thermometer, label: 'Real Feel', value: `${weather.current.feelslike_c}°C` },
                { icon: Globe, label: 'Visibility', value: `${weather.current.vis_km} KM` }
              ].map((stat, i) => (
                <div key={i} className="bg-black/40 p-8 rounded-3xl border border-white/5 hover:border-white/10 transition-all">
                  <stat.icon className="text-[#D4AF37]/40 mb-4" size={20} />
                  <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-1">{stat.label}</p>
                  <p className="text-lg font-black italic tracking-tight">{stat.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* STRATEGIC HUB GRID (10 Cities Display) */}
      <section className="space-y-8">
        <div className="flex items-center gap-6">
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
          <h3 className="text-[10px] font-black uppercase tracking-[0.6em] text-white/30 italic">Global Strategic Hubs</h3>
          <div className="h-px flex-grow bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent"></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {hubsData.map((hub, idx) => (
            <div 
              key={idx}
              onClick={() => setWeather(hub)}
              className="bg-white/[0.02] border border-white/5 p-8 rounded-[2.5rem] hover:border-[#D4AF37]/40 hover:bg-[#D4AF37]/5 transition-all cursor-pointer group text-center"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-[#D4AF37] mb-4 transition-colors">
                {hub.location.name}
              </p>
              <div className="flex justify-center mb-6 transform group-hover:scale-110 transition-transform">
                {getVisualIcon(hub.current.condition.text)}
              </div>
              <p className="text-2xl font-black italic tabular-nums tracking-tighter">
                {Math.round(hub.current.temp_c)}°
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
