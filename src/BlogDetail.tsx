import React, { useEffect, useState } from 'react';
import { 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  Printer, 
  Loader2, 
  Sparkles, 
  Landmark,
  History,
  FileText,
  ExternalLink
} from 'lucide-react';
import { getAutomatedArchive } from "./geminiService"; // Ensuring sync with your AI service

interface BlogDetailProps {
  id: string;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ id }) => {
  const [article, setArticle] = useState<any>(null);
  const [heroImage, setHeroImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFullData = async () => {
      setLoading(true);
      try {
        // Logic to retrieve the specific manuscript from your AI service or local constants
        const data = await getAutomatedArchive(); 
        const selected = data.find((p: any) => p.id === id) || null;
        
        if (selected) {
          setArticle(selected);
          // Fetching a high-quality thematic image
          const imgUrl = `https://pixabay.com/api/?key=53998460-a3c2d1b031017273e7b6e80cb&q=${encodeURIComponent(selected.title)}&image_type=photo&orientation=horizontal`;
          const resp = await fetch(imgUrl);
          const imgData = await resp.json();
          if (imgData.hits?.[0]) setHeroImage(imgData.hits[0].largeImageURL);
        }
      } catch (error) {
        console.error("Archive Retrieval Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFullData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] space-y-8">
        <div className="relative">
          <Loader2 className="animate-spin text-[#D4AF37]" size={80} strokeWidth={1} />
          <div className="absolute inset-0 blur-3xl bg-[#D4AF37]/20 animate-pulse" />
        </div>
        <div className="text-center space-y-4">
          <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#D4AF37] animate-pulse">Synchronizing with Knowledge Nodes</p>
          <p className="text-[9px] text-white/20 uppercase tracking-[0.3em]">Decoding Manuscript Data...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-12 bg-[#050505]">
        <Landmark size={80} strokeWidth={1} className="text-[#D4AF37] opacity-10 mb-8" />
        <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4 text-glow">Registry Entry Missing</h2>
        <p className="text-white/30 max-w-md italic mb-12 uppercase text-[10px] tracking-widest font-bold">The requested chronicle has been redacted or moved to a higher security sector.</p>
        <a href="#/blog" className="px-12 py-5 bg-[#D4AF37]/5 border border-[#D4AF37]/20 text-[#D4AF37] rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all duration-500">
          Return to Registry Index
        </a>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-40 selection:bg-[#D4AF37] selection:text-black">
      {/* CINEMATIC HERO HEADER */}
      <div className="relative h-[90vh] flex items-end justify-center overflow-hidden">
        <div 
          className="absolute inset-0 transition-transform duration-[3000ms] scale-110 hover:scale-100"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(5,5,5,0.2), #050505), url('${heroImage || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=1600'}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        
        <div className="relative z-10 max-w-6xl w-full px-8 pb-32 text-center md:text-left">
           <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-black/40 border border-[#D4AF37]/30 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.6em] mb-12 backdrop-blur-3xl">
             <Sparkles size={14} /> Professional Manuscript • {article.category}
           </div>
           <h1 className="text-6xl md:text-[10rem] font-black leading-[0.85] text-white uppercase tracking-tighter italic drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
             {article.title}
           </h1>
        </div>
      </div>

      {/* CORE CONTENT NAVIGATION */}
      <div className="max-w-4xl mx-auto py-12 px-8">
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-white/5 pb-12 mb-20 gap-10">
          <a href="#/blog" className="inline-flex items-center gap-4 text-white/30 hover:text-[#D4AF37] transition-all font-black text-[10px] uppercase tracking-[0.5em] group italic">
            <ArrowLeft size={18} className="group-hover:-translate-x-3 transition-transform duration-500" /> Back to Archives
          </a>
          <div className="flex gap-4">
            <button className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5 shadow-2xl" title="Share Dispatch"><Share2 size={18}/></button>
            <button className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5 shadow-2xl" onClick={() => window.print()} title="Print Records"><Printer size={18}/></button>
            <button className="w-14 h-14 bg-white/[0.03] rounded-2xl flex items-center justify-center hover:bg-[#D4AF37] hover:text-black transition-all border border-white/5 shadow-2xl" title="Bookmark File"><Bookmark size={18}/></button>
          </div>
        </div>

        {/* ANALYTIC METADATA */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[#D4AF37] text-[9px] font-black uppercase tracking-[0.4em] mb-24 py-8 border-y border-white/5">
          <div className="flex items-center justify-center md:justify-start gap-3"><Clock size={16} className="opacity-40" /> Archive Cycle: {new Date().getFullYear()}</div>
          <div className="flex items-center justify-center gap-3"><BookOpen size={16} className="opacity-40" /> Lexical Depth: ~1200 Words</div>
          <div className="flex items-center justify-center md:justify-end gap-3"><ShieldCheck size={16} className="opacity-40" /> Verified By: {article.author || 'Admin Scribe'}</div>
        </div>

        {/* THE MANUSCRIPT BODY */}
        <article className="prose-custom">
          {/* Ad Inventory Slot A */}
          <div className="h-24 mb-20 bg-white/[0.02] border border-dashed border-white/10 rounded-3xl flex items-center justify-center text-[9px] uppercase tracking-[0.8em] text-white/10">
             [ Sponsorship Integration Alpha ]
          </div>

          {/* Dynamic Content Rendering */}
          <div 
            className="manuscript-content text-white/70 leading-[2] text-lg font-medium italic-quotes"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Ad Inventory Slot B */}
          <div className="my-32 h-40 bg-white/[0.02] border border-dashed border-white/10 rounded-[3rem] flex items-center justify-center text-[9px] uppercase tracking-[0.8em] text-white/10 text-center px-10">
             [ Premium Global Chronicle Registry Display ]
          </div>

          {/* CLOSING INSTITUTIONAL NODE */}
          <div className="mt-40 p-16 bg-[#D4AF37]/5 border-2 border-dashed border-[#D4AF37]/20 rounded-[5rem] relative overflow-hidden group">
             <History size={300} className="absolute -bottom-20 -right-20 opacity-[0.02] rotate-12 group-hover:rotate-0 transition-transform duration-[2000ms]" />
             
             <div className="relative z-10 flex flex-col items-center text-center space-y-10">
                <div className="w-24 h-24 bg-[#D4AF37] rounded-[2.5rem] flex items-center justify-center text-black shadow-2xl transform group-hover:scale-110 transition-transform duration-700">
                   <FileText size={40} />
                </div>
                <div className="space-y-4">
                  <h4 className="text-4xl font-black uppercase tracking-tighter text-white italic">Institutional Postscript</h4>
                  <p className="text-white/40 italic text-xl max-w-2xl leading-relaxed mx-auto">
                    "This record is synchronized with global digital standards. Our technical scribes continuously verify the integrity of these archives to ensure absolute accuracy."
                  </p>
                </div>
                <div className="pt-10">
                  <a href="#/tools" className="inline-flex items-center gap-6 bg-[#D4AF37] text-black px-20 py-7 rounded-full font-black uppercase tracking-[0.2em] hover:scale-105 transition-all shadow-[0_30px_80px_rgba(212,175,55,0.3)] group text-[11px]">
                    Access Central Vault <ExternalLink size={20} className="group-hover:translate-x-3 transition-transform duration-500" />
                  </a>
                </div>
             </div>
          </div>
        </article>
      </div>
    </div>
  );
};
