"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
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

  const methods = useForm<FormValues>({
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
    let fieldsToValidate: (keyof FormValues)[] = [];

    if (currentStep === 1) fieldsToValidate = ["personalInfo"];
    if (currentStep === 2) fieldsToValidate = ["addressDetails"];
    if (currentStep === 3) fieldsToValidate = ["accountSetup"];

    if (currentStep === 3) {
      fieldsToValidate = ["personalInfo", "addressDetails", "accountSetup"];
    }

    const isValid = await methods.trigger(fieldsToValidate);

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    }
  };

  const onPrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const isCurrentStepValid = () => {
    if (currentStep === 4) return true;

    const values = methods.getValues();
    try {
      if (currentStep === 1) {
        formSchema.pick({ personalInfo: true }).parse(values);
        return true;
      }
      if (currentStep === 2) {
        formSchema.pick({ addressDetails: true }).parse(values);
        return true;
      }
      if (currentStep === 3) {
        formSchema.pick({ accountSetup: true }).parse(values);
        return true;
      }
      return false;
    } catch {
      return false;
    }
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

        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
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
              isValid={isCurrentStepValid()}
            />
          </form>
        </FormProvider>

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
