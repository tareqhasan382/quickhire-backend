import { Schema, model, Query } from "mongoose";
import { IJob, IJobModel } from "./job.interface";
import { JOB_CATEGORIES, JOB_LOCATIONS } from "./job.constant";

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
    description: {
      type: String,
      required: true,
      minlength: 20,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔎 Search optimization
jobSchema.index({ title: "text", company: "text", description: "text" });

// Default sort (latest jobs first)
jobSchema.pre(/^find/, function (this: Query<IJob[], IJob>) {
  this.sort({ createdAt: -1 });
});

const JobModel = model<IJob, IJobModel>("Job", jobSchema);

export default JobModel;