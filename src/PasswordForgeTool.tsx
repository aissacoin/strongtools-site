import React, { useState, useEffect } from 'react';
import { Lock, ShieldCheck, Copy, RefreshCw, Zap } from 'lucide-react';

export const PasswordForgeTool: React.FC = () => {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(16);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [copied, setCopied] = useState(false);

  const generatePassword = () => {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ" + 
      (includeNumbers ? "0123456789" : "") + 
      (includeSymbols ? "!@#$%^&*()_+~`|}{[]:;?><,./-=" : "");
    
    let retVal = "";
    for (let i = 0, n = charset.length; i < length; ++i) {
      retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    setPassword(retVal);
    setCopied(false);
  };

  useEffect(() => {
    generatePassword();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-2xl mx-auto p-12 rounded-[3rem] bg-[#0a0a0a] border border-[#D4AF37]/20 shadow-2xl relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/5 blur-[100px] -z-10"></div>

      {/* Header */}
      <div className="flex items-center gap-5 mb-12 text-[#D4AF37]">
        <div className="p-4 rounded-2xl bg-[#D4AF37]/10 border border-[#D4AF37]/20">
          <Lock size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black uppercase tracking-widest italic leading-none">Password Forge</h2>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-500 mt-1">Cryptographic String Generation</p>
        </div>
      </div>

      {/* Result Display */}
      <div className="relative mb-10 group">
        <div className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-6 text-xl font-mono text-white break-all pr-20 min-h-[80px] flex items-center">
          {password}
        </div>
        <button 
          onClick={copyToClipboard}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-[#D4AF37] text-black rounded-xl hover:bg-white transition-all shadow-lg"
        >
          {copied ? <ShieldCheck size={20} /> : <Copy size={20} />}
        </button>
      </div>

      {/* Configuration */}
      <div className="space-y-8 mb-10">
        <div className="space-y-4">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#D4AF37]">Complexity Level: {length.toLocaleString('en-US')}</label>
          </div>
          <input 
            type="range" min="8" max="32" 
            value={length}
            onChange={(e) => setLength(parseInt(e.target.value))}
            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => setIncludeNumbers(!includeNumbers)}
            className={`py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${includeNumbers ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-transparent border-white/10 text-gray-500'}`}
          >
            Numbers (0-9)
          </button>
          <button 
            onClick={() => setIncludeSymbols(!includeSymbols)}
            className={`py-4 rounded-2xl border transition-all text-[10px] font-black uppercase tracking-widest ${includeSymbols ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-transparent border-white/10 text-gray-500'}`}
          >
            Special Symbols
          </button>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={generatePassword}
        className="w-full bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-black font-black py-6 rounded-2xl uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3"
      >
        Forge New Key <RefreshCw size={18} />
      </button>

      {/* Security Status */}
      <div className="mt-8 flex items-center justify-center gap-2 text-gray-600">
        <Zap size={12} className="text-[#D4AF37]" />
        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Client-Side Generation • No Data Stored</span>
      </div>
    </div>
  );
};
