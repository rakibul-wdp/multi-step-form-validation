"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FormValues, formSchema } from "./form-schema";
import { FormStep1 } from "./components/FormStep1";
import { FormStep2 } from "./components/FormStep2";
import { FormStep3 } from "./components/FormStep3";
import { SummaryStep } from "./components/SummaryStep";
import { FormNavigation } from "./components/FormNavigation";

async function submitForm(data: FormValues) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Form submitted:", data);
      resolve({ success: true });
    }, 1000);
  });
}

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting },
    trigger,
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      personalInfo: {
        fullName: "",
        email: "",
        phoneNumber: "",
      },
      addressDetails: {
        streetAddress: "",
        city: "",
        zipCode: "",
      },
      accountSetup: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    },
  });

  const mutation = useMutation({
    mutationFn: submitForm,
  });

  const onSubmit = (data: FormValues) => {
    mutation.mutate(data);
  };

  const onNext = async () => {
    let isValid = false;

    if (currentStep === 1) {
      isValid = await trigger("personalInfo");
    } else if (currentStep === 2) {
      isValid = await trigger("addressDetails");
    } else if (currentStep === 3) {
      isValid = await trigger("accountSetup");
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const onPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Multi-Step Form
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Step {currentStep} of {totalSteps}
          </p>
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
            <div
              className="bg-blue-600 h-2.5 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          {currentStep === 1 && <FormStep1 />}
          {currentStep === 2 && <FormStep2 />}
          {currentStep === 3 && <FormStep3 />}
          {currentStep === 4 && <SummaryStep />}

          <FormNavigation
            currentStep={currentStep}
            totalSteps={totalSteps}
            onPrev={onPrev}
            onNext={onNext}
            isSubmitting={mutation.isPending}
            isValid={isValid}
          />
        </form>

        {mutation.isSuccess && (
          <div className="mt-4 p-4 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded">
            Form submitted successfully!
          </div>
        )}

        {mutation.isError && (
          <div className="mt-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded">
            Error submitting form. Please try again.
          </div>
        )}
      </div>
    </div>
  );
}
