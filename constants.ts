
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
    name: 'Real-Time Weather Oracle', 
    description: 'Access celestial conditions across any earthly coordinate. Features real-time atmospheric data augmented by AI health and activity protocols.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'CloudSun',
    thumbnail: 'https://images.unsplash.com/photo-1592210633466-3b5bd94848cc?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'scribe-counter', 
    name: 'Word & Character Counter', 
    description: 'A sovereign digital instrument for high-fidelity manuscript analysis. Track word density, character counts, and reading time with absolute precision.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'PencilLine',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'global-wonders', 
    name: 'Global Wonders & Archives', 
    description: 'A unified library of city oddities, world wonders, essential literature, and global capitals.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'Globe',
    thumbnail: 'https://images.unsplash.com/photo-1524850041227-63d88c4d7ce0?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'birth-watch', 
    name: 'Birth Year History Finder', 
    description: 'Discover the trending cinema, music, and highlights from your birth year.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'History',
    thumbnail: 'https://images.unsplash.com/photo-1485846234645-a62644ef7467?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'age-calc', 
    name: 'Age Calculator (Exact)', 
    description: 'Calculate your exact age in years, months, and days to track your journey through time.', 
    category: ToolCategory.TIME, 
    icon: 'UserCheck',
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'timer-stopwatch', 
    name: 'Online Stopwatch & Timer', 
    description: 'Precise measurement of passing moments with a digital stopwatch and countdown timer.', 
    category: ToolCategory.TIME, 
    icon: 'Timer',
    thumbnail: 'https://images.unsplash.com/photo-1518131359103-33bc89a716da?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'countdown-clock', 
    name: 'Countdown Timer for Events', 
    description: 'Set a target for future events and observe the remaining sands of time.', 
    category: ToolCategory.TIME, 
    icon: 'Hourglass',
    thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'morse-code', 
    name: 'Morse Code Translator', 
    description: 'Translate text into historical Morse code telegraph signals.', 
    category: ToolCategory.CONVERSION, 
    icon: 'Radio',
    thumbnail: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'bmi-calc', 
    name: 'BMI Calculator (Body Mass Index)', 
    description: 'Assess your physical equilibrium using the Body Mass Index scale.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'Activity',
    thumbnail: 'https://images.unsplash.com/photo-1591336398274-9f9173455b5b?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'basic-calc', 
    name: 'Simple Online Calculator', 
    description: 'Perform essential calculations on a clean, vintage-inspired digital ledger.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'Calculator',
    thumbnail: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f677?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'unit-conv', 
    name: 'Metric Unit Converter', 
    description: 'Expertly transform measurements of length, weight, temperature and volume.', 
    category: ToolCategory.CONVERSION, 
    icon: 'Ruler',
    thumbnail: 'https://images.unsplash.com/photo-1581092921461-7d63503487c2?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'binary-cipher', 
    name: 'Text to Binary Converter', 
    description: 'Translate modern linguistics into the foundational binary language of logic.', 
    category: ToolCategory.CONVERSION, 
    icon: 'Binary',
    thumbnail: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'vellum-filler', 
    name: 'Lorem Ipsum Generator', 
    description: 'Generate high-quality placeholder script for your digital layouts.', 
    category: ToolCategory.GENERATORS, 
    icon: 'FileText',
    thumbnail: 'https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'qr-gen', 
    name: 'Free QR Code Generator', 
    description: 'Forge unique QR code sigils from modern web addresses and text.', 
    category: ToolCategory.GENERATORS, 
    icon: 'QrCode',
    thumbnail: 'https://images.unsplash.com/photo-1595079676339-1534801ad6cf?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'days-counter', 
    name: 'Days Between Dates Calculator', 
    description: 'Calculate the exact chronological distance in days between any two points in history.', 
    category: ToolCategory.TIME, 
    icon: 'CalendarDays',
    thumbnail: 'https://images.unsplash.com/photo-1495364141860-b0d03eccd065?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'pwd-gen', 
    name: 'Random Password Generator', 
    description: 'Forge powerful, impenetrable passphrases for maximum digital security.', 
    category: ToolCategory.GENERATORS, 
    icon: 'ShieldAlert',
    thumbnail: 'https://images.unsplash.com/photo-1510511459019-5dee997dd3df?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'world-clock', 
    name: 'World Clock & Time Zones', 
    description: 'Monitor temporal progress across major international meridians and cities.', 
    category: ToolCategory.TIME, 
    icon: 'Globe',
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200&auto=format&fit=crop'
  },
  { 
    id: 'perc-calc', 
    name: 'Percentage Calculator', 
    description: 'Mathematical tools for calculating fiscal ratios, percentage increase, and interest.', 
    category: ToolCategory.FINANCE, 
    icon: 'Percent',
    thumbnail: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop'
  },
];

export const NAV_LINKS = [
  { name: 'Home', href: '#/' },
  { name: 'Tools', href: '#/tools' },
  { name: 'Chronicles', href: '#/blog' },
  { name: 'Correspondence', href: '#/contact' },
];
