import { z } from "zod";

// Schema  login
export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(5, "Password must be at least 5 characters"),
});

// Type login
export type LoginFormData = z.infer<typeof loginSchema>;