import React, { useState, useEffect } from 'react';
import { CloudSun, Wind, Droplets, Thermometer, MapPin, Navigation } from 'lucide-react';

export const WeatherLive: React.FC = () => {
  const [weather, setWeather] = useState<any>(null);
  const [city, setCity] = useState('London');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async (cityName: string) => {
    setLoading(true);
    setError(null);
    try {
      // 1. Get Coordinates for the city
      const geoRes = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
      const geoData = await geoRes.json();
      
      if (!geoData.results) throw new Error("Location not found in registry.");
      
      const { latitude, longitude, name, country } = geoData.results[0];

      // 2. Get Weather Data
      const weatherRes = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&relative_humidity_2m=true`);
      const weatherData = await weatherRes.json();

      setWeather({
        temp: weatherData.current_weather.temperature,
        wind: weatherData.current_weather.windspeed,
        humidity: weatherData.current_weather.relative_humidity_2m,
        condition: weatherData.current_weather.weathercode,
        location: `${name}, ${country}`
      });
    } catch (err) {
      setError("Failed to synchronize with satellite data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather('London');
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-10 rounded-[3rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden font-sans">
      
      {/* Search Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4 text-[#D4AF37]">
          <div className="p-3 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
            <CloudSun size={24} />
          </div>
          <h2 className="text-xl font-black uppercase tracking-[0.2em] italic">Atmospheric Pulse</h2>
        </div>
        
        <div className="relative">
          <input 
            type="text" 
            placeholder="Enter City..."
            onKeyDown={(e) => e.key === 'Enter' && fetchWeather((e.target as HTMLInputElement).value)}
            className="bg-white/5 border border-white/10 rounded-xl px-5 py-3 outline-none focus:border-[#D4AF37]/50 text-sm font-bold w-full md:w-48 transition-all"
          />
          <Navigation size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500" />
        </div>
      </div>

      {loading ? (
        <div className="py-20 text-center animate-pulse">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Accessing Global Feed...</p>
        </div>
      ) : error ? (
        <div className="py-20 text-center text-rose-500 text-[10px] font-black uppercase tracking-widest">
          {error}
        </div>
      ) : weather && (
        <div className="animate-in fade-in zoom-in duration-700">
          {/* Main Temp Display */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
              <MapPin size={14} className="text-[#D4AF37]" />
              <span className="text-[10px] font-black uppercase tracking-widest">{weather.location}</span>
            </div>
            <h3 className="text-8xl font-black font-mono text-white tracking-tighter">
              {weather.temp.toLocaleString('en-US')}°
            </h3>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-3">
              <Wind size={20} className="text-[#D4AF37]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Wind Velocity</span>
              <span className="text-2xl font-black font-mono">{weather.wind.toLocaleString('en-US')} <small className="text-[10px]">KM/H</small></span>
            </div>
            <div className="p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 flex flex-col items-center gap-3">
              <Droplets size={20} className="text-[#D4AF37]" />
              <span className="text-[9px] font-black uppercase tracking-widest text-gray-600">Humidity Index</span>
              <span className="text-2xl font-black font-mono">{weather.humidity.toLocaleString('en-US')}%</span>
            </div>
          </div>
        </div>
      )}

      {/* Footer Info */}
      <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between opacity-20">
        <span className="text-[8px] font-black uppercase tracking-widest italic">Source: Open-Meteo Satellite</span>
        <Thermometer size={14} />
      </div>
    </div>
  );
};
