export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: string;
  thumbnail?: string;
}

export enum ToolCategory {
  PRODUCTIVITY = 'Productivity',
  FINANCE = 'Finance',
  TIME = 'Time',
  KNOWLEDGE = 'Knowledge',
  CONVERSION = 'Conversion',
  GENERATORS = 'Generators'
}

export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image: string;
}

export interface WeatherData {
  temp: number;
  condition: string;
  location: string; // Added for better English diagnostics
  humidity: number; // Essential for "Atmospheric Pulse" tool
  windSpeed: number; // Standard meteorological metric
  sunrise: string;
  sunset: string;
  forecast: { 
    day: string; 
    temp: number; 
    condition: string 
  }[];
}
