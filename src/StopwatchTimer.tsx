import React, { useState, useEffect, useRef } from 'react';
import { Timer, StopCircle, Play, Pause, RotateCcw, BellRing, Hourglass } from 'lucide-react';

export const StopwatchTimer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'stopwatch' | 'timer'>('stopwatch');
  
  // Stopwatch Logic
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isStopwatchRunning, setIsStopwatchRunning] = useState(false);
  
  // Timer Logic
  const [timerInput, setTimerInput] = useState(0); // in seconds
  const [timerLeft, setTimerLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const stopwatchRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Stopwatch Effects ---
  useEffect(() => {
    if (isStopwatchRunning) {
      stopwatchRef.current = setInterval(() => {
        setStopwatchTime((prev) => prev + 10);
      }, 10);
    } else {
      if (stopwatchRef.current) clearInterval(stopwatchRef.current);
    }
    return () => { if (stopwatchRef.current) clearInterval(stopwatchRef.current); };
  }, [isStopwatchRunning]);

  // --- Timer Effects ---
  useEffect(() => {
    if (isTimerRunning && timerLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimerLeft((prev) => prev - 1);
      }, 1000);
    } else if (timerLeft === 0) {
      setIsTimerRunning(false);
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isTimerRunning, timerLeft]);

  const formatTime = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centiseconds = Math.floor((ms % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;
  };

  const formatTimer = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-10 animate-in fade-in zoom-in duration-700">
      {/* NAVIGATION TABS */}
      <div className="flex justify-center">
        <div className="bg-white/5 p-1 rounded-2xl border border-white/10 flex">
          <button 
            onClick={() => setActiveTab('stopwatch')}
            className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'stopwatch' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-white'}`}
          >
            Stopwatch
          </button>
          <button 
            onClick={() => setActiveTab('timer')}
            className={`px-8 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'timer' ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/20' : 'text-white/40 hover:text-white'}`}
          >
            Countdown
          </button>
        </div>
      </div>

      {/* DISPLAY MODULE */}
      <div className="relative group">
        <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[60px] rounded-full opacity-50 group-hover:opacity-100 transition-opacity"></div>
        <div className="relative bg-black/40 border-2 border-white/5 rounded-[4rem] p-16 text-center backdrop-blur-sm">
          {activeTab === 'stopwatch' ? (
            <>
              <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-4 flex items-center justify-center gap-2">
                <StopCircle size={14} /> Chrono Precision
              </div>
              <div className="text-8xl md:text-9xl font-black italic tabular-nums tracking-tighter text-white">
                {formatTime(stopwatchTime)}
              </div>
            </>
          ) : (
            <>
              <div className="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.5em] mb-4 flex items-center justify-center gap-2">
                <Hourglass size={14} /> Temporal Decryption
              </div>
              <div className="text-8xl md:text-9xl font-black italic tabular-nums tracking-tighter text-white">
                {formatTimer(timerLeft)}
              </div>
            </>
          )}
        </div>
      </div>

      {/* CONTROLS */}
      <div className="flex flex-col items-center gap-8">
        {activeTab === 'stopwatch' ? (
          <div className="flex gap-4">
            <button 
              onClick={() => setIsStopwatchRunning(!isStopwatchRunning)}
              className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${isStopwatchRunning ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-[#D4AF37] text-black shadow-xl shadow-[#D4AF37]/20'}`}
            >
              {isStopwatchRunning ? <Pause size={32} /> : <Play size={32} fill="currentColor" />}
            </button>
            <button 
              onClick={() => {setStopwatchTime(0); setIsStopwatchRunning(false);}}
              className="w-20 h-20 rounded-full bg-white/5 text-white border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all"
            >
              <RotateCcw size={32} />
            </button>
          </div>
        ) : (
          <div className="w-full max-w-md space-y-8">
            <div className="flex gap-4">
               <input 
                type="number" 
                placeholder="Set Seconds"
                className="flex-grow bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D4AF37]/50"
                onChange={(e) => {
                  const val = parseInt(e.target.value) || 0;
                  setTimerLeft(val);
                }}
               />
               <button 
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className={`px-8 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all ${isTimerRunning ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' : 'bg-[#D4AF37] text-black shadow-xl shadow-[#D4AF37]/20'}`}
               >
                {isTimerRunning ? 'Pause' : 'Initialize'}
               </button>
            </div>
            {timerLeft === 0 && !isTimerRunning && (
              <div className="flex items-center gap-3 justify-center text-[#D4AF37] animate-pulse">
                <BellRing size={16} />
                <span className="text-[9px] font-black uppercase tracking-widest">Temporal Cycle Complete</span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* METADATA */}
      <div className="flex justify-center gap-12 opacity-20 py-4 border-t border-white/5">
        <div className="text-[8px] font-black uppercase tracking-widest italic">Node: High-Frequency Clock</div>
        <div className="text-[8px] font-black uppercase tracking-widest italic">Sync: Universal Meridian</div>
      </div>
    </div>
  );
};
