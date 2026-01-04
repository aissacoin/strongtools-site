import React, { useState, useEffect, useRef } from 'react';
import { Timer, StopCircle, Play, Pause, RotateCcw, Hourglass } from 'lucide-react';

export const StopwatchTimer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stopwatch' | 'timer'>('stopwatch');
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  const [timerLeft, setTimerLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timerInput, setTimerInput] = useState("");

  const swRef = useRef<NodeJS.Timeout | null>(null);
  const tmRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isStopwatchRunning) {
      swRef.current = setInterval(() => setStopwatchTime(p => p + 10), 10);
    } else if (swRef.current) clearInterval(swRef.current);
    return () => { if (swRef.current) clearInterval(swRef.current); };
  }, [isStopwatchRunning]);

  useEffect(() => {
    if (isTimerRunning && timerLeft > 0) {
      tmRef.current = setInterval(() => setTimerLeft(p => p - 1), 1000);
    } else {
      setIsTimerRunning(false);
      if (tmRef.current) clearInterval(tmRef.current);
    }
    return () => { if (tmRef.current) clearInterval(tmRef.current); };
  }, [isTimerRunning, timerLeft]);

  const formatMS = (ms: number) => {
    const m = Math.floor(ms / 60000);
    const s = Math.floor((ms % 60000) / 1000);
    const cs = Math.floor((ms % 1000) / 10);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${cs.toString().padStart(2, '0')}`;
  };

  const formatSec = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-center gap-2 bg-white/5 p-1 rounded-2xl w-fit mx-auto border border-white/10">
        {['stopwatch', 'timer'].map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab as any)} className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-[#D4AF37] text-black' : 'text-white/40'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-black/40 border-2 border-[#D4AF37]/10 rounded-[3rem] p-12 text-center relative overflow-hidden">
        <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-4 flex items-center justify-center gap-2 opacity-50">
          {activeTab === 'stopwatch' ? <StopCircle size={14} /> : <Hourglass size={14} />} 
          Chronometer Protocol
        </div>
        <div className="text-7xl md:text-8xl font-black italic tracking-tighter text-white tabular-nums">
          {activeTab === 'stopwatch' ? formatMS(stopwatchTime) : formatSec(timerLeft)}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6">
        {activeTab === 'timer' && !isTimerRunning && (
          <input 
            type="number" 
            placeholder="ENTER SECONDS" 
            className="bg-transparent border-b border-[#D4AF37]/30 text-center text-xl font-black text-[#D4AF37] focus:outline-none w-40"
            onChange={(e) => setTimerLeft(parseInt(e.target.value) || 0)}
          />
        )}
        <div className="flex gap-4">
          <button 
            onClick={() => activeTab === 'stopwatch' ? setIsStopwatchRunning(!isStopwatchRunning) : setIsTimerRunning(!isTimerRunning)}
            className="w-16 h-16 rounded-full bg-[#D4AF37] text-black flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isStopwatchRunning || isTimerRunning ? <Pause /> : <Play fill="currentColor" />}
          </button>
          <button 
            onClick={() => { setStopwatchTime(0); setTimerLeft(0); setIsStopwatchRunning(false); setIsTimerRunning(false); }}
            className="w-16 h-16 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10"
          >
            <RotateCcw />
          </button>
        </div>
      </div>
    </div>
  );
};
