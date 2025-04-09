import { z } from "zod";

export const formSchema = z.object({
  personalInfo: z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  }),
  addressDetails: z.object({
    streetAddress: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    zipCode: z
      .string()
      .min(5, "Zip code must be at least 5 digits")
      .regex(/^\d+$/, "Zip code must contain only numbers"),
  }),
  accountSetup: z
    .object({
      username: z.string().min(4, "Username must be at least 4 characters"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      confirmPassword: z.string().min(6, "Passwords must match"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    }),
});

export type FormValues = z.infer<typeof formSchema>;
