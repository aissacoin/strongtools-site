import React from 'react';
import { Mail, Send, CheckCircle2, User, MessageCircle, Clock, Globe, AlertCircle, Sparkles, Landmark, Bookmark } from 'lucide-react';

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formData, setFormData] = React.useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = React.useState<FormErrors>({});

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (formData.name.trim().length < 3) newErrors.name = 'Professional title or full name is required.';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) newErrors.email = 'A secure digital address is mandatory.';
    if (formData.message.trim().length < 10) newErrors.message = 'Inquiry manuscript is too brief (min 10 characters).';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    
    // Simulating high-fidelity dispatch protocol
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white py-40 px-6 selection:bg-[#D4AF37] selection:text-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
        
        {/* INSTITUTIONAL INFO COLUMN */}
        <div className="lg:col-span-5 space-y-16">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] text-[10px] font-black uppercase tracking-[0.5em] shadow-xl">
              <Landmark size={14} /> Global Communications Hub
            </div>
            <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-[0.9]">
              The <span className="text-[#D4AF37] text-glow">Postmaster</span> <br/>General's Office
            </h1>
            <p className="text-3xl font-medium text-white/30 italic leading-relaxed">
              "Every inquiry is a manuscript we treat with scholarly care. Dispatch your vision to our lead scribes."
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center gap-8 p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] shadow-2xl group hover:border-[#D4AF37]/50 transition-all duration-500 backdrop-blur-3xl">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                <Mail size={32} />
              </div>
              <div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-1 italic">Registry Dispatch</h4>
                <p className="text-2xl md:text-3xl font-black tracking-tight">hello@strongtools.site</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 p-12 bg-white/[0.02] border border-white/5 rounded-[4rem] shadow-2xl group hover:border-[#D4AF37]/50 transition-all duration-500 backdrop-blur-3xl">
              <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-3xl flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                <Clock size={32} />
              </div>
              <div>
                <h4 className="text-[12px] font-black uppercase tracking-[0.4em] text-[#D4AF37]/60 mb-1 italic">Response Window</h4>
                <p className="text-2xl md:text-3xl font-black tracking-tight">24-48 Business Hours</p>
              </div>
            </div>
          </div>

          <div className="p-16 bg-[#D4AF37]/5 border-2 border-dashed border-[#D4AF37]/20 rounded-[4rem] relative overflow-hidden group">
            <Globe className="absolute -bottom-20 -right-20 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12" size={400} />
            <p className="text-2xl font-medium italic relative z-10 leading-[1.6] text-white/40">
              "Your direct feedback is the catalyst for our archival expansion. We process every missive dispatched to our station with absolute rigor."
            </p>
          </div>
        </div>

        {/* DISPATCH FORM COLUMN */}
        <div className="lg:col-span-7">
          <div className="bg-[#0a0a0a] rounded-[5rem] p-12 md:p-24 border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,1)] relative overflow-hidden">
            <div className="absolute top-0 right-0 p-20 opacity-[0.02] pointer-events-none rotate-[20deg] text-[#D4AF37]">
               <Bookmark size={500} strokeWidth={0.5} />
            </div>
            
            {submitted ? (
              <div className="py-32 text-center space-y-12 animate-in zoom-in duration-700">
                <div className="w-32 h-32 bg-[#D4AF37] rounded-[2.5rem] flex items-center justify-center mx-auto shadow-[0_0_80px_rgba(212,175,55,0.4)] rotate-12">
                  <CheckCircle2 size={64} className="text-black" />
                </div>
                <div className="space-y-4">
                  <h2 className="text-6xl font-black uppercase tracking-tighter italic">Manuscript Received</h2>
                  <p className="text-2xl text-white/30 italic font-medium">Your inquiry has been safely vaulted in our registry.</p>
                </div>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="px-12 py-5 bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-[#D4AF37] font-black uppercase tracking-[0.4em] text-[10px] rounded-2xl hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  Send Another Dispatch
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-12 relative z-10" noValidate>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.5em] flex items-center gap-3 italic">
                      <User size={14} /> Full Name / Title
                    </label>
                    <input 
                      name="name"
                      type="text" 
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full p-8 bg-black border border-white/5 rounded-3xl text-2xl outline-none focus:border-[#D4AF37] transition-all text-white placeholder-white/5 font-medium italic shadow-inner" 
                      placeholder="Identified Entity..." 
                    />
                    {errors.name && <p className="text-rose-500 text-xs italic font-bold flex items-center gap-2 px-4"><AlertCircle size={14}/> {errors.name}</p>}
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.5em] flex items-center gap-3 italic">
                      <Mail size={14} /> Digital Coordinate
                    </label>
                    <input 
                      name="email"
                      type="email" 
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-8 bg-black border border-white/5 rounded-3xl text-2xl outline-none focus:border-[#D4AF37] transition-all text-white placeholder-white/5 font-medium italic shadow-inner" 
                      placeholder="entity@meridian.com" 
                    />
                    {errors.email && <p className="text-rose-500 text-xs italic font-bold flex items-center gap-2 px-4"><AlertCircle size={14}/> {errors.email}</p>}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase text-[#D4AF37] tracking-[0.5em] flex items-center gap-3 italic">
                    <MessageCircle size={14} /> Inquiry Manuscript
                  </label>
                  <textarea 
                    name="message"
                    rows={6} 
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-8 bg-black border border-white/5 rounded-[3rem] text-2xl outline-none resize-none transition-all text-white placeholder-white/5 font-medium italic shadow-inner" 
                    placeholder="Compose your professional inquiry to the Archives here..."></textarea>
                  {errors.message && <p className="text-rose-500 text-xs italic font-bold flex items-center gap-2 px-4"><AlertCircle size={14}/> {errors.message}</p>}
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#D4AF37] text-black p-12 rounded-[3.5rem] font-black text-3xl hover:scale-[1.02] active:scale-95 transition-all shadow-[0_30px_60px_rgba(212,175,55,0.4)] flex items-center justify-center gap-8 uppercase tracking-tighter"
                >
                  {isSubmitting ? (
                    <><Sparkles className="animate-spin" size={32}/> Dispatching Protocol...</>
                  ) : (
                    <><Send size={36} /> Dispatch Manuscript</>
                  )}
                </button>
              </form>
            )}
          </div>
          <div className="mt-12 text-center opacity-20">
            <p className="text-[10px] font-black uppercase tracking-[1em] text-[#D4AF37]">End of Correspondence Module</p>
          </div>
        </div>
      </div>
    </div>
  );
};
