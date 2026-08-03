import { Schema } from "mongoose";
import { ApplicationStatus } from "./application.constant";

export interface IApplication {
  _id?: string;
  job_id: Schema.Types.ObjectId;
  user_id: Schema.Types.ObjectId;
  name: string;
  email: string;
  resume_link: string;
  cover_note?: string;
  status: ApplicationStatus;
  rating: number;
  createdAt?: Date;
  updatedAt?: Date;
}
