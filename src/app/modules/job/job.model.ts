import { Schema, model } from "mongoose";
import { IJob, IJobModel } from "./job.interface";
import {
  JOB_CATEGORIES,
  JOB_LOCATIONS,
  EMPLOYMENT_TYPES,
  EXPERIENCE_LEVELS,
  JOB_STATUS,
  SALARY_CURRENCIES,
  SALARY_PERIODS,
} from "./job.constant";

const jobSchema = new Schema<IJob>(
  {
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 120,
    },
    company: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    location: {
      type: {
        type: String,
        enum: JOB_LOCATIONS,
        required: true,
      },
      city: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
    },
    category: {
      type: String,
      enum: JOB_CATEGORIES,
      required: true,
      index: true,
    },
    summary: {
      type: String,
      trim: true,
      maxlength: 300,
    },
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
    requirements: {
      type: [String],
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    benefits: {
      type: [String],
      default: [],
    },
    employmentType: {
      type: String,
      enum: EMPLOYMENT_TYPES,
      required: true,
      index: true,
    },
    experienceLevel: {
      type: String,
      enum: EXPERIENCE_LEVELS,
      required: true,
      index: true,
    },
    salary: {
      min: { type: Number, required: true, min: 0 },
      max: { type: Number, required: true, min: 0 },
      currency: { type: String, enum: SALARY_CURRENCIES, default: "USD" },
      period: { type: String, enum: SALARY_PERIODS, default: "year" },
    },
    skills: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: JOB_STATUS,
      default: "Active",
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    views: {
      type: Number,
      default: 0,
    },
    applicantsCount: {
      type: Number,
      default: 0,
    },
    deadline: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔎 Search optimization
jobSchema.index({ title: "text", company: "text", description: "text", summary: "text" });

const JobModel = model<IJob, IJobModel>("Job", jobSchema);

export default JobModel;
