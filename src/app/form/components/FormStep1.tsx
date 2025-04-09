"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "../form-schema";

export function FormStep1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Full Name
        </label>
        <input
          id="fullName"
          {...register("personalInfo.fullName")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.personalInfo?.fullName && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.personalInfo.fullName.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("personalInfo.email")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.personalInfo?.email && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.personalInfo.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Phone Number
        </label>
        <input
          id="phoneNumber"
          type="tel"
          {...register("personalInfo.phoneNumber")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.personalInfo?.phoneNumber && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.personalInfo.phoneNumber.message}
          </p>
        )}
      </div>
    </div>
  );
}
