import React, { useState, useEffect } from 'react';
import { 
  Loader2, 
  Copy, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle,
  Sparkles,
  Download,
  History
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Progress } from '../ui/ProgressBar';
import { Textarea } from '../ui/Textarea';
import { GeneratorState } from '../../types/generator';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../ui/Tabs';

interface ContentGenerationProps {
  state: GeneratorState;
}

interface GeneratedVersion {
  id: string;
  content: string;
  timestamp: Date;
}

export function ContentGeneration({ state }: ContentGenerationProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [currentContent, setCurrentContent] = useState<string>('');
  const [versions, setVersions] = useState<GeneratedVersion[]>([]);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied'>('idle');
  const [currentTip, setCurrentTip] = useState(0);

  const tips = [
    'Analyzing your website content...',
    'Incorporating your brand voice...',
    'Optimizing for selected keywords...',
    'Applying content structure...',
    'Finalizing your content...'
  ];

  useEffect(() => {
    if (isGenerating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 2;
        });
        setCurrentTip(prev => (prev + 1) % tips.length);
      }, 800);

      return () => clearInterval(interval);
    }
  }, [isGenerating]);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    setProgress(0);

    try {
      const content = await generateContent(state);
      setCurrentContent(content);
      setVersions(prev => [{
        id: Date.now().toString(),
        content,
        timestamp: new Date()
      }, ...prev]);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
      setProgress(100);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopyStatus('copied');
      setTimeout(() => setCopyStatus('idle'), 2000);
    } catch (err) {
      setError('Failed to copy content');
    }
  };

  const handleDownload = () => {
    const blob = new Blob([currentContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `generated-content-${new Date().toISOString()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium mb-2">Content Generation</h2>
        <p className="text-gray-600">
          Generate your content based on the configured settings.
        </p>
      </div>

      {!currentContent && !isGenerating && (
        <Button
          onClick={handleGenerate}
          className="w-full flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Generate Content
        </Button>
      )}

      {isGenerating && (
        <div className="space-y-4">
          <Progress value={progress} className="w-full" />
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Loader2 className="w-4 h-4 animate-spin" />
            <p>{tips[currentTip]}</p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
          <AlertCircle className="w-4 h-4" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {currentContent && !isGenerating && (
        <Tabs value="current">
          <TabsList>
            <TabsTrigger value="current" onClick={() => {}} isActive={false}>Current Version</TabsTrigger>
            <TabsTrigger value="history" onClick={() => {}} isActive={false}>History</TabsTrigger>
          </TabsList>

          <TabsContent value="current" activeValue="current">
            <div className="relative space-y-4">
              <Textarea
                value={currentContent}
                readOnly
                className="min-h-[400px] font-mono text-sm"
              />
              <div className="absolute top-2 right-2 space-x-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleCopy}
                  className="flex items-center gap-2"
                >
                  {copyStatus === 'copied' ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                  {copyStatus === 'copied' ? 'Copied!' : 'Copy'}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleDownload}
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={handleGenerate}
                  className="flex items-center gap-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  Regenerate
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" activeValue="current">
            <div className="space-y-4">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="p-4 border rounded-lg space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {version.timestamp.toLocaleString()}
                    </span>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setCurrentContent(version.content)}
                    >
                      <History className="w-4 h-4" />
                      Restore
                    </Button>
                  </div>
                  <Textarea
                    value={version.content.slice(0, 200) + '...'}
                    readOnly
                    className="text-sm"
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}

// Helper function (implement based on your AI service)
async function generateContent(state: GeneratorState): Promise<string> {
  // Implement AI content generation logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Generated content based on:
- Main keyword: ${state.mainKeyword}
- Business: ${state.businessInfo.name}
- Tone: ${state.toneOfVoice}
- Keywords: ${state.additionalKeywords.join(', ')}
      `);
    }, 5000);
  });
}
