"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "../../lib/utils";

// Linear Progress component
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// Steps Progress component
interface ProgressBarProps {
  steps: string[];
  currentStep: number;
  onStepClick?: (step: number) => void;
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ steps, currentStep, onStepClick }, ref) => {
    const progress = (currentStep / (steps.length - 1)) * 100;

    return (
      <div ref={ref} className="space-y-2">
        <Progress value={progress} />
        <div className="flex justify-between">
          {steps.map((step, index) => (
            <button
              key={step}
              onClick={() => onStepClick?.(index)}
              className={cn(
                "text-sm transition-colors",
                index <= currentStep
                  ? "text-primary font-medium"
                  : "text-muted-foreground",
                onStepClick && "cursor-pointer hover:text-primary"
              )}
            >
              {step}
            </button>
          ))}
        </div>
      </div>
    );
  }
);
ProgressBar.displayName = "ProgressBar";

export { Progress, ProgressBar };
