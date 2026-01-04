import React, { useState, useEffect } from 'react';
import { BookOpen, Clock, ArrowRight, Search, Loader2, Sparkles, History } from 'lucide-react';
import { getAutomatedArchive } from "./geminiService";

const PIXABAY_KEY = '53998460-a3c2d1b031017273e7b6e80cb';

// Primary Manuscript Registry
export const BLOG_POSTS = [
  {
    id: 'master-guide',
    title: 'The Sovereign Guide to Digital Precision',
    excerpt: 'An archival overview of how absolute rigor defines modern utility instruments.',
    author: 'Lead Scribe',
    date: 'Current Cycle',
    category: 'Productivity',
    query: 'digital precision technology'
  }
];

const BlogPostCard: React.FC<{ post: any }> = ({ post }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const query = encodeURIComponent(post.title);
        const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3`;
        const resp = await fetch(url);
        const data = await resp.json();
        if (data.hits?.length > 0) setImageUrl(data.hits[0].webformatURL);
      } catch (e) { console.warn("Image Archive Sync Error:", e); }
    };
    fetchImage();
  }, [post]);

  return (
    <article className="bg-white/[0.02] rounded-[3rem] overflow-hidden group flex flex-col h-full border border-white/5 hover:border-[#D4AF37]/40 transition-all duration-500 shadow-2xl">
      {/* Image Header */}
      <div className="h-64 overflow-hidden relative bg-black">
        <img 
          src={imageUrl || 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800'} 
          alt={post.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 opacity-40 group-hover:opacity-60" 
        />
        <div className="absolute top-6 left-6">
          <span className="bg-[#D4AF37] text-black px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-xl">
            {post.category}
          </span>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-10 flex flex-col flex-grow space-y-6">
        <div className="flex items-center gap-4 text-white/20 text-[9px] font-black uppercase tracking-[0.2em]">
          <div className="flex items-center gap-1 text-[#D4AF37]/60"><Clock size={12}/> Global Cycle</div>
          <span>By {post.author}</span>
        </div>
        
        <h2 className="text-2xl font-black leading-tight group-hover:text-[#D4AF37] transition-colors italic uppercase tracking-tighter">
          {post.title}
        </h2>
        
        <p className="text-white/40 text-sm italic flex-grow leading-relaxed font-medium">
          "{post.excerpt}"
        </p>

        <a href={`#/blog/${post.id}`} className="inline-flex items-center gap-3 text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em] group/link border-t border-white/5 pt-6">
          Read Manuscript 
          <ArrowRight size={16} className="group-hover/link:translate-x-3 transition-transform duration-500" />
        </a>
      </div>
    </article>
  );
};

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetching from Gemini-powered Daily Chronicles
    getAutomatedArchive().then(data => {
      setPosts([...BLOG_POSTS, ...data]);
      setLoading(false);
    }).catch(() => {
      setPosts(BLOG_POSTS);
      setLoading(false);
    });
  }, []);

  return (
    <div className="bg-[#050505] min-h-screen text-white py-32 px-4 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto space-y-24">
        
        {/* Hero Header */}
        <div className="text-center space-y-8 relative py-10">
          <div className="absolute inset-0 bg-[#D4AF37]/5 blur-[120px] rounded-full -z-10" />
          
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] mb-4">
            <History size={16} /> The Sovereignty Archive
          </div>
          
          <h1 className="text-7xl md:text-[10rem] font-black uppercase tracking-tighter italic leading-none">
            The <span className="text-[#D4AF37]">Chronicles</span>
          </h1>
          
          <p className="text-lg md:text-xl text-white/30 italic max-w-2xl mx-auto font-medium">
            "Deep technical insights and logical foundations curated by the master scribes of the vault."
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="py-48 text-center space-y-8">
            <div className="relative inline-block">
               <Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={64} strokeWidth={1} />
               <div className="absolute inset-0 blur-2xl bg-[#D4AF37]/20 animate-pulse" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] animate-pulse">
              Synchronizing with Knowledge Nodes...
            </p>
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {posts.map((post, idx) => (
              <BlogPostCard key={idx} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-40 bg-white/[0.01] rounded-[4rem] border-2 border-dashed border-white/5">
            <Search className="mx-auto text-white/10 mb-8" size={64} />
            <p className="text-2xl font-black text-white/20 italic uppercase tracking-[0.2em]">
              No manuscripts found for this temporal cycle.
            </p>
          </div>
        )}

        {/* Bottom Ad / CTA Slot */}
        <div className="border border-white/5 bg-white/[0.02] p-12 rounded-[3.5rem] text-center opacity-40 hover:opacity-100 transition-opacity duration-700 group">
          <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#D4AF37] mb-2">Notice</p>
          <div className="text-xs font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
            [ Premium Chronicle Registry Ad Space Available ]
          </div>
        </div>
      </div>
    </div>
  );
};
