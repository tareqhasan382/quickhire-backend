import { Schema, model } from "mongoose";
import { ICompany, ICompanyModel } from "./company.interface";
import {
  COMPANY_INDUSTRIES,
  COMPANY_SIZES,
  COMPANY_STATUS,
  COMPANY_PLANS,
} from "./company.constant";

const companySchema = new Schema<ICompany>(
  {
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
    logo: {
      type: String,
      trim: true,
    },
    industry: {
      type: String,
      enum: COMPANY_INDUSTRIES,
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    website: {
      type: String,
      trim: true,
    },
    size: {
      type: String,
      enum: COMPANY_SIZES,
      required: true,
    },
    founded: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 20,
      maxlength: 5000,
    },
    benefits: {
      type: [String],
      default: [],
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: COMPANY_STATUS,
      default: "Active",
      index: true,
    },
    plan: {
      type: String,
      enum: COMPANY_PLANS,
      default: "Free",
    },
    openPositions: {
      type: Number,
      default: 0,
      min: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 🔎 Search optimization
companySchema.index({ name: "text", description: "text", industry: "text" });

const CompanyModel = model<ICompany, ICompanyModel>("Company", companySchema);

export default CompanyModel;
