import { Tool, ToolCategory } from './types';

export const CATEGORY_COLORS: Record<string, { bg: string, text: string, glow: string }> = {
  'Knowledge': { bg: 'bg-yellow-400', text: 'text-black', glow: 'shadow-yellow-400/50' },
  'Time': { bg: 'bg-cyan-400', text: 'text-black', glow: 'shadow-cyan-400/50' },
  'Finance': { bg: 'bg-emerald-400', text: 'text-black', glow: 'shadow-emerald-400/50' },
  'Conversion': { bg: 'bg-pink-500', text: 'text-white', glow: 'shadow-pink-500/50' },
  'Generators': { bg: 'bg-indigo-500', text: 'text-white', glow: 'shadow-indigo-500/50' },
  'Productivity': { bg: 'bg-orange-500', text: 'text-white', glow: 'shadow-orange-500/50' }
};

export const TOOLS: Tool[] = [
  { 
    id: 'weather-live', 
    name: 'Atmospheric Pulse', 
    description: 'Real-time meteorological synchronization across global coordinates. Powered by satellite diagnostics.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'CloudSun',
    thumbnail: 'https://images.unsplash.com/photo-1592210633466-3b5bd94848cc?q=80&w=1200'
  },
  { 
    id: 'scribe-counter', 
    name: 'Manuscript Analyzer', 
    description: 'High-fidelity linguistic metrics. Analyze word density, character counts, and reading velocity.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'PencilLine',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200'
  },
  { 
    id: 'birth-watch', 
    name: 'Gestational Protocol', 
    description: 'Professional timeline tracking for pregnancy and estimated delivery via clinical rules.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'Activity',
    thumbnail: 'https://images.unsplash.com/photo-1591336398274-9f9173455b5b?q=80&w=1200'
  },
  { 
    id: 'age-calc', 
    name: 'Temporal Chronometer', 
    description: 'Calculate exact biological age down to the day. Precision tracking through the timeline of life.', 
    category: ToolCategory.TIME, 
    icon: 'UserCheck',
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200'
  },
  { 
    id: 'bmi-calc', 
    name: 'Biological Index (BMI)', 
    description: 'Assess physiological equilibrium using standardized Body Mass Index algorithms.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'Activity',
    thumbnail: 'https://images.unsplash.com/photo-1591336398274-9f9173455b5b?q=80&w=1200'
  },
  { 
    id: 'unit-conv', 
    name: 'Dimension Converter', 
    description: 'Expertly transform measurements of length, weight, and temperature with high precision.', 
    category: ToolCategory.CONVERSION, 
    icon: 'Ruler',
    thumbnail: 'https://images.unsplash.com/photo-1581092921461-7d63503487c2?q=80&w=1200'
  },
  { 
    id: 'pwd-gen', 
    name: 'Password Forge', 
    description: 'Forge impenetrable cryptographic passphrases for maximum digital security.', 
    category: ToolCategory.GENERATORS, 
    icon: 'ShieldAlert',
    thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dee997dd3df?q=80&w=1200'
  }
];

export const NAV_LINKS = [
  { name: 'Home', href: '#/' },
  { name: 'Vault', href: '#/tools' },
  { name: 'Archives', href: '#/blog' },
  { name: 'Contact', href: '#/contact' },
];
