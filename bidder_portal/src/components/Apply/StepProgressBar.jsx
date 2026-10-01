import { Check, Lock } from "lucide-react";
import "./StepProgressBar.css";

const steps = [
  "Pay Fee",
  "Instructions",
  "Technical Docs",
  "Financial Bid",
  "Review",
];

export default function StepProgressBar({
  currentStep,
  maxStepReached,
  onStepClick,
}) {
  return (
    <ol className="apply-progress" aria-label="Application progress">
      {steps.map((label, index) => {
        const stepNumber = index + 1;
        const isCompleted = stepNumber < currentStep;
        const isActive = stepNumber === currentStep;
        const isLocked = stepNumber > maxStepReached;

        return (
          <li
            key={label}
            className={`apply-progress-step ${isCompleted ? "is-completed" : ""} ${isActive ? "is-active" : ""} ${isLocked ? "is-locked" : ""}`}
          >
            {index > 0 && (
              <span className="apply-progress-line" aria-hidden="true" />
            )}
            <button
              type="button"
              className="apply-progress-circle"
              disabled={isLocked}
              aria-current={isActive ? "step" : undefined}
              aria-label={`${label}${isLocked ? ", locked" : ""}`}
              onClick={isLocked ? undefined : () => onStepClick(stepNumber)}
            >
              {isCompleted ? (
                <Check size={16} />
              ) : isLocked ? (
                <Lock size={14} />
              ) : (
                stepNumber
              )}
            </button>
            <span>{label}</span>
          </li>
        );
      })}
    </ol>
  );
}
