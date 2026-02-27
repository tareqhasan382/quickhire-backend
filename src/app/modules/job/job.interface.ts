import { Model, Schema } from "mongoose";
import { JobCategory, JobLocationType } from "./job.constant";

export type IJob = {
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
  description: string;

  createdAt: Date;
  updatedAt: Date;
};

export type IJobModel = Model<IJob, Record<string, unknown>>;