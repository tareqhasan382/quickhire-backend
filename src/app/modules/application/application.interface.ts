import { Schema } from "mongoose";

export interface IApplication {
  _id?: string;             
  job_id: Schema.Types.ObjectId;           
  name: string;
  email: string;
  resume_link: string;      
  cover_note?: string;      
  createdAt?: Date;
  updatedAt?: Date;
}