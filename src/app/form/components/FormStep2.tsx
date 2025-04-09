"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "../form-schema";

export function FormStep2() {
  const {
    register,
    formState: { errors },
  } = useFormContext<FormValues>();

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="streetAddress"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Street Address
        </label>
        <input
          id="streetAddress"
          {...register("addressDetails.streetAddress")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.addressDetails?.streetAddress && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.addressDetails.streetAddress.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="city"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          City
        </label>
        <input
          id="city"
          {...register("addressDetails.city")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.addressDetails?.city && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.addressDetails.city.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="zipCode"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Zip Code
        </label>
        <input
          id="zipCode"
          {...register("addressDetails.zipCode")}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
        {errors.addressDetails?.zipCode && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
            {errors.addressDetails.zipCode.message}
          </p>
        )}
      </div>
    </div>
  );
}
