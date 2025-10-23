import { z } from "zod";

// Schema  edit user
export const userSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .nonempty("Name is required"),
    email: z
        .email('Invalid email address')
        .nonempty("Email is required"),
    phone: z
        .string()
        .nonempty("Phone is required"),
    company: z.object({
        name: z.string().min(1, "Company name is required"),
    })
});

// Type user
export type UserFormData = z.infer<typeof userSchema>;