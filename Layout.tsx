
import React from 'react';
import { NAV_LINKS } from "./constants";
import { Menu, X, Sun, Moon, Github, ShieldCheck } from 'lucide-react';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<'aureate' | 'abyss'>(() => {
    return (localStorage.getItem('theme') as 'aureate' | 'abyss') || 'aureate';
  });

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'aureate' ? 'abyss' : 'aureate');
  };

  return (
    <div className="flex flex-col min-h-screen transition-all duration-700 ease-in-out bg-[var(--bg-deep)]">
      <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-between items-center pointer-events-auto bg-[var(--bg-main)]/90 backdrop-blur-2xl border border-[var(--border-glow)] p-3 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500">
          <div className="flex items-center gap-3 pl-2">
            <a href="#/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-[var(--accent)] rounded-xl flex items-center justify-center text-[var(--bg-deep)] font-black shadow-lg shadow-[var(--accent-glow)] group-hover:scale-110 transition-transform">S</div>
              <span className="text-xl font-black tracking-tighter text-white">Strong<span className="text-[var(--accent)] transition-colors duration-500">Tools</span></span>
            </a>
          </div>
          
          <nav className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-1">
              {NAV_LINKS.map(link => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  className="text-[var(--text-dim)] hover:text-white hover:bg-white/5 px-4 py-2 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="w-px h-6 bg-white/10 mx-2"></div>

            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--accent)] bg-[var(--bg-card)] border border-[var(--border-glow)] hover:scale-110 active:scale-95 transition-all duration-500 shadow-inner"
              title="Change Atmosphere"
            >
              {theme === 'aureate' ? <Moon size={18} className="transition-all" /> : <Sun size={18} className="transition-all" />}
            </button>
          </nav>

          <div className="md:hidden flex items-center gap-2 pr-2">
            <button 
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-[var(--accent)] bg-[var(--bg-card)] border border-[var(--border-glow)] transition-all duration-500"
            >
              {theme === 'aureate' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-[var(--accent)] p-2 transition-colors duration-500">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 bg-[var(--bg-main)] border border-[var(--border-glow)] rounded-[2rem] p-4 space-y-2 pointer-events-auto animate-in slide-in-from-top duration-300 shadow-2xl overflow-hidden">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} onClick={() => setIsMenuOpen(false)} className="block text-white font-black text-xl p-4 rounded-2xl hover:bg-[var(--accent)]/10 transition-colors duration-300">
                {link.name}
              </a>
            ))}
          </div>
        )}
      </header>

      <div className="pt-24 px-4 max-w-7xl mx-auto w-full">
         <div className="ad-placeholder h-24 mb-6 transition-all duration-500"> [Top Banner Ad Slot] </div>
      </div>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-[var(--bg-deep)] py-24 border-t border-[var(--border-glow)] mt-20 transition-all duration-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 text-center md:text-left">
          
          {/* Column 1: Brand */}
          <div className="space-y-6">
             <div className="flex justify-center md:justify-start items-center gap-3">
                <div className="w-10 h-10 bg-[var(--accent)] rounded-lg flex items-center justify-center text-[var(--bg-deep)] font-black shadow-lg transition-colors duration-500">S</div>
                <span className="text-2xl font-black tracking-tight text-white">StrongTools.site</span>
             </div>
             <p className="text-[var(--text-dim)] text-xs leading-relaxed max-w-xs mx-auto md:mx-0">
               Providing professional precision instruments for the digital era since 2024. Curated for performance and aesthetic excellence.
             </p>
             <div className="flex justify-center md:justify-start gap-4">
               <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[var(--accent)] hover:bg-[var(--accent)] hover:text-black transition-all duration-300"><Github size={18}/></a>
             </div>
          </div>

          {/* Column 2: Tools */}
          <div className="space-y-4">
             <h4 className="text-[var(--accent)] font-black text-xs uppercase tracking-widest transition-colors duration-500">Digital Instruments</h4>
             <div className="flex flex-col gap-2 text-sm">
                <a href="#/tools" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Age Calculator</a>
                <a href="#/tools" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Password Forge</a>
                <a href="#/tools" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Unit Conversion</a>
                <a href="#/tools" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Metric Archive</a>
                <a href="#/tools" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">World Wonders</a>
             </div>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
             <h4 className="text-[var(--accent)] font-black text-xs uppercase tracking-widest transition-colors duration-500">The Archive</h4>
             <div className="flex flex-col gap-2 text-sm">
                <a href="#/about" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">About</a>
                <a href="#/blog" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Expert Chronicles</a>
                <a href="#/contact" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Contact</a>
                <a href="#/about" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Station History</a>
                <a href="#" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Sitemap</a>
             </div>
          </div>

          {/* Column 4: Legal */}
          <div className="space-y-4">
             <h4 className="text-[var(--accent)] font-black text-xs uppercase tracking-widest transition-colors duration-500">Governance</h4>
             <div className="flex flex-col gap-2 text-sm">
                <a href="#/privacy" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Privacy & Data Pact</a>
                <a href="#/terms" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Terms of Engagement</a>
                <a href="#/privacy" className="text-[var(--text-dim)] hover:text-white transition-colors duration-300">Cookie Policy</a>
                <div className="pt-4 flex items-center gap-2 text-[var(--accent)]/60 transition-colors duration-500">
                   <ShieldCheck size={16} />
                   <span className="text-[9px] font-black uppercase tracking-widest">GDPR & AdSense Compliant</span>
                </div>
             </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-white/5 text-center transition-all duration-500">
          <p className="text-[var(--text-dim)] text-[10px] font-black uppercase tracking-[0.5em]">
            &copy; {new Date().getFullYear()} StrongTools Utility Core • Built for Accuracy & Trust
          </p>
        </div>
      </footer>
    </div>
  );
};
