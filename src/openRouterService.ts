import { TOOLS } from './constants';

// Use Vite-specific environment variable handling
const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_KEY || "";

export interface BatchArticle {
  toolId: string;
  title: string;
  content: string;
  summary: string;
}

/**
 * StrongTools OpenRouter Integration
 * Handles high-velocity generation of scholarly articles for AdSense optimization.
 */
export const generateDailyBatch = async (): Promise<BatchArticle[]> => {
  if (!OPENROUTER_API_KEY) {
    console.error("OpenRouter Security Protocol: API key is missing. Batch generation aborted.");
    return [];
  }

  // Select 10 instruments based on current chronological cycle for daily variety
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000);
  const selectedTools = Array.from({ length: 10 }).map((_, i) => {
    const index = (dayOfYear + i) % TOOLS.length;
    return TOOLS[index];
  });

  const toolPromptList = selectedTools.map(t => `'${t.name}' (ID: ${t.id}): ${t.description}`).join('\n');

  const systemInstruction = `You are a Senior Technical Writer for StrongTools. 
  STYLE: Formal, efficient, and scholarly. 
  PURPOSE: Generate unique, high-quality HTML manuscripts optimized for global search engine visibility and user utility.
  LANGUAGE: Professional English only.`;

  const prompt = `Generate 10 distinct professional articles (approximately 600 words each) for these instruments:
  ${toolPromptList}

  REQUIREMENTS:
  1. Each manuscript must be unique, authoritative, and structured for professionals.
  2. Use semantic HTML5 (h2, h3, p, strong) for the content field.
  3. Deliver the output as a strictly valid JSON ARRAY of 10 objects.
  
  JSON SCHEMA:
  [{
    "toolId": "string",
    "title": "Professional SEO-optimized English title",
    "content": "HTML formatted string",
    "summary": "Brief 20-word technical abstract"
  }]`;

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "https://strongtools.site",
        "X-Title": "StrongTools Global Archive",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-001",
        "messages": [
          { "role": "system", "content": systemInstruction },
          { "role": "user", "content": prompt }
        ],
        "response_format": { "type": "json_object" }
      })
    });

    const result = await response.json();
    const contentText = result.choices[0]?.message?.content;

    if (!contentText) throw new Error("Null response from OpenRouter Node.");

    // Clean up AI markdown artifacts
    const cleanedJson = contentText.replace(/```json|```/gi, "").trim();
    const parsed = JSON.parse(cleanedJson);

    return Array.isArray(parsed) ? parsed : (parsed.articles || parsed.data || []);

  } catch (error) {
    console.error("Critical System Failure: Batch Generation Protocol Interrupted.", error);
    
    // Failover Response: Provides functional fallback content in professional English
    return selectedTools.map(t => ({
      toolId: t.id,
      title: `${t.name}: Professional Utility Metrics`,
      content: `<h2>Executive Overview</h2><p>The ${t.name} protocol is a core component of the StrongTools archival vault, engineered for mathematical precision and professional efficiency.</p>`,
      summary: "Institutional failover summary for technical instrument diagnostics."
    }));
  }
};
