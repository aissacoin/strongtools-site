import { Tool, ToolCategory } from './types';

export const CATEGORY_COLORS: Record<string, { bg: string, text: string, glow: string }> = {
  'Knowledge': { bg: 'bg-[#D4AF37]', text: 'text-black', glow: 'shadow-[#D4AF37]/50' },
  'Time': { bg: 'bg-cyan-400', text: 'text-black', glow: 'shadow-cyan-400/50' },
  'Finance': { bg: 'bg-emerald-400', text: 'text-black', glow: 'shadow-emerald-400/50' },
  'Conversion': { bg: 'bg-pink-500', text: 'text-white', glow: 'shadow-pink-500/50' },
  'Generators': { bg: 'bg-indigo-500', text: 'text-white', glow: 'shadow-indigo-500/50' },
  'Productivity': { bg: 'bg-orange-500', text: 'text-white', glow: 'shadow-orange-500/50' }
};

export const TOOLS: Tool[] = [
  { 
    id: 'weather-live', 
    name: 'Weather Oracle', 
    description: 'Real-time meteorological synchronization across global strategic hubs. High-fidelity satellite diagnostics.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'CloudSun',
    thumbnail: 'https://images.unsplash.com/photo-1592210633466-3b5bd94848cc?q=80&w=1200'
  },
  { 
    id: 'scribe-counter', 
    name: 'Manuscript Analyzer', 
    description: 'Advanced linguistic metrics for professional writers. Analyze word density and manuscript velocity.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'PencilLine',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200'
  },
  { 
    id: 'age-calc', 
    name: 'Temporal Chronometer', 
    description: 'Calculate exact biological age through life’s timeline. Precision tracking of temporal existence.', 
    category: ToolCategory.TIME, 
    icon: 'UserCheck',
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200'
  },
  { 
    id: 'stopwatch-timer', 
    name: 'Chronometer Protocol', 
    description: 'Precise measurement of passing moments using high-accuracy digital stopwatch and countdown modules.', 
    category: ToolCategory.TIME, 
    icon: 'Timer',
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200'
  },
  { 
    id: 'bmi-calc', 
    name: 'Biological Index (BMI)', 
    description: 'Assess physiological equilibrium and health metrics using standardized clinical algorithms.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'Activity',
    thumbnail: 'https://images.unsplash.com/photo-1591336398274-9f9173455b5b?q=80&w=1200'
  },
  { 
    id: 'unit-conv', 
    name: 'Dimension Converter', 
    description: 'Professional transformation of measurements. Convert mass, length, and temperature with clinical accuracy.', 
    category: ToolCategory.CONVERSION, 
    icon: 'Ruler',
    thumbnail: 'https://images.unsplash.com/photo-1581092921461-7d63503487c2?q=80&w=1200'
  },
  { 
    id: 'pwd-gen', 
    name: 'Cryptographic Forge', 
    description: 'Forge impenetrable digital keys using advanced randomization for maximum vault security.', 
    category: ToolCategory.GENERATORS, 
    icon: 'ShieldAlert',
    thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dee997dd3df?q=80&w=1200'
  }
];

export const NAV_LINKS = [
  { name: 'Home', href: '#/' },
  { name: 'Vault', href: '#/tools' },
  { name: 'Archives', href: '#/blog' },
  { name: 'Correspondence', href: '#/contact' },
];
