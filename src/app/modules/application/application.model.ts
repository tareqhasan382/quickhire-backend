import { Schema, model } from "mongoose";
import { IApplication } from "./application.interface";


const applicationSchema = new Schema<IApplication>(
  {
    job_id: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, // email validation
    },
    resume_link: {
      type: String,
      required: true,
      trim: true,
    },
    cover_note: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
  },
  {
    timestamps: true, 
    versionKey: false,
  }
);

const ApplicationModel = model<IApplication>("Application", applicationSchema);

export default ApplicationModel;