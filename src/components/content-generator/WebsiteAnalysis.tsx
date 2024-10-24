import React, { useState } from 'react';
import { Globe, Loader2, CheckCircle, XCircle } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';
import { Progress } from '../ui/ProgressBar';
import { GeneratorState } from '../../types/generator';

interface WebsiteAnalysisProps {
  state: GeneratorState;
  updateState: (updates: Partial<GeneratorState>) => void;
}

interface AnalysisStatus {
  sitemap: 'idle' | 'loading' | 'success' | 'error';
  scraping: 'idle' | 'loading' | 'success' | 'error';
  selection: 'idle' | 'loading' | 'success' | 'error';
}

export function WebsiteAnalysis({ state, updateState }: WebsiteAnalysisProps) {
  const [status, setStatus] = useState<AnalysisStatus>({
    sitemap: 'idle',
    scraping: 'idle',
    selection: 'idle'
  });
  const [progress, setProgress] = useState(0);
  const [availableUrls, setAvailableUrls] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleUrlSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      // Start sitemap analysis
      setStatus(prev => ({ ...prev, sitemap: 'loading' }));
      const sitemapUrls = await fetchSitemap(state.websiteUrl);
      setStatus(prev => ({ ...prev, sitemap: 'success' }));
      setProgress(33);

      // Start URL scraping
      setStatus(prev => ({ ...prev, scraping: 'loading' }));
      const scrapedUrls = await scrapeUrls(sitemapUrls);
      setAvailableUrls(scrapedUrls);
      setStatus(prev => ({ ...prev, scraping: 'success' }));
      setProgress(66);

      // Start AI selection
      setStatus(prev => ({ ...prev, selection: 'loading' }));
      const selectedUrls = await selectRelevantUrls(scrapedUrls);
      updateState({ selectedUrls });
      setStatus(prev => ({ ...prev, selection: 'success' }));
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setStatus({
        sitemap: 'error',
        scraping: 'error',
        selection: 'error'
      });
    }
  };

  const renderStatusIcon = (status: 'idle' | 'loading' | 'success' | 'error') => {
    switch (status) {
      case 'loading':
        return <Loader2 className="w-5 h-5 animate-spin text-blue-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Website Analysis</h2>
        <p className="text-gray-600">
          Enter your website URL to analyze its content and structure.
        </p>
      </div>

      <form onSubmit={handleUrlSubmit} className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="url"
              value={state.websiteUrl}
              onChange={(e) => updateState({ websiteUrl: e.target.value })}
              placeholder="https://example.com"
              className="pl-10"
              required
            />
          </div>
          <Button 
            type="submit" 
            disabled={!state.websiteUrl || status.sitemap === 'loading'}
          >
            Analyze
          </Button>
        </div>
      </form>

      {(status.sitemap !== 'idle' || error) && (
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {renderStatusIcon(status.sitemap)}
              <span>Analyzing sitemap</span>
            </div>
            <div className="flex items-center gap-2">
              {renderStatusIcon(status.scraping)}
              <span>Scraping URLs</span>
            </div>
            <div className="flex items-center gap-2">
              {renderStatusIcon(status.selection)}
              <span>Selecting relevant content</span>
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
              {error}
            </div>
          )}

          {state.selectedUrls.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-medium">Selected URLs for Analysis</h3>
              <ul className="space-y-1">
                {state.selectedUrls.map((url) => (
                  <li 
                    key={url}
                    className="flex items-center gap-2 text-sm text-gray-600"
                  >
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    {url}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper functions (implement these based on your backend services)
async function fetchSitemap(url: string): Promise<string[]> {
  // Implement sitemap fetching logic
  return [];
}

async function scrapeUrls(urls: string[]): Promise<string[]> {
  // Implement URL scraping logic
  return [];
}

async function selectRelevantUrls(urls: string[]): Promise<string[]> {
  // Implement AI selection logic
  return urls.slice(0, 8); // Maximum 8 URLs
}
