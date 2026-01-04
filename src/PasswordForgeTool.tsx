import React, { useState, useEffect } from 'react';
import { ShieldCheck, RefreshCw, Copy, Check } from 'lucide-react';

export const PasswordForgeTool: React.FC = () => {
  const [pwd, setPwd] = useState('');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const charset = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%^&*()";
    let result = "";
    for (let i = 0; i < 16; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setPwd(result);
    setCopied(false);
  };

  useEffect(generate, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(pwd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-xs mx-auto space-y-6 bg-black/40 p-6 rounded-[2rem] border border-[#D4AF37]/20 text-center">
      <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-2">
        <ShieldCheck size={24} />
        <span className="text-[10px] font-black uppercase tracking-[0.2em]">Security Protocol</span>
      </div>
      
      <div className="relative group">
        <div className="bg-black p-5 rounded-2xl border border-white/5 break-all font-mono text-[#D4AF37] text-sm min-h-[60px] flex items-center justify-center">
          {pwd}
        </div>
        <button 
          onClick={copyToClipboard}
          className="absolute top-2 right-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors text-white/40 hover:text-[#D4AF37]"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
        </button>
      </div>

      <button 
        onClick={generate} 
        className="w-full bg-[#D4AF37] text-black font-black p-4 rounded-xl uppercase text-[10px] tracking-widest flex items-center justify-center gap-2 hover:bg-[#b8952e] transition-colors"
      >
        <RefreshCw size={14} /> Forge New Cipher
      </button>
    </div>
  );
};
