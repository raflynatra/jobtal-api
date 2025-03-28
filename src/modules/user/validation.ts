import { z, ZodType } from "zod";

export class UserValidation {
  static readonly CREATE: ZodType = z.object({
    email: z.string().email().min(1).max(100),
    name: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    password: z.string().min(1).max(100).optional(),
    fullName: z.string().min(1).max(100).optional(),
    avatarUrl: z.string().optional(),
    phone: z.string().optional(),
  });
}
