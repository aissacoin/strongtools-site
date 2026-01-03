
import React from 'react';
import { X, Sparkles, Loader2, ShieldCheck, ScrollText, AlertTriangle, History, RefreshCw, Bookmark } from 'lucide-react';
import { getAutomatedArchive, ArchivalRecord } from '../services/geminiService';

interface ToolModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  toolId?: string; // Added to facilitate better lookup
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
      if (data) setArchive(data);
      else throw new Error("Registry empty");
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
  }, [isOpen, toolId, syncArchive]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-[#000000]/95 backdrop-blur-md">
      <div className="bg-[var(--bg-deep)] border-2 border-[var(--border-glow)] rounded-[4rem] w-full max-w-5xl shadow-[0_0_120px_rgba(0,0,0,0.9)] overflow-hidden animate-in fade-in zoom-in duration-500 flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="px-12 py-8 border-b border-[var(--border-glow)] flex justify-between items-center bg-[var(--bg-main)]">
          <div className="flex items-center gap-6">
             <div className="w-12 h-12 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center text-[var(--accent)] border border-[var(--accent)]/20">
               <Sparkles size={24} />
             </div>
             <div>
               <h3 className="text-3xl font-black text-white tracking-tighter leading-none">{title}</h3>
               <div className="flex items-center gap-3 mt-1 text-[var(--accent)]/50">
                 <ShieldCheck size={12} />
                 <span className="text-[9px] font-black uppercase tracking-[0.5em]">Verified Utility Meridian</span>
               </div>
             </div>
          </div>
          <button onClick={onClose} className="p-3 bg-rose-500/5 hover:bg-rose-500/10 border border-rose-500/20 rounded-xl transition-all">
            <X size={24} className="text-rose-400" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-8 md:p-12 overflow-y-auto custom-scrollbar flex-grow bg-gradient-to-b from-transparent to-black/40">
          <div className="max-w-4xl mx-auto space-y-16">
            
            {/* Tool Interactive Interface */}
            <section className="relative p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] shadow-inner">
               {children}
            </section>

            {/* Content Logic */}
            <section className="space-y-10">
              <div className="flex items-center gap-6">
                <ScrollText className="text-[var(--accent)]" size={24} />
                <h4 className="text-xs font-black uppercase tracking-[0.4em] text-white">The Archival Manuscript</h4>
                <div className="flex-grow h-px bg-gradient-to-r from-[var(--accent)]/20 to-transparent"></div>
              </div>

              {loading ? (
                <div className="py-24 text-center space-y-6">
                  <Loader2 className="animate-spin mx-auto text-[var(--accent)]" size={48} />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] animate-pulse">Re-Indexing Sovereign Knowledge Nodes...</p>
                </div>
              ) : error ? (
                <div className="p-12 bg-rose-500/5 border-2 border-dashed border-rose-500/20 rounded-[3rem] text-center space-y-6">
                   <AlertTriangle className="mx-auto text-rose-400 opacity-40" size={40} />
                   <p className="text-sm font-bold text-white italic">Registry synchronization latency detected.</p>
                   <button onClick={syncArchive} className="px-8 py-3 bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-rose-500/20 transition-all">
                     Retry Handshake
                   </button>
                </div>
              ) : archive ? (
                <article className="animate-in fade-in duration-1000">
                  {archive.imageUrl && (
                    <div className="h-64 rounded-[2.5rem] overflow-hidden mb-12 border border-white/10 group relative">
                      <img src={archive.imageUrl} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-[10s]" alt="Contextual Imagery" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-deep)] to-transparent"></div>
                    </div>
                  )}

                  <div className="glass-3d p-12 rounded-[3.5rem] bg-white/[0.01]">
                    <h2 className="text-4xl font-black text-[#D4AF37] mb-10 italic font-serif-scholarly leading-tight">{archive.title}</h2>
                    <div 
                      className="prose-archive selection:bg-[#D4AF37] selection:text-black"
                      dangerouslySetInnerHTML={{ __html: archive.content }}
                    />
                    
                    <div className="mt-16 pt-8 border-t border-white/5 flex flex-wrap items-center gap-6 opacity-40">
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><History size={14}/> Cycle: {archive.cycle}</div>
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><Bookmark size={14}/> Node: {archive.type}</div>
                      <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest"><ShieldCheck size={14}/> Verified Archive</div>
                    </div>
                  </div>
                </article>
              ) : null}
            </section>
          </div>
        </div>

        {/* Footer Taskbar */}
        <div className="px-12 py-4 bg-black/60 border-t border-[var(--border-glow)] flex items-center justify-between">
           <span className="text-[9px] font-black uppercase tracking-[0.5em] text-[var(--accent)]/40 italic">StrongTools • High-Fidelity Knowledge Registry</span>
           <div className="flex gap-1">
             {[1,2,3].map(i => <div key={i} className="w-1 h-1 rounded-full bg-[var(--accent)]/20"></div>)}
           </div>
        </div>
      </div>
    </div>
  );
};
