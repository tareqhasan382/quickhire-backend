import { Model, Schema } from "mongoose";
import {
  JobCategory,
  JobLocationType,
  EmploymentType,
  ExperienceLevel,
  JobStatus,
  SalaryCurrency,
  SalaryPeriod,
} from "./job.constant";

export interface IJob {
  _id?: string;
  user_id: Schema.Types.ObjectId;
  title: string;
  company: string;

  location: {
    type: JobLocationType;
    city?: string;
    country?: string;
  };

  category: JobCategory;
  summary?: string;
  description: string;
  requirements?: string[];
  responsibilities?: string[];
  benefits?: string[];

  employmentType: EmploymentType;
  experienceLevel: ExperienceLevel;
  salary: {
    min: number;
    max: number;
    currency: SalaryCurrency;
    period: SalaryPeriod;
  };
  skills: string[];
  tags: string[];

  status: JobStatus;
  featured: boolean;
  views: number;
  applicantsCount: number;
  deadline?: Date;

  createdAt: Date;
  updatedAt: Date;
}

export type IJobModel = Model<IJob, Record<string, unknown>>;
