import { z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  ownerType: z.enum(["user", "organization"]),

  role: z.enum(["ceo", "hr", "captain", "senior", "junior"]).optional(),

  phone: z.string().optional(),

  occupation: z.string().optional(),
});

export type SignupInput = z.infer<typeof signupSchema>;
