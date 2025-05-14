"use client";

import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface StepperProps {
  steps: { title: string; description?: string }[];
  currentStep: number;
  onStepClick?: (stepIndex: number) => void;
  className?: string;
}

export function Stepper({ steps, currentStep, onStepClick, className }: StepperProps) {
  return (
    <nav aria-label="Progress" className={cn("flex items-center justify-center", className)}>
      <ol role="list" className="flex items-center space-x-2 sm:space-x-4 w-full max-w-2xl">
        {steps.map((step, stepIdx) => (
          <li key={step.title} className={cn("flex-1", stepIdx !== steps.length -1 ? "pr-2 sm:pr-4 relative" : "")}>
            {currentStep > stepIdx ? (
              <div
                className={cn(
                  "group flex w-full flex-col items-center",
                  onStepClick ? "cursor-pointer" : ""
                )}
                onClick={() => onStepClick?.(stepIdx)}
              >
                <span className="flex items-center">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-accent">
                    <Check className="h-6 w-6 text-accent-foreground" aria-hidden="true" />
                  </span>
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-accent text-center">{step.title}</span>
                 {stepIdx !== steps.length - 1 ? (
                  <div className="absolute right-0 top-5 h-0.5 w-full -translate-x-1/2 transform bg-accent" aria-hidden="true" />
                ) : null}
              </div>
            ) : currentStep === stepIdx ? (
              <div
                className={cn(
                  "flex w-full flex-col items-center",
                  onStepClick ? "cursor-pointer" : ""
                )}
                aria-current="step"
                onClick={() => onStepClick?.(stepIdx)}
              >
                <span className="flex items-center">
                  <span className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center">
                    <span className="absolute h-4 w-4 rounded-full bg-accent" aria-hidden="true" />
                    <span
                      className="relative block h-8 w-8 animate-pulse rounded-full border-2 border-accent"
                      aria-hidden="true"
                    />
                  </span>
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-accent text-center">{step.title}</span>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute right-0 top-5 h-0.5 w-full -translate-x-1/2 transform bg-border" aria-hidden="true" />
                ) : null}
              </div>
            ) : (
              <div
                className={cn(
                  "group flex w-full flex-col items-center",
                  onStepClick ? "cursor-pointer" : ""
                )}
                onClick={() => onStepClick?.(stepIdx)}
              >
                <span className="flex items-center">
                  <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border-2 border-border">
                    <span className="h-3 w-3 rounded-full bg-transparent group-hover:bg-muted" />
                  </span>
                </span>
                <span className="mt-2 text-xs sm:text-sm font-medium text-muted-foreground text-center">{step.title}</span>
                {stepIdx !== steps.length - 1 ? (
                  <div className="absolute right-0 top-5 h-0.5 w-full -translate-x-1/2 transform bg-border" aria-hidden="true" />
                ) : null}
              </div>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
