import React, { useState } from 'react';
import { Type, Hash, AlignLeft, Zap, FileText } from 'lucide-react';

export const WordCounter: React.FC = () => {
  const [text, setText] = useState('');

  // Calculations with English-only number formatting
  const words = (text.trim() ? text.trim().split(/\s+/).length : 0).toLocaleString('en-US');
  const chars = text.length.toLocaleString('en-US');
  const sentences = (text.split(/[.!?]+/).filter(Boolean).length).toLocaleString('en-US');

  return (
    <div className="max-w-2xl mx-auto p-10 rounded-[3rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
      
      {/* Module Header */}
      <div className="flex items-center gap-5 mb-10 text-[#D4AF37]">
        <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
          <FileText size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest italic leading-none">Manuscript Analyzer</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mt-1">Linguistic Metrics Protocol</p>
        </div>
      </div>

      {/* Input Field */}
      <div className="relative mb-10 group">
        <textarea 
          value={text} 
          onChange={(e) => setText(e.target.value)} 
          placeholder="Enter or paste text for archival analysis..."
          className="w-full h-64 bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-8 text-white text-lg font-medium outline-none focus:border-[#D4AF37]/40 transition-all resize-none placeholder:text-white/10"
        />
        <div className="absolute bottom-6 right-8 opacity-20 group-hover:opacity-100 transition-opacity">
          <Type size={20} className="text-[#D4AF37]" />
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center group hover:border-[#D4AF37]/30 transition-all duration-500">
          <Hash size={18} className="mx-auto mb-3 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
          <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
            {words}
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mt-2">Word Count</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center group hover:border-[#D4AF37]/30 transition-all duration-500">
          <AlignLeft size={18} className="mx-auto mb-3 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
          <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
            {chars}
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mt-2">Characters</div>
        </div>

        <div className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 text-center group hover:border-[#D4AF37]/30 transition-all duration-500">
          <Zap size={18} className="mx-auto mb-3 text-gray-600 group-hover:text-[#D4AF37] transition-colors" />
          <div className="text-3xl font-black text-white tabular-nums tracking-tighter">
            {sentences}
          </div>
          <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 mt-2">Sentences</div>
        </div>
      </div>

      {/* Security/Protocol Tag */}
      <div className="mt-10 flex items-center justify-center gap-3 opacity-20 italic">
        <span className="h-px w-8 bg-white/20"></span>
        <span className="text-[8px] font-black uppercase tracking-[0.5em]">Local Processing Active</span>
        <span className="h-px w-8 bg-white/20"></span>
      </div>
    </div>
  );
};
