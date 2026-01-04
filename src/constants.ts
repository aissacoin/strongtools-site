import { 
  Shield, 
  Zap, 
  Code, 
  Globe, 
  Smartphone, 
  Lock, 
  Calculator, 
  UserPlus, 
  CloudSun, 
  FileText 
} from 'lucide-react';

export const TOOLS = [
  {
    id: 'bmi-calculator',
    title: 'Body Composition Index',
    description: 'Precision analysis of body mass parameters using advanced clinical metrics.',
    category: 'utility',
    icon: 'Calculator',
    path: '/tool/bmi-calculator'
  },
  {
    id: 'age-calculator',
    title: 'Temporal Chronometer',
    description: 'Calculate precise age metrics down to seconds for archival and registry purposes.',
    category: 'utility',
    icon: 'UserPlus',
    path: '/tool/age-calculator'
  },
  {
    id: 'password-forge',
    title: 'Password Forge',
    description: 'Generate military-grade encrypted strings for high-security digital vaults.',
    category: 'security',
    icon: 'Lock',
    path: '/tool/password-forge'
  },
  {
    id: 'weather-live',
    title: 'Atmospheric Pulse',
    description: 'Real-time global meteorological data synchronized with satellite feeds.',
    category: 'web',
    icon: 'CloudSun',
    path: '/tool/weather-live'
  },
  {
    id: 'word-counter',
    title: 'Manuscript Analyzer',
    description: 'Detailed linguistic breakdown of text structure, word count, and density.',
    category: 'design',
    icon: 'FileText',
    path: '/tool/word-counter'
  },
  {
    id: 'birth-watch',
    title: 'Birth Watch Protocol',
    description: 'Sophisticated tracking of gestational timelines and developmental milestones.',
    category: 'utility',
    icon: 'Zap',
    path: '/tool/birth-watch'
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Instruments', icon: 'Globe' },
  { id: 'security', label: 'Security Vault', icon: 'Shield' },
  { id: 'utility', label: 'Utility Engines', icon: 'Zap' },
  { id: 'coding', label: 'Logic & Code', icon: 'Code' },
  { id: 'web', label: 'Network Tools', icon: 'Globe' },
  { id: 'design', label: 'Creative Suite', icon: 'Smartphone' }
];

export const BLOG_POSTS = [
  {
    id: 'digital-sovereignty',
    title: 'The Era of Data Sovereignty',
    excerpt: 'Exploring the shift towards local-first data processing and user-owned digital identities.',
    date: '2024-05-20',
    category: 'security'
  },
  {
    id: 'ai-utility-evolution',
    title: 'AI and the Future of Utilities',
    excerpt: 'How generative models are transforming simple calculators into intelligent advisors.',
    date: '2024-05-18',
    category: 'coding'
  }
];
