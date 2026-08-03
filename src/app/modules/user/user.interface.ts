import { Model } from "mongoose";
import { UserRole, UserStatus } from "./user.constant";

export interface IWorkExperience {
  title: string;
  company: string;
  location?: string;
  startDate?: string;
  endDate?: string;
  current?: boolean;
  description?: string;
}

export interface IEducation {
  school: string;
  degree?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
}

export interface ICertificate {
  name: string;
  issuer?: string;
  year?: string;
  url?: string;
}

export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  title?: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills: string[];
  languages: string[];
  resume_link?: string;
  portfolio_link?: string;
  workExperience: IWorkExperience[];
  education: IEducation[];
  certificates: ICertificate[];
  savedJobs: string[];
  isVerified: boolean;
  status: UserStatus;
  lastActiveAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export type IUserModel = Model<IUser, Record<string, unknown>>;

// Safe view of a user — never exposes the password hash
export type SafeUser = Omit<IUser, "password">;
