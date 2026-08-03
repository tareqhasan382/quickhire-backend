import { z } from "zod";
import {
  JOB_CATEGORIES,
  JOB_LOCATIONS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  JOB_STATUS,
  SALARY_CURRENCIES,
  SALARY_PERIODS,
} from "./job.constant";

const createJobZodSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters").max(120),
    company: z.string().min(2, "Company must be at least 2 characters").max(100),
    location: z.object({
      type: z.enum(JOB_LOCATIONS),
      city: z.string().optional(),
      country: z.string().optional(),
    }),
    category: z.enum(JOB_CATEGORIES),
    summary: z.string().max(300).optional(),
    description: z.string().min(20, "Description must be at least 20 characters"),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    employmentType: z.enum(EMPLOYMENT_TYPES),
    experienceLevel: z.enum(EXPERIENCE_LEVELS),
    salary: z.object({
      min: z.number().min(0),
      max: z.number().min(0),
      currency: z.enum(SALARY_CURRENCIES).default("USD"),
      period: z.enum(SALARY_PERIODS).default("year"),
    }),
    skills: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(JOB_STATUS).default("Active"),
    featured: z.boolean().optional(),
    deadline: z.coerce.date().optional(),
  }),
});

const updateJobZodSchema = z.object({
  body: z.object({
    title: z.string().min(3).max(120).optional(),
    company: z.string().min(2).max(100).optional(),
    location: z
      .object({
        type: z.enum(JOB_LOCATIONS),
        city: z.string().optional(),
        country: z.string().optional(),
      })
      .optional(),
    category: z.enum(JOB_CATEGORIES).optional(),
    summary: z.string().max(300).optional(),
    description: z.string().min(20).optional(),
    requirements: z.array(z.string()).optional(),
    responsibilities: z.array(z.string()).optional(),
    benefits: z.array(z.string()).optional(),
    employmentType: z.enum(EMPLOYMENT_TYPES).optional(),
    experienceLevel: z.enum(EXPERIENCE_LEVELS).optional(),
    salary: z
      .object({
        min: z.number().min(0),
        max: z.number().min(0),
        currency: z.enum(SALARY_CURRENCIES).default("USD"),
        period: z.enum(SALARY_PERIODS).default("year"),
      })
      .optional(),
    skills: z.array(z.string()).optional(),
    tags: z.array(z.string()).optional(),
    status: z.enum(JOB_STATUS).optional(),
    featured: z.boolean().optional(),
    deadline: z.coerce.date().optional(),
  }),
});

export const JobValidation = {
  createJobZodSchema,
  updateJobZodSchema,
};
