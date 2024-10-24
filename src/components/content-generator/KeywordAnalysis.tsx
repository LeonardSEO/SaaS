import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Loader2, 
  Plus, 
  X, 
  TrendingUp,
  Volume2,
  ArrowUpRight,
  AlertCircle
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Progress } from '../ui/ProgressBar';
import { GeneratorState } from '../../types/generator';

interface KeywordAnalysisProps {
  state: GeneratorState;
  updateState: (updates: Partial<GeneratorState>) => void;
}

interface KeywordData {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;
  trend: 'up' | 'down' | 'stable';
  selected?: boolean;
}

export function KeywordAnalysis({ state, updateState }: KeywordAnalysisProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestedKeywords, setSuggestedKeywords] = useState<KeywordData[]>([]);
  const [customKeyword, setCustomKeyword] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);

  useEffect(() => {
    if (state.mainKeyword && !suggestedKeywords.length) {
      handleKeywordAnalysis();
    }
  }, [state.mainKeyword]);

  const handleKeywordAnalysis = async () => {
    if (!state.mainKeyword) {
      setError('Please provide a main keyword');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysisProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setAnalysisProgress(prev => Math.min(prev + 10, 90));
      }, 500);

      // Get keyword suggestions from API
      const keywords = await getKeywordSuggestions(state.mainKeyword);
      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setSuggestedKeywords(keywords);
      
      // Automatically select top 5 relevant keywords
      const initialSelected = keywords.slice(0, 5).map(k => k.keyword);
      updateState({ additionalKeywords: initialSelected });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze keywords');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleKeywordSelection = (keyword: string) => {
    const currentKeywords = new Set(state.additionalKeywords);
    if (currentKeywords.has(keyword)) {
      currentKeywords.delete(keyword);
    } else {
      if (currentKeywords.size >= 10) {
        setError('Maximum 10 keywords can be selected');
        return;
      }
      currentKeywords.add(keyword);
    }
    updateState({ additionalKeywords: Array.from(currentKeywords) });
  };

  const addCustomKeyword = () => {
    if (!customKeyword) return;
    
    if (state.additionalKeywords.length >= 10) {
      setError('Maximum 10 keywords can be selected');
      return;
    }

    if (state.additionalKeywords.includes(customKeyword)) {
      setError('This keyword is already selected');
      return;
    }

    updateState({
      additionalKeywords: [...state.additionalKeywords, customKeyword]
    });
    setCustomKeyword('');
    setError(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Keyword Analysis</h2>
        <p className="text-gray-600">
          Analyze and select relevant keywords for your content.
        </p>
      </div>

      {/* Main Keyword Display */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          <Search className="w-5 h-5 text-blue-500" />
          <h3 className="font-medium">Main Keyword</h3>
        </div>
        <p className="text-blue-600 font-medium">{state.mainKeyword}</p>
      </div>

      {/* Analysis Progress */}
      {isLoading && (
        <div className="space-y-2">
          <Progress value={analysisProgress} className="w-full" />
          <p className="text-sm text-gray-600 flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Analyzing keywords...
          </p>
        </div>
      )}

      {/* Error Display */}
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Suggested Keywords */}
      {suggestedKeywords.length > 0 && (
        <div className="space-y-4">
          <h3 className="font-medium">Suggested Keywords</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {suggestedKeywords.map((kw) => (
              <div
                key={kw.keyword}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  state.additionalKeywords.includes(kw.keyword)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => toggleKeywordSelection(kw.keyword)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{kw.keyword}</span>
                  {kw.trend === 'up' && (
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  )}
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Volume2 className="w-4 h-4" />
                    {kw.searchVolume}
                  </span>
                  <span className="flex items-center gap-1">
                    <ArrowUpRight className="w-4 h-4" />
                    {kw.difficulty}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Custom Keyword Input */}
      <div className="space-y-2">
        <h3 className="font-medium">Add Custom Keyword</h3>
        <div className="flex gap-2">
          <Input
            value={customKeyword}
            onChange={(e) => setCustomKeyword(e.target.value)}
            placeholder="Enter custom keyword"
          />
          <Button
            onClick={addCustomKeyword}
            disabled={!customKeyword}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add
          </Button>
        </div>
      </div>

      {/* Selected Keywords */}
      {state.additionalKeywords.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-medium">Selected Keywords ({state.additionalKeywords.length}/10)</h3>
          <div className="flex flex-wrap gap-2">
            {state.additionalKeywords.map((keyword) => (
              <div
                key={keyword}
                className="flex items-center gap-2 bg-blue-50 text-blue-600 px-3 py-1 rounded-full"
              >
                <span className="text-sm">{keyword}</span>
                <button
                  onClick={() => toggleKeywordSelection(keyword)}
                  className="hover:text-red-500"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// Helper function (implement based on your API service)
async function getKeywordSuggestions(keyword: string): Promise<KeywordData[]> {
  // Implement DataForSEO API integration
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { keyword: keyword + ' guide', searchVolume: 1200, difficulty: 45, cpc: 0.8, trend: 'up' },
        { keyword: 'best ' + keyword, searchVolume: 2500, difficulty: 65, cpc: 1.2, trend: 'up' },
        { keyword: keyword + ' tutorial', searchVolume: 900, difficulty: 35, cpc: 0.5, trend: 'up' },
        // Add more mock data as needed
      ]);
    }, 2000);
  });
}
