import React from 'react';

interface ProgressProps {
  steps: string[];
  currentStep: number;
  onStepClick: (step: number) => void;
}

export function Progress({ steps, currentStep, onStepClick }: ProgressProps) {
  return (
    <div className="flex gap-4 items-center">
      {steps.map((step, index) => (
        <React.Fragment key={step}>
          <button
            onClick={() => onStepClick(index)}
            className={`px-3 py-1 rounded ${
              currentStep === index ? 'bg-blue-500 text-white' : 'bg-gray-200'
            }`}
          >
            {step}
          </button>
          {index < steps.length - 1 && (
            <div className="h-[2px] flex-1 bg-gray-200" />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
