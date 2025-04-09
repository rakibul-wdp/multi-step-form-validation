"use client";

import { useFormContext } from "react-hook-form";
import { FormValues } from "../form-schema";

export function SummaryStep() {
  const { watch } = useFormContext<FormValues>();
  const formData = watch();

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Personal Information
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Full Name:</span>{" "}
            {formData.personalInfo.fullName}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Email:</span>{" "}
            {formData.personalInfo.email}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Phone Number:</span>{" "}
            {formData.personalInfo.phoneNumber}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Address Details
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Street Address:</span>{" "}
            {formData.addressDetails.streetAddress}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">City:</span>{" "}
            {formData.addressDetails.city}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Zip Code:</span>{" "}
            {formData.addressDetails.zipCode}
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow rounded-lg px-6">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
          Account Setup
        </h3>
        <div className="space-y-2">
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Username:</span>{" "}
            {formData.accountSetup.username}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            <span className="font-medium">Password:</span> ********
          </p>
        </div>
      </div>
    </div>
  );
}
