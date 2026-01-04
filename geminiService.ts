import { GoogleGenerativeAI } from "@google/generative-ai";
import { TOOLS } from "./constants";

// === SOVEREIGN API REGISTRY ===
const GEMINI_KEY = import.meta.env.VITE_API_KEY || "";
const OPENROUTER_KEY = import.meta.env.VITE_OPENROUTER_KEY || "";
const PIXABAY_KEY = "48924033-0c30626359e86566498506253";

export interface ArchivalRecord {
  title: string;
  content: string;
  imageUrl: string | null;
  cycle: string;
  type: 'MASTER' | 'PRO';
  timestamp: number;
}

/**
 * Generates a stable unique ID for the current 12-hour window.
 * This ensures content regenerates twice a day for fresh SEO.
 */
export const getCycleSeed = (): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const amPm = now.getHours() < 12 ? 'AM' : 'PM';
  return `${dateStr}-${amPm}`;
};

/**
 * Visual Engine: Fetches high-fidelity professional imagery.
 */
export const getPixabayImage = async (query: string): Promise<string | null> => {
  try {
    const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query + ' technology luxury')}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3`;
    const response = await fetch(url);
    const data = await response.json();
    return data.hits?.length > 0 ? data.hits[0].largeImageURL : null;
  } catch {
    return null;
  }
};

/**
 * PRIMARY ENGINE: Gemini 1.5 Pro
 * Generates an authoritative, 1200-word scholarly deep-dive.
 */
const generateMasterManuscript = async (tool: any): Promise<Partial<ArchivalRecord> | null> => {
  if (!GEMINI_KEY) return null;
  
  const genAI = new GoogleGenerativeAI(GEMINI_KEY);
  
  const systemInstruction = `You are the Chief Technical Historian for StrongTools. 
  Generate a comprehensive 1200-word scholarly manuscript in semantic HTML (h2, h3, p, strong, ul, li). 
  FOCUS: Historical evolution, mathematical logic, and advanced professional use cases. 
  STYLE: Authoritative, academic, and prestigious. 
  SEO: Optimize for Google 'Helpful Content' guidelines. Avoid AI-typical fluff.`;
  
  const prompt = `Generate a master archival manuscript for the instrument: '${tool.name}'. 
  Context: ${tool.description}. 
  
  Mandatory Sections:
  1. Historical Origins: Trace the roots of this utility from analog to digital.
  2. Mathematical Framework: Explain the logic and formulas governing the tool.
  3. Professional Implementation: How industry experts utilize this data.
  4. Future Trajectories: The role of this utility in the next decade of technology.
  
  Return ONLY the HTML content.`;

  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-pro", 
      systemInstruction: systemInstruction 
    });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return { 
      title: `${tool.name}: An Institutional Analysis`, 
      content: text, 
      type: 'MASTER' 
    };
  } catch (e) {
    console.warn("Primary Node Failure. Failover initiated...", e);
    return null;
  }
};

/**
 * SECONDARY ENGINE: OpenRouter (Gemini Flash)
 * Used as a fallback or for faster responses.
 */
const generateProGuide = async (tool: any): Promise<Partial<ArchivalRecord> | null> => {
  if (!OPENROUTER_KEY) return null;
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-lite-preview-02-05:free",
        "messages": [
          { 
            "role": "system", 
            "content": "You are a Senior Technical Writer. Generate a 600-word professional guide in semantic HTML. Style: Concise, informative, and business-ready." 
          },
          { 
            "role": "user", 
            "content": `Produce a technical guide for: '${tool.name}'. Description: ${tool.description}` 
          }
        ]
      })
    });
    const result = await response.json();
    const content = result.choices[0]?.message?.content;
    return content ? { title: `${tool.name} Technical Protocol`, content, type: 'PRO' } : null;
  } catch {
    return null;
  }
};

/**
 * THE AUTOMATOR: Orchestrates caching and generation.
 */
export const getAutomatedArchive = async (toolId: string): Promise<ArchivalRecord | null> => {
  const tool = TOOLS.find(t => t.id === toolId);
  if (!tool) return null;

  const currentCycle = getCycleSeed();
  const cacheKey = `st_v4_archive_${toolId}`;
  
  // 1. Local Cache Check
  const cached = localStorage.getItem(cacheKey);
  if (cached) {
    const parsed: ArchivalRecord = JSON.parse(cached);
    if (parsed.cycle === currentCycle) return parsed;
  }

  // 2. Automated Generation (Primary -> Failover)
  let record: Partial<ArchivalRecord> | null = await generateMasterManuscript(tool);
  if (!record) {
    record = await generateProGuide(tool);
  }

  if (record && record.content) {
    const imageUrl = await getPixabayImage(tool.name);
    const finalRecord: ArchivalRecord = {
      title: record.title || tool.name,
      content: record.content,
      imageUrl,
      cycle: currentCycle,
      type: record.type || 'PRO',
      timestamp: Date.now()
    };

    // 3. Persistence
    localStorage.setItem(cacheKey, JSON.stringify(finalRecord));
    return finalRecord;
  }

  return null;
};

// --- Legacy Compatibility Exports ---
export const getDailyQuote = async () => ({ 
  quote: "Accuracy is the foundation of digital sovereignty.", 
  author: "StrongTools Archive" 
});

export const getOnThisDay = async () => "Archival nodes successfully calibrated for the current meridian.";

export const getDailyChronicles = async () => [];

export const getDetailedArticle = async (id: string) => getAutomatedArchive(id);

export const getCycleMetadata = (initialDate?: string) => ({ 
  cycleString: initialDate || getCycleSeed() 
});
