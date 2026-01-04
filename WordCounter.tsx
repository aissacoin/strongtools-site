import React, { useState } from 'react';
import { Type } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;

  return (
    <div className="max-w-xs mx-auto space-y-4 bg-black/40 p-6 rounded-[2rem] border border-[#D4AF37]/20">
      <div className="flex items-center gap-2 text-[#D4AF37] mb-2">
        <Type size={18} /> <span className="text-[10px] font-black uppercase tracking-widest">Scribe Counter</span>
      </div>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type or paste text here..."
        className="w-full h-32 bg-black border border-white/10 rounded-xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]"
      />
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 p-3 rounded-xl text-center">
          <div className="text-xl font-black text-[#D4AF37] tabular-nums">{words.toLocaleString('en-US')}</div>
          <div className="text-[8px] uppercase opacity-40">Words</div>
        </div>
        <div className="bg-white/5 p-3 rounded-xl text-center">
          <div className="text-xl font-black text-[#D4AF37] tabular-nums">{chars.toLocaleString('en-US')}</div>
          <div className="text-[8px] uppercase opacity-40">Characters</div>
        </div>
      </div>
    </div>
  );
};
