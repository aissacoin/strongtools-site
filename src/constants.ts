import { Tool, ToolCategory } from './types';

export const TOOLS: Tool[] = [
  { 
    id: 'bmi-calc', 
    name: 'Biological Index', 
    description: 'Precision body mass analysis.', 
    category: ToolCategory.PRODUCTIVITY, 
    icon: 'Activity',
    thumbnail: 'https://images.unsplash.com/photo-1591336398274-9f9173455b5b?q=80&w=1200'
  },
  { 
    id: 'age-calc', 
    name: 'Temporal Chronometer', 
    description: 'Exact biological age tracking.', 
    category: ToolCategory.TIME, 
    icon: 'UserCheck',
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?q=80&w=1200'
  },
  { 
    id: 'weather-live', 
    name: 'Atmospheric Pulse', 
    description: 'Real-time global weather sync.', 
    category: ToolCategory.KNOWLEDGE, 
    icon: 'CloudSun',
    thumbnail: 'https://images.unsplash.com/photo-1592210633466-3b5bd94848cc?q=80&w=1200'
  }
];

export const NAV_LINKS = [
  { name: 'Home', href: '#/' },
  { name: 'Vault', href: '#/tools' },
  { name: 'Contact', href: '#/contact' },
];
