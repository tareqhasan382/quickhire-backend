import { z } from "zod";
import { JOB_CATEGORIES, JOB_LOCATIONS } from "./job.constant";


// Schema for creating a job
export const createJobZodSchema = z.object({
  body: z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    company: z.string().min(2, "Company must be at least 2 characters"),
    location: z.object({
      type: z.enum(JOB_LOCATIONS), // use enum values
      city: z.string().optional(),
      country: z.string().optional(),
    }),
    category: z.enum(JOB_CATEGORIES), // use enum values
    description: z.string().min(20, "Description must be at least 20 characters"),
  }),
});

export const JobValidation = { createJobZodSchema };