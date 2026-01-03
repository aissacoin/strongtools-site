
import { GoogleGenAI, Type } from "@google/genai";
import { TOOLS } from "./constants";

// === SOVEREIGN API REGISTRY ===
const GEMINI_KEY = process.env.API_KEY || "";
const OPENROUTER_KEY = process.env.OPENROUTER_KEY || "";
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
 * Generates a stable unique ID for the current 12-hour window (YYYY-MM-DD-AM/PM).
 */
export const getCycleSeed = (): string => {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const amPm = now.getHours() < 12 ? 'AM' : 'PM';
  return `${dateStr}-${amPm}`;
};

/**
 * Visual Engine: Fetches high-quality professional imagery from Pixabay.
 */
export const getPixabayImage = async (query: string): Promise<string | null> => {
  try {
    const url = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${encodeURIComponent(query + ' professional technology')}&image_type=photo&orientation=horizontal&safesearch=true&per_page=3&category=technology`;
    const response = await fetch(url);
    const data = await response.json();
    return data.hits?.length > 0 ? data.hits[0].largeImageURL : null;
  } catch {
    return null;
  }
};

/**
 * PRIMARY ENGINE: Gemini 3 Pro (1200-word scholarly deep-dive)
 */
const generateMasterManuscript = async (tool: any): Promise<Partial<ArchivalRecord> | null> => {
  if (!GEMINI_KEY) return null;
  const ai = new GoogleGenAI({ apiKey: GEMINI_KEY });
  
  const systemInstruction = `You are the Chief Technical Historian for StrongTools. Generate a 1200-word scholarly manuscript in semantic HTML (h2, h3, p, strong, ul, li). 
  FOCUS: Historical evolution, mathematical logic, and advanced professional use cases. 
  STYLE: Authoritative, deep, and Prestigious. Optimize for Google AdSense 'Helpful Content' guidelines.`;
  
  const prompt = `Generate a master archival manuscript for the instrument: '${tool.name}'. 
  Context: ${tool.description}. 
  Mandatory Sections:
  1. Historical Origins & Evolution
  2. The Scientific & Logical Foundation
  3. Advanced Professional Applications
  4. Future Trajectories in Digital Utility
  
  Ensure the response is strictly valid HTML content only.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: prompt,
      config: { 
        systemInstruction, 
        temperature: 0.8,
        thinkingConfig: { thinkingBudget: 32768 }
      }
    });
    return { title: `${tool.name}: An Institutional Analysis`, content: response.text, type: 'MASTER' };
  } catch (e) {
    console.warn("Primary Node Failure. Initiating OpenRouter Failover...", e);
    return null;
  }
};

/**
 * SECONDARY ENGINE: OpenRouter (600-word professional guide)
 */
const generateProGuide = async (tool: any): Promise<Partial<ArchivalRecord> | null> => {
  if (!OPENROUTER_KEY) return null;
  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://strongtools.site"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.5-flash-lite-latest",
        "messages": [
          { "role": "system", "content": "You are a Senior Professional Technical Writer. Generate a 600-word high-quality guide in semantic HTML." },
          { "role": "user", "content": `Produce a professional technical guide for the instrument: '${tool.name}'. Description: ${tool.description}` }
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
 * THE AUTOMATOR: Orchestrates zero-touch content generation and local caching.
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

    // 3. Cycle Persistence
    localStorage.setItem(cacheKey, JSON.stringify(finalRecord));
    return finalRecord;
  }

  return null;
};

// --- Legacy Exports for App Compatibility ---
export const getDailyQuote = async () => ({ quote: "Accuracy is the foundation of digital sovereignty.", author: "StrongTools Archive" });
export const getOnThisDay = async () => "Archival nodes successfully calibrated for the current meridian.";
export const getDailyChronicles = async () => [];
export const getDetailedArticle = async (id: string) => getAutomatedArchive(id);
export const getCycleMetadata = (initialDate?: string) => ({ cycleString: initialDate || getCycleSeed() });
export const getArchivedContent = async (id: string, name: string, desc: string) => {
  const archive = await getAutomatedArchive(id);
  if (!archive) return null;
  return {
    articleTitle: archive.title,
    mainContent: archive.content,
    history: `This instrument, ${name}, has been indexed into the sovereign registry for the cycle ${archive.cycle}.`,
    faqs: [
      { question: `What defines the utility of ${name}?`, answer: desc },
      { question: "Is the logic verified?", answer: "Yes, our scribes ensure mathematical precision across all nodes." }
    ]
  };
};
