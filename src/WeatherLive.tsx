import React, { useState, useEffect } from 'react';
import { CloudSun, MapPin, Wind, Droplets, Loader2 } from 'lucide-react';

export const WeatherLive: React.FC = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    // جلب بيانات الطقس بناءً على الموقع الجغرافي للـ IP
    fetch('https://wttr.in/?format=j1')
      .then(res => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then(json => {
        const current = json.current_condition[0];
        const area = json.nearest_area[0];
        setData({
          temp: current.temp_C,
          desc: current.weatherDesc[0].value,
          humidity: current.humidity,
          wind: current.windspeedKmph,
          city: area.areaName[0].value,
          country: area.country[0].value
        });
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-10 space-y-4">
      <Loader2 className="animate-spin text-[#D4AF37]" size={32} />
      <p className="text-[10px] uppercase font-black tracking-[0.3em] text-white/40">Synchronizing with Satellite...</p>
    </div>
  );

  if (error) return <div className="text-center text-red-400 text-[10px] uppercase font-black">Signal Lost: Unable to reach weather node.</div>;

  return (
    <div className="max-w-xs mx-auto bg-black/40 p-8 rounded-[2.5rem] border border-[#D4AF37]/20 backdrop-blur-md shadow-2xl">
      <div className="flex justify-between items-start mb-8">
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-[#D4AF37] opacity-80">
            <MapPin size={12} />
            <span className="text-[10px] font-black uppercase tracking-widest">
              {data?.city}, {data?.country}
            </span>
          </div>
          <h3 className="text-5xl font-black text-white tabular-nums tracking-tighter italic">
            {Number(data?.temp).toLocaleString('en-US')}°
          </h3>
          <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{data?.desc}</p>
        </div>
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20">
          <CloudSun size={32} className="text-[#D4AF37]" />
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 pt-6 border-t border-white/5">
        <div className="space-y-1 text-center border-r border-white/5">
          <Wind size={16} className="mx-auto mb-2 text-[#D4AF37] opacity-60" />
          <div className="text-sm font-black text-white tabular-nums">
            {Number(data?.wind).toLocaleString('en-US')} <span className="text-[8px] opacity-40">km/h</span>
          </div>
          <div className="text-[7px] uppercase font-black text-white/20 tracking-widest">Wind Velocity</div>
        </div>
        <div className="space-y-1 text-center">
          <Droplets size={16} className="mx-auto mb-2 text-[#D4AF37] opacity-60" />
          <div className="text-sm font-black text-white tabular-nums">
            {Number(data?.humidity).toLocaleString('en-US')}<span className="text-[8px] opacity-40">%</span>
          </div>
          <div className="text-[7px] uppercase font-black text-white/20 tracking-widest">Humidity Level</div>
        </div>
      </div>
    </div>
  );
};
