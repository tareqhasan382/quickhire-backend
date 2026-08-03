import { z } from "zod";
import { REGISTER_ROLES, USER_ROLES, USER_STATUS } from "./user.constant";

const registerZodSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be at most 100 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password must be at most 100 characters"),
    role: z.enum(REGISTER_ROLES).default("candidate"),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
    title: z.string().max(100, "Title must be at most 100 characters").optional(),
    phone: z.string().max(30, "Phone must be at most 30 characters").optional(),
    location: z.string().max(100, "Location must be at most 100 characters").optional(),
  }),
});

const loginZodSchema = z.object({
  body: z.object({
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(1, "Password is required"),
  }),
});

const updateUserZodSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
    role: z.enum(USER_ROLES).optional(),
    status: z.enum(USER_STATUS).optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
    title: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    location: z.string().max(100).optional(),
    isVerified: z.boolean().optional(),
  }),
});

// Self-service profile update (candidate/recruiter/admin) — no role/status/password changes
const updateMeZodSchema = z.object({
  body: z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(100).optional(),
    avatar: z.union([z.literal(""), z.string().url("Avatar must be a valid URL")]).optional(),
    title: z.string().max(100).optional(),
    phone: z.string().max(30).optional(),
    location: z.string().max(100).optional(),
    bio: z.string().max(1000).optional(),
    skills: z.array(z.string().max(50)).optional(),
    languages: z.array(z.string().max(50)).optional(),
    resume_link: z.union([z.literal(""), z.string().url("Resume link must be a valid URL")]).optional(),
    portfolio_link: z.union([z.literal(""), z.string().url("Portfolio link must be a valid URL")]).optional(),
    workExperience: z
      .array(
        z.object({
          title: z.string().min(1, "Title is required").max(120),
          company: z.string().min(1, "Company is required").max(120),
          location: z.string().max(100).optional(),
          startDate: z.string().max(30).optional(),
          endDate: z.string().max(30).optional(),
          current: z.boolean().optional(),
          description: z.string().max(2000).optional(),
        })
      )
      .optional(),
    education: z
      .array(
        z.object({
          school: z.string().min(1, "School is required").max(150),
          degree: z.string().max(100).optional(),
          field: z.string().max(100).optional(),
          startDate: z.string().max(30).optional(),
          endDate: z.string().max(30).optional(),
          description: z.string().max(2000).optional(),
        })
      )
      .optional(),
    certificates: z
      .array(
        z.object({
          name: z.string().min(1, "Name is required").max(150),
          issuer: z.string().max(100).optional(),
          year: z.string().max(10).optional(),
          url: z.union([z.literal(""), z.string().url("Certificate URL must be a valid URL")]).optional(),
        })
      )
      .optional(),
  }),
});

export const UserValidation = {
  registerZodSchema,
  loginZodSchema,
  updateUserZodSchema,
  updateMeZodSchema,
};
