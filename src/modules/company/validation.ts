import { z, ZodType } from "zod";

export class CompanyValidation {
  static readonly CREATE: ZodType = z.object({
    name: z.string().min(1).max(100),
    location: z.string().min(1).max(100),
    logoUrl: z.string().optional().optional(),
    websiteUrl: z.string().url().optional(),
    industry: z.string().min(1).max(100),
  });

  static readonly UPDATE: ZodType = z.object({
    name: z.string().min(1).max(100).optional(),
    location: z.string().min(1).max(100).optional(),
    logoUrl: z.string().optional().optional(),
    websiteUrl: z.string().url().optional(),
    industry: z.string().min(1).max(100).optional(),
  });
}
