import React from 'react';
import { X, Sparkles, Loader2, ShieldCheck, ScrollText, AlertTriangle, History, Bookmark } from 'lucide-react';
import { getAutomatedArchive, ArchivalRecord } from "./geminiService";

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  toolId?: string;
  children: React.ReactNode;
}

export const ToolModal: React.FC<ToolModalProps> = ({ isOpen, onClose, title, toolId, children }) => {
  const [archive, setArchive] = React.useState<ArchivalRecord | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(false);

  const syncArchive = React.useCallback(async () => {
    if (!toolId) return;
    setLoading(true);
    setError(false);
    try {
      const data = await getAutomatedArchive(toolId);
      if (data) {
        setArchive(data);
      } else {
        throw new Error("Registry empty");
      }
    } catch (e) {
      console.error("Registry Sync Failure:", e);
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [toolId]);

  React.useEffect(() => {
    if (isOpen && toolId) {
      syncArchive();
    }
    // Reset archive when closing to prevent data flicker
    if (!isOpen) {
      setArchive(null);
    }
  }, [isOpen, toolId, syncArchive]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl">
      <div className="bg-[#0a0a0a] border-2 border-[#D4AF37]/20 rounded-[4rem] w-full max-w-5xl shadow-[0_0_150px_rgba(0,0,0,1)] overflow-hidden animate-in fade-in zoom-in duration-500 flex flex-col max-h-[94vh]">
        
        {/* INSTITUTIONAL HEADER */}
        <div className="px-12 py-10 border-b border-white/5 flex justify-between items-center bg-black/40">
          <div className="flex items-center gap-6">
             <div className="w-14 h-14 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/20 shadow-[0_0_20px_rgba(212,175,55,0.1)]">
               <Sparkles size={28} strokeWidth={1.5} />
             </div>
             <div>
               <h3 className="text-3xl font-black text-white tracking-tighter leading-none uppercase italic">{title}</h3>
               <div className="flex items-center gap-3 mt-2 text-[#D4AF37]/50">
                 <ShieldCheck size={14} />
                 <span className="text-[10px] font-black uppercase tracking-[0.6em] italic">Verified Utility Meridian</span>
               </div>
             </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-4 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/10 rounded-[1.5rem] transition-all group"
          >
            <X size={24} className="text-rose-400/50 group-hover:text-rose-400 group-hover:rotate-90 transition-all duration-500" />
          </button>
        </div>

        {/* VAULT CONTENT AREA */}
        <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-transparent to-[#D4AF37]/5">
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* ACTIVE INTERFACE MODULE */}
            <section className="relative p-1 bg-gradient-to-br from-[#D4AF37]/20 to-transparent rounded-[3.5rem]">
              <div className="bg-[#050505] p-10 md:p-14 rounded-[3.4rem] border border-white/5 shadow-2xl">
                 <p className="text-[9px] text-[#D4AF37]/40 font-black uppercase tracking-[1em] mb-10 text-center italic">Interactive Interface Module</p>
                 {children}
              </div>
            </section>

            {/* ARCHIVAL MANUSCRIPT SECTION */}
            <section className="space-y-12 pb-10">
              <div className="flex items-center gap-8">
                <ScrollText className="text-[#D4AF37]" size={28} strokeWidth={1.5} />
                <h4 className="text-xs font-black uppercase tracking-[0.5em] text-white/60 italic">Archival Manuscript</h4>
                <div className="flex-grow h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
              </div>

              {loading ? (
                <div className="py-32 text-center space-y-8 rounded-[3rem] bg-white/[0.01] border border-white/5">
                  <Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={56} strokeWidth={1} />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] animate-pulse italic">Synchronizing Knowledge Nodes...</p>
                </div>
              ) : error ? (
                <div className="p-16 bg-rose-500/5 border-2 border-dashed border-rose-500/10 rounded-[4rem] text-center space-y-8">
                   <AlertTriangle className="mx-auto text-rose-400/30" size={48} />
                   <p className="text-sm font-bold text-white/60 italic uppercase tracking-widest">Registry synchronization protocol failed.</p>
                   <button 
                     onClick={syncArchive} 
                     className="px-10 py-4 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-rose-500/20 transition-all italic"
                   >
                     Restart Handshake
                   </button>
                </div>
              ) : archive ? (
                <article className="animate-in fade-in slide-in-from-bottom-10 duration-1000">
                  {archive.imageUrl && (
                    <div className="h-80 rounded-[3rem] overflow-hidden mb-16 border border-white/10 relative group">
                      <img 
                        src={archive.imageUrl} 
                        className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-[20s]" 
                        alt="Technical Dossier Visual" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent"></div>
                    </div>
                  )}

                  <div className="p-14 rounded-[4rem] bg-white/[0.02] border border-white/5 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none">
                      <Sparkles size={160} />
                    </div>
                    
                    <h2 className="text-5xl font-black text-white mb-10 italic tracking-tighter leading-tight uppercase">
                      {archive.title}
                    </h2>
                    
                    <div 
                      className="prose-dossier text-white/50 text-xl leading-[1.8] italic font-medium selection:bg-[#D4AF37] selection:text-black"
                      dangerouslySetInnerHTML={{ __html: archive.content }}
                    />
                    
                    <div
