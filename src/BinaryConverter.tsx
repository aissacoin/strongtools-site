import React, { useState } from 'react';
import { Binary, ArrowRightLeft, Copy, Trash2, CheckCircle2 } from 'lucide-react';

export const BinaryConverter: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isBinaryToText, setIsBinaryToText] = useState(false);
  const [copied, setCopied] = useState(false);

  const textToBinary = (text: string) => {
    return text
      .split('')
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
      .join(' ');
  };

  const binaryToText = (bin: string) => {
    try {
      return bin
        .split(' ')
        .map((b) => String.fromCharCode(parseInt(b, 2)))
        .join('');
    } catch (e) {
      return "Invalid Binary Sequence";
    }
  };

  const handleConvert = (value: string) => {
    setInput(value);
    if (isBinaryToText) {
      setOutput(binaryToText(value));
    } else {
      setOutput(textToBinary(value));
    }
  };

  const toggleMode = () => {
    setIsBinaryToText(!isBinaryToText);
    setInput(output);
    setOutput(input);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header & Toggle */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-xl border border-[#D4AF37]/20">
            <Binary className="text-[#D4AF37]" size={24} />
          </div>
          <div>
            <h4 className="text-xl font-black uppercase italic tracking-tighter">Encoding Engine</h4>
            <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Text ↔ Binary Logic</p>
          </div>
        </div>

        <button 
          onClick={toggleMode}
          className="flex items-center gap-3 px-6 py-3 bg-white/[0.03] border border-white/10 rounded-2xl hover:border-[#D4AF37]/50 transition-all group"
        >
          <span className={`text-[10px] font-black uppercase tracking-widest ${!isBinaryToText ? 'text-[#D4AF37]' : 'text-white/40'}`}>Text</span>
          <ArrowRightLeft size={16} className="text-[#D4AF37] group-hover:rotate-180 transition-transform duration-500" />
          <span className={`text-[10px] font-black uppercase tracking-widest ${isBinaryToText ? 'text-[#D4AF37]' : 'text-white/40'}`}>Binary</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Input Area */}
        <div className="space-y-3">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30 ml-4">Source Input</label>
          <textarea
            value={input}
            onChange={(e) => handleConvert(e.target.value)}
            placeholder={isBinaryToText ? "Enter binary (e.g., 01001000...)" : "Enter text here..."}
            className="w-full h-48 bg-black/40 border border-white/5 rounded-[2rem] p-6 text-white placeholder:text-white/10 focus:outline-none focus:border-[#D4AF37]/30 transition-colors resize-none font-mono text-sm"
          />
        </div>

        {/* Output Area */}
        <div className="space-y-3 relative">
          <label className="text-[9px] font-black uppercase tracking-[0.3em] text-[#D4AF37]/60 ml-4">Result Output</label>
          <div className="w-full h-48 bg-[#D4AF37]/5 border border-[#D4AF37]/10 rounded-[2rem] p-6 text-[#D4AF37] font-mono text-sm overflow-y-auto break-all">
            {output || <span className="opacity-20 italic">Awaiting translation...</span>}
          </div>
          
          {/* Actions */}
          <div className="absolute bottom-4 right-4 flex gap-2">
            <button 
              onClick={() => {setInput(''); setOutput('');}}
              className="p-3 bg-black/60 border border-white/10 rounded-xl hover:text-rose-400 transition-colors"
              title="Clear All"
            >
              <Trash2 size={16} />
            </button>
            <button 
              onClick={copyToClipboard}
              className="p-3 bg-black/60 border border-white/10 rounded-xl hover:text-[#D4AF37] transition-colors flex items-center gap-2"
              title="Copy Result"
            >
              {copied ? <CheckCircle2 size={16} className="text-green-400" /> : <Copy size={16} />}
            </button>
          </div>
        </div>
      </div>

      {/* Logic Metadata */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center gap-6">
        <div className="flex -space-x-2">
          {[0, 1, 0, 1].map((n, i) => (
            <div key={i} className="w-8 h-8 rounded-full bg-black border border-[#D4AF37]/20 flex items-center justify-center text-[10px] font-black text-[#D4AF37]">
              {n}
            </div>
          ))}
        </div>
        <p className="text-[10px] text-white/30 italic leading-relaxed">
          The engine utilizes <strong>UTF-8 character encoding</strong> mapped to <strong>8-bit binary sequences</strong> for maximum archival precision.
        </p>
      </div>
    </div>
  );
};
