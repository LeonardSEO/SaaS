import React, { useState } from 'react';
import { 
  MessageSquare, 
  Loader2, 
  Wand2,
  AlertCircle,
  CheckCircle 
} from 'lucide-react';
import { Button } from '../ui/Button';
import { Textarea } from '../ui/Textarea';
import { RadioGroup, RadioGroupItem } from '../ui/RadioGroup';
import { Label } from '../ui/Label';
import { GeneratorState } from '../../types/generator';

interface ToneAnalysisProps {
  state: GeneratorState;
  updateState: (updates: Partial<GeneratorState>) => void;
}

const TONE_EXAMPLES = {
  professional: 'Clear, authoritative, and trustworthy',
  casual: 'Friendly, approachable, and conversational',
  enthusiastic: 'Energetic, positive, and engaging',
  technical: 'Detailed, precise, and informative',
  persuasive: 'Compelling, convincing, and action-oriented'
};

export function ToneAnalysis({ state, updateState }: ToneAnalysisProps) {
  const [analysisMethod, setAnalysisMethod] = useState<'manual' | 'ai'>('manual');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sampleText, setSampleText] = useState('');

  const handleToneSelect = (tone: string) => {
    updateState({ toneOfVoice: tone });
  };

  const handleAnalyzeText = async () => {
    if (!sampleText) {
      setError('Please provide a sample text to analyze');
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const analyzedTone = await analyzeToneWithAI(sampleText);
      updateState({ 
        analyzedTone,
        toneOfVoice: analyzedTone // Automatically set the tone based on analysis
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze tone');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-medium mb-2">Tone of Voice</h2>
        <p className="text-gray-600">
          Define the tone of voice for your content by either selecting a preset style or analyzing existing content.
        </p>
      </div>

      {/* Method Selection */}
      <div className="space-y-4">
        <RadioGroup
          value={analysisMethod}
          onValueChange={(value: 'manual' | 'ai') => setAnalysisMethod(value)}
          className="flex space-x-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="manual" id="manual" />
            <Label htmlFor="manual">Manual Selection</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="ai" id="ai" />
            <Label htmlFor="ai">AI Analysis</Label>
          </div>
        </RadioGroup>
      </div>

      {/* Manual Selection */}
      {analysisMethod === 'manual' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(TONE_EXAMPLES).map(([tone, description]) => (
              <div
                key={tone}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  state.toneOfVoice === tone
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200'
                }`}
                onClick={() => handleToneSelect(tone)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium capitalize">{tone}</h3>
                  {state.toneOfVoice === tone && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI Analysis */}
      {analysisMethod === 'ai' && (
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="w-4 h-4 text-gray-400" />
              <h3 className="font-medium">Sample Content</h3>
            </div>
            <Textarea
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              placeholder="Paste a sample of existing content to analyze its tone..."
              rows={6}
            />
          </div>

          <Button
            onClick={handleAnalyzeText}
            disabled={isAnalyzing || !sampleText}
            className="w-full flex items-center justify-center gap-2"
          >
            {isAnalyzing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Wand2 className="w-4 h-4" />
            )}
            {isAnalyzing ? 'Analyzing...' : 'Analyze Tone'}
          </Button>

          {error && (
            <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded">
              <AlertCircle className="w-4 h-4" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {state.analyzedTone && (
            <div className="bg-green-50 p-4 rounded">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h4 className="font-medium">Analysis Complete</h4>
              </div>
              <p className="text-sm text-gray-600">
                The content has a <span className="font-medium">{state.analyzedTone}</span> tone.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Helper function (implement based on your AI service)
async function analyzeToneWithAI(text: string): Promise<string> {
  // Implement AI tone analysis logic
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('professional'); // Dummy response
    }, 2000);
  });
}
