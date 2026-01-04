import React from 'react';
import { NAV_LINKS } from "./constants";
import { Menu, X, Sun, Moon, Github, ShieldCheck, Zap } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'aureate' | 'abyss'>(() => {
    return (localStorage.getItem('theme') as 'aureate' | 'abyss') || 'abyss';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'aureate' ? 'abyss' : 'aureate');
  };

  return (
    <div className="flex flex-col min-h-screen transition-all duration-700 ease-in-out bg-[#050505]">
      {/* HEADER NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-6 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto bg-black/60 backdrop-blur-2xl border border-white/5 p-3 rounded-[2.5rem] shadow-2xl transition-all duration-500">
          
          {/* Brand Identity */}
          <div className="flex items-center gap-3 pl-2">
            <a href="#/" className="flex items-center gap-3 group">
              <div className="w-11 h-11 bg-[#D4AF37] rounded-2xl flex items-center justify-center text-black font-black shadow-lg shadow-[#D4AF37]/20 group-hover:scale-110 transition-transform">
                <Zap size={20} fill="black" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-black tracking-tighter text-white uppercase italic leading-none">
                  Strong<span className="text-[#D4AF37]">Tools</span>
                </span>
                <span className="text-[7px] uppercase tracking-[0.4em] text-white/30 font-bold">Utility Registry</span>
              </div>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-2">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-white/40 hover:text-[#D4AF37] px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 hover:bg-white/5"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10 mx-2"></div>

            <button 
              onClick={toggleTheme}
              className="w-11 h-11 rounded-2xl flex items-center justify-center text-[#D4AF37] bg-white/5 border border-white/5 hover:border-[#D4AF37]/30 hover:scale-105 active:scale-95 transition-all duration-500"
              title="Toggle Atmosphere"
            >
              {theme === 'aureate' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </nav>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center gap-2 pr-2">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[#D4AF37] bg-white/5 border border-white/5 transition-all duration-500"
            >
              {theme === 'aureate' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white p-2 transition-colors duration-500"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-black border border-white/10 rounded-[2.5rem] p-6 space-y-3 pointer-events-auto animate-in slide-in-from-top duration-300 shadow-3xl">
            {NAV_LINKS.map(link => (
              <a 
                key={link.name} 
                href={link.href} 
                onClick={() => setIsMenuOpen(false)} 
                className="block text-white font-black text-2xl p-4 rounded-3xl hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] transition-all duration-300 italic uppercase"
              >
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* GLOBAL FOOTER */}
      <footer className="bg-black py-32 border-t border-white/5 mt-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-20 text-center md:text-left">
          
          {/* Column 1: Brand Lore */}
          <div className="space-y-8">
             <div className="flex justify-center md:justify-start items-center gap-3">
                <div className="w-10 h-10 bg-[#D4AF37] rounded-lg flex items-center justify-center text-black font-black shadow-lg">S</div>
                <span className="text-2xl font-black tracking-tighter text-white uppercase italic">StrongTools.site</span>
             </div>
             <p className="text-white/40 text-xs leading-relaxed max-w-xs mx-auto md:mx-0 font-medium">
               Providing professional precision instruments for the digital era. Curated for performance, accuracy, and aesthetic excellence.
             </p>
             <div className="flex justify-center md:justify-start gap-4">
               <a href="#" className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all duration-500 border border-white/5">
                 <Github size={20}/>
               </a>
             </div>
          </div>

          {/* Column 2: Instruments */}
          <div className="space-y-6">
             <h4 className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em]">Digital Instruments</h4>
             <div className="flex flex-col gap-4 text-[13px] font-bold">
                <a href="#/tools" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Age Calculator</a>
                <a href="#/tools" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Password Forge</a>
                <a href="#/tools" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Unit Conversion</a>
                <a href="#/tools" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Morse Decoder</a>
             </div>
          </div>

          {/* Column 3: Navigation */}
          <div className="space-y-6">
             <h4 className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em]">The Archive</h4>
             <div className="flex flex-col gap-4 text-[13px] font-bold">
                <a href="#/about" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">About Station</a>
                <a href="#/blog" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Expert Chronicles</a>
                <a href="#/contact" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Contact Core</a>
                <a href="#" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Sitemap</a>
             </div>
          </div>

          {/* Column 4: Compliance */}
          <div className="space-y-6">
             <h4 className="text-[#D4AF37] font-black text-[10px] uppercase tracking-[0.3em]">Governance</h4>
             <div className="flex flex-col gap-4 text-[13px] font-bold">
                <a href="#/privacy" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Privacy & Data Pact</a>
                <a href="#/terms" className="text-white/40 hover:text-white transition-colors duration-300 uppercase tracking-tighter">Terms of Engagement</a>
                <div className="pt-6 flex items-center justify-center md:justify-start gap-2 text-[#D4AF37]/40 border-t border-white/5">
                   <ShieldCheck size={16} />
                   <span className="text-[9px] font-black uppercase tracking-widest">GDPR & AdSense Compliant</span>
                </div>
             </div>
          </div>
        </div>

        {/* Copyright Baseline */}
        <div className="max-w-7xl mx-auto px-4 mt-24 pt-10 border-t border-white/5 text-center">
          <p className="text-white/20 text-[9px] font-black uppercase tracking-[0.6em]">
            &copy; {new Date().getFullYear()} STRONGTOOLS UTILITY CORE • BUILT FOR ACCURACY & TRUST
          </p>
        </div>
      </footer>
    </div>
  );
};
