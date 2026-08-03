import { z } from "zod";
import { COMPANY_INDUSTRIES, COMPANY_SIZES, COMPANY_STATUS, COMPANY_PLANS } from "./company.constant";

const createCompanyZodSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name must be at most 100 characters"),
    logo: z.string().url("Logo must be a valid URL").optional(),
    industry: z.enum(COMPANY_INDUSTRIES),
    location: z.string().min(2, "Location must be at least 2 characters").max(100),
    website: z.string().url("Website must be a valid URL").optional(),
    size: z.enum(COMPANY_SIZES),
    founded: z.number().int().min(1800).max(2100).optional(),
    description: z.string().min(20, "Description must be at least 20 characters").max(5000),
    benefits: z.array(z.string().max(200)).optional(),
    tags: z.array(z.string().max(50)).optional(),
  }),
});

const updateCompanyZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    logo: z.string().url().optional(),
    industry: z.enum(COMPANY_INDUSTRIES).optional(),
    location: z.string().min(2).max(100).optional(),
    website: z.string().url().optional(),
    size: z.enum(COMPANY_SIZES).optional(),
    founded: z.number().int().min(1800).max(2100).optional(),
    description: z.string().min(20).max(5000).optional(),
    benefits: z.array(z.string().max(200)).optional(),
    tags: z.array(z.string().max(50)).optional(),
    verified: z.boolean().optional(),
    featured: z.boolean().optional(),
    status: z.enum(COMPANY_STATUS).optional(),
    plan: z.enum(COMPANY_PLANS).optional(),
  }),
});

export const CompanyValidation = {
  createCompanyZodSchema,
  updateCompanyZodSchema,
};
