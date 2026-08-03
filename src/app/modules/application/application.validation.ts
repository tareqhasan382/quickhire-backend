import { z } from "zod";
import { APPLICATION_STATUS } from "./application.constant";

export const createApplicationZodSchema = z.object({
  body: z.object({
    job_id: z.string().min(1, "Job ID is required"),
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters"),
    email: z.string().email("Email must be a valid email address"),
    resume_link: z.string().url("Resume link must be a valid URL"),
    cover_note: z.string().max(1000, "Cover note must be less than 1000 characters").optional(),
  }),
});

export const updateApplicationZodSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(100).optional(),
    email: z.string().email().optional(),
    resume_link: z.string().url().optional(),
    cover_note: z.string().max(1000).optional(),
    status: z.enum(APPLICATION_STATUS).optional(),
    rating: z.number().min(0).max(5).optional(),
  }),
});

export const updateApplicationStatusZodSchema = z.object({
  body: z.object({
    status: z.enum(APPLICATION_STATUS, {
      message: "Invalid application status",
    }),
    rating: z.number().min(0).max(5).optional(),
  }),
});

export const ApplicationValidation = {
  createApplicationZodSchema,
  updateApplicationZodSchema,
  updateApplicationStatusZodSchema,
};
