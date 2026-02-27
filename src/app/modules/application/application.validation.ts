import { z } from "zod";
export const createApplicationZodSchema = z.object({
  body: z.object({
    job_id: z.string().min(1, "Job ID is required"),
    name: z.string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Email must be a valid email address"),
    resume_link: z.string().url("Resume link must be a valid URL"),
    cover_note: z.string().max(1000, "Cover note must be less than 1000 characters").optional(),
  }),
});

export const ApplicationValidation = {
  createApplicationZodSchema,
};