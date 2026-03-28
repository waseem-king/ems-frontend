import { email, z } from "zod";

export const signupSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),

  email: z.string().email("Invalid email"),

  password: z.string().min(6, "Password must be at least 6 characters"),

  organization: z.string().min(6, "ORganization must be greater then 6 charactors").optional(),

  ownerType: z.enum(["user", "organization"]),

  role: z.enum(["ceo", "hr", "captain", "senior", "junior"]).optional(),

  employeeEmail: z.string().email("Invalid email").optional(),

  about: z.string().optional(),

  defaultCurrency:z.string(),
  
  phone: z.string().optional(),

  occupation: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email("Invalid"),
  password: z.string().min(6, "Password must be at least 6 charactors")
})

export type SignupInput = z.infer<typeof signupSchema>;
export type LoginInput = z.infer<typeof loginSchema>;