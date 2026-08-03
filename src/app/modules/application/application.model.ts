import { Schema, model } from "mongoose";
import { IApplication } from "./application.interface";
import { APPLICATION_STATUS } from "./application.constant";

const applicationSchema = new Schema<IApplication>(
  {
    job_id: {
      type: Schema.Types.ObjectId,
      ref: "Job",
      required: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
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
    status: {
      type: String,
      enum: APPLICATION_STATUS,
      default: "Pending",
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// A candidate can only apply once per job
applicationSchema.index({ job_id: 1, user_id: 1 }, { unique: true });

const ApplicationModel = model<IApplication>("Application", applicationSchema);

export default ApplicationModel;
