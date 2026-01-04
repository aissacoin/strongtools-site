import React from 'react';
import { TOOLS } from "./constants";
import * as LucideIcons from 'lucide-react';
import { Search, Sparkles, Zap, ShieldAlert } from 'lucide-react';

export const Tools: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredTools = TOOLS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#050505] selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto px-4 space-y-16">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[9px] font-black uppercase tracking-widest mb-2 border border-[#D4AF37]/20">
               <Zap size={10} fill="currentColor" /> Central Registry
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white italic uppercase">
              Global <span className="text-[#D4AF37]">Archive</span>
            </h1>
            <p className="text-white/30 font-bold text-sm flex items-center justify-center md:justify-start gap-2 uppercase tracking-[0.3em]">
              <Sparkles size={18} className="text-[#D4AF37]"/> {TOOLS.length} Verified Instruments Online
            </p>
          </div>

          {/* SEARCH MODULE */}
          <div className="relative w-full md:w-96 group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37]/20 to-transparent rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-500"></div>
            <div className="relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#D4AF37]" size={20} />
              <input 
                type="text" 
                placeholder="Search registry (e.g. 'Security')..." 
                className="w-full pl-16 pr-8 py-5 bg-black border border-white/10 rounded-2xl text-sm outline-none focus:border-[#D4AF37] transition-all text-white placeholder-white/20 font-bold uppercase tracking-widest"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* TOOLS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map(tool => {
            const IconComponent = (LucideIcons as any)[tool.icon] || Zap;
            
            return (
              <div key={tool.id} className="group relative">
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-[#D4AF37]/5 rounded-[3rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <a 
                  href={`#/tool/${tool.id}`}
                  className="relative w-full text-left h-full bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-[#D4AF37]/30 p-10 rounded-[3rem] flex flex-col items-center text-center space-y-8 transition-all duration-500 block backdrop-blur-sm"
                >
                  <div className="w-20 h-20 rounded-2xl flex items-center justify-center bg-black text-[#D4AF37] shadow-2xl border border-white/5 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                    <IconComponent size={32} strokeWidth={1.5} />
                  </div>

                  <div className="space-y-4">
                    <div className="px-3 py-1 bg-white/5 rounded-full inline-block">
                       <span className="text-[8px] font-black uppercase tracking-[0.3em] text-[#D4AF37]">{tool.category}</span>
                    </div>
                    <h4 className="text-2xl font-black text-white italic uppercase tracking-tighter group-hover:text-[#D4AF37] transition-colors">
                      {tool.name}
                    </h4>
                    <p className="text-white/30 text-[11px] font-medium leading-relaxed line-clamp-2 uppercase tracking-wide">
                      {tool.description}
                    </p>
                  </div>

                  <div className="pt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest border-b border-[#D4AF37]">Launch Module</div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {/* EMPTY STATE */}
        {filteredTools.length === 0 && (
          <div className="text-center py-32 bg-white/[0.01] rounded-[4rem] border border-dashed border-white/10 animate-pulse">
            <ShieldAlert size={48} className="mx-auto text-white/10 mb-6" />
            <p className="text-xl font-black text-white/20 italic uppercase tracking-[0.2em]">
              No instruments found in the current archive sector.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
