import { Model, Schema } from "mongoose";
import {
  CompanyIndustry,
  CompanySize,
  CompanyStatus,
  CompanyPlan,
} from "./company.constant";

export interface ICompany {
  _id?: string;
  user_id: Schema.Types.ObjectId;
  name: string;
  logo?: string;
  industry: CompanyIndustry;
  location: string;
  website?: string;
  size: CompanySize;
  founded?: number;
  description: string;
  benefits: string[];
  rating: number;
  reviewCount: number;
  verified: boolean;
  featured: boolean;
  status: CompanyStatus;
  plan: CompanyPlan;
  openPositions: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export type ICompanyModel = Model<ICompany, Record<string, unknown>>;
