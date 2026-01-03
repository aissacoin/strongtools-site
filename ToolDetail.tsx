import React, { useState, useEffect, useCallback } from 'react';
import { TOOLS } from "./constants";
import { renderToolLogic } from './Home';
import { getAutomatedArchive } from "./geminiService";
import { 
  ArrowLeft, 
  Loader2, 
  History, 
  HelpCircle, 
  Zap,
  AlertTriangle,
  Activity,
  Sparkles,
  ScrollText
} from 'lucide-react';

interface ToolDetailProps {
  id: string;
  initialDate?: string;
}

const PIXABAY_KEY = '48924033-0c30626359e86566498506253';

// Fixed date function to avoid "Permission Denied" errors in some browsers
const getSafeCycleMetadata = (date?: string) => {
  const targetDate = date ? new Date(date) : new Date();
  return {
    cycleString: targetDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  };
};

export const ToolDetail: React.FC<ToolDetailProps> = ({ id, initialDate }) => {
  const tool = TOOLS.find(t => t.id === id);
  const { cycleString } = getSafeCycleMetadata(initialDate);
  
  const [archiveData, setArchiveData] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArchive = useCallback(async () => {
    if (!tool) return;
    setIsLoading(true);
    setError(null);

    try {
      // Fetching AI generated content via Gemini
      const data = await getAutomatedArchive(tool.id, tool.name, tool.description);
      if (!data) throw new Error("Synchronization protocol failed.");
      setArchiveData(data);

      // Fetching visual assets via Pixabay
      const query = encodeURIComponent(`${tool.name} technology`);
      const pixabayUrl = `https://pixabay.com/api/?key=${PIXABAY_KEY}&q=${query}&image_type=photo&
