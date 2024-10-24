import React, { useState } from 'react';
import { WebsiteAnalysis } from '../components/content-generator/WebsiteAnalysis';
import { ContentConfiguration } from '../components/content-generator/ContentConfiguration';
import { ToneAnalysis } from '../components/content-generator/ToneAnalysis';
import { KeywordAnalysis } from '../components/content-generator/KeywordAnalysis';
import { ContentGeneration } from '../components/content-generator/ContentGeneration';
import { Progress as ProgressBar } from '../components/ui/Progress';
import { Button } from '../components/ui/Button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GeneratorState {
  websiteUrl: string;
  selectedUrls: string[];
  mainKeyword: string;
  businessInfo: {
    name: string;
    type: string;
    description: string;
  };
  additionalKeywords: string[];
  uploadedFiles: File[];
  externalLinks: string[];
  contentType: string;
  specialInstructions: string;
  toneOfVoice: string;
  analyzedTone: string;
}

const steps = [
  'Website Analysis',
  'Content Configuration',
  'Tone of Voice',
  'Keyword Analysis',
  'Generation'
];

export default function AIGenerator() {
  const [currentStep, setCurrentStep] = useState(0);
  const [state, setState] = useState<GeneratorState>({
    websiteUrl: '',
    selectedUrls: [],
    mainKeyword: '',
    businessInfo: {
      name: '',
      type: '',
      description: ''
    },
    additionalKeywords: [],
    uploadedFiles: [],
    externalLinks: [],
    contentType: '',
    specialInstructions: '',
    toneOfVoice: '',
    analyzedTone: ''
  });

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const updateState = (updates: Partial<GeneratorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">AI Content Generator</h1>
        <ProgressBar 
          steps={steps} 
          currentStep={currentStep} 
          onStepClick={setCurrentStep}
        />
      </div>

      <div className="bg-white rounded-lg shadow-lg p-6">
        {currentStep === 0 && (
          <WebsiteAnalysis 
            state={state} 
            updateState={updateState}
          />
        )}
        {currentStep === 1 && (
          <ContentConfiguration 
            state={state} 
            updateState={updateState}
          />
        )}
        {currentStep === 2 && (
          <ToneAnalysis 
            state={state} 
            updateState={updateState}
          />
        )}
        {currentStep === 3 && (
          <KeywordAnalysis 
            state={state} 
            updateState={updateState}
          />
        )}
        {currentStep === 4 && (
          <ContentGeneration 
            state={state}
          />
        )}

        <div className="flex justify-between mt-6">
          <Button
            onClick={handleBack}
            disabled={currentStep === 0}
            variant="outline"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            className="flex items-center gap-2"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
