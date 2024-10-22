import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { fetchSitemapAndExtractURLs, filterURLs } from '../utils/sitemapScraper';
import { generateContentFromBackend } from '../services/contentService';

interface ContentForm {
  sitemapUrl: string;
  mainKeyword: string;
  contentType: string;
  language: string;
  businessName: string;
  businessType: string;
  country: string;
  tone: string;
  claudeTemperature: number;
}

const ContentTools: React.FC = () => {
  const [scrapedUrls, setScrapedUrls] = useState<string[]>([]);
  const [selectedUrls, setSelectedUrls] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const { register, handleSubmit, watch } = useForm<ContentForm>();

  useEffect(() => {
    // Load any saved settings or previously scraped URLs
    // This could be from localStorage or a state management solution like Redux
  }, []);

  const onScrapeUrls = async (sitemapUrl: string) => {
    setIsLoading(true);
    setError(null);
    setScrapedUrls([]);
    try {
      const urls = await fetchSitemapAndExtractURLs(sitemapUrl);
      const filteredUrls = filterURLs(urls);
      setScrapedUrls(filteredUrls);
      if (filteredUrls.length === 0) {
        setError('No valid URLs found in the sitemap.');
      }
    } catch (err) {
      if (err instanceof Error && err.message.includes('sitemap index')) {
        setError(err.message);
      } else {
        setError(`Failed to scrape URLs: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const onGenerateContent = async (data: ContentForm) => {
    setIsLoading(true);
    setError(null);
    try {
      const content = await generateContentFromBackend({
        urls: selectedUrls,
        ...data
      });
      setGeneratedContent(content);
    } catch (err) {
      setError('Failed to generate content. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlSelection = (url: string) => {
    setSelectedUrls(prev => 
      prev.includes(url) ? prev.filter(u => u !== url) : [...prev, url]
    );
  };

  const filteredUrls = scrapedUrls.filter(url => 
    url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Content Tools</h1>
      
      {/* Sitemap URL input and scrape button */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter sitemap URL"
          className="w-full p-2 border rounded"
          {...register('sitemapUrl', { required: 'Sitemap URL is required' })}
        />
        <button 
          onClick={() => onScrapeUrls(watch('sitemapUrl'))}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
          disabled={isLoading}
        >
          Scrape URLs
        </button>
      </div>

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Loading indicator */}
      {isLoading && <p className="mt-4">Loading...</p>}

      {/* Display scraped URLs */}
      {scrapedUrls.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold mb-2">Scraped URLs</h2>
          <input
            type="text"
            placeholder="Search URLs"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="max-h-60 overflow-y-auto">
            {filteredUrls.map(url => (
              <label key={url} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedUrls.includes(url)}
                  onChange={() => handleUrlSelection(url)}
                  className="mr-2"
                />
                {url}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Content generation form */}
      <form onSubmit={handleSubmit(onGenerateContent)} className="space-y-4">
        <input {...register('mainKeyword', { required: 'Main keyword is required' })} placeholder="Main Keyword" className="w-full p-2 border rounded" />
        <select {...register('contentType', { required: 'Content type is required' })} className="w-full p-2 border rounded">
          <option value="">Select Content Type</option>
          <option value="listicle">Listicle</option>
          <option value="product-reviews">Product reviews</option>
          <option value="informational">Informational</option>
          <option value="history-of">History of</option>
          <option value="pros-and-cons">Pro's and Con's</option>
          <option value="comparisons">Comparisons</option>
          <option value="how-to">How to's</option>
          <option value="versus">Versus (Brand A vs. Brand B)</option>
          <option value="best-for">Best for articles</option>
          <option value="brand-roundup">Brand roundup</option>
        </select>
        <input {...register('language', { required: 'Language is required' })} placeholder="Language" className="w-full p-2 border rounded" />
        <input {...register('businessName', { required: 'Business name is required' })} placeholder="Business Name" className="w-full p-2 border rounded" />
        <input {...register('businessType', { required: 'Business type is required' })} placeholder="Business Type" className="w-full p-2 border rounded" />
        <input {...register('country', { required: 'Country is required' })} placeholder="Country" className="w-full p-2 border rounded" />
        <input {...register('tone', { required: 'Tone is required' })} placeholder="Tone" className="w-full p-2 border rounded" />
        <input 
          type="number" 
          step="0.1" 
          min="0" 
          max="2" 
          {...register('claudeTemperature', { required: 'Temperature is required', min: 0, max: 2 })} 
          placeholder="Claude Temperature (0-2)" 
          className="w-full p-2 border rounded" 
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded" disabled={isLoading}>
          Generate Content
        </button>
      </form>

      {/* Display generated content */}
      {generatedContent && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Generated Content</h2>
          <textarea 
            value={generatedContent} 
            readOnly 
            className="w-full h-60 p-2 border rounded" 
          />
          <button 
            onClick={() => navigator.clipboard.writeText(generatedContent)}
            className="mt-2 bg-blue-500 text-white p-2 rounded"
          >
            Copy to Clipboard
          </button>
        </div>
      )}

      {/* Error message */}
      {error && <p className="text-red-500 mt-4">{error}</p>}

      {/* Loading indicator */}
      {isLoading && <p className="mt-4">Loading...</p>}
    </div>
  );
};

export default ContentTools;
