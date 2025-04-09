"use client";

import { Button } from "@/components/ui/button";

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrev: () => void;
  onNext: () => void;
  isSubmitting: boolean;
  isValid: boolean;
}

export function FormNavigation({
  currentStep,
  totalSteps,
  onPrev,
  onNext,
  isSubmitting,
  isValid,
}: FormNavigationProps) {
  return (
    <div className="flex justify-between mt-8">
      {currentStep > 1 ? (
        <Button
          type="button"
          onClick={onPrev}
          variant="outline"
          className="bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 px-3 py-2 cursor-pointer"
        >
          Previous
        </Button>
      ) : (
        <div></div>
      )}
      {currentStep < totalSteps && (
        <Button
          type="button"
          onClick={onNext}
          disabled={!isValid}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 px-3 py-2 cursor-pointer"
        >
          Next
        </Button>
      )}
      {currentStep === totalSteps && (
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-green-600 hover:bg-green-700 disabled:opacity-50 px-3 py-2 cursor-pointer"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      )}
    </div>
  );
}
