import { Check } from 'lucide-react';

interface ProgressStepperProps {
  currentStep: number;
  totalSteps?: number;
}

export function ProgressStepper({ currentStep, totalSteps = 3 }: ProgressStepperProps) {
  const steps = [
    { number: 1, label: 'Details' },
    { number: 2, label: 'Role' },
    { number: 3, label: 'Broker' },
  ];

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-semibold text-gray-400">
        <span className="text-purple-300">Step {currentStep} of {totalSteps}</span>
        <span>{steps[currentStep - 1]?.label}</span>
      </div>

      <div className="flex items-center gap-2">
        {steps.map((step) => {
          const isCompleted = step.number < currentStep;
          const isCurrent = step.number === currentStep;

          return (
            <div key={step.number} className="flex-1 flex items-center gap-2">
              <div
                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                  isCompleted || isCurrent
                    ? 'bg-gradient-to-r from-purple-600 to-indigo-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]'
                    : 'bg-white/10'
                }`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
