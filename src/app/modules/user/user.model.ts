import { Schema, model } from "mongoose";
import { IUser, IUserModel } from "./user.interface";
import { USER_ROLES, USER_STATUS } from "./user.constant";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
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
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },
    role: {
      type: String,
      enum: USER_ROLES,
      default: "candidate",
      index: true,
    },
    avatar: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 30,
    },
    location: {
      type: String,
      trim: true,
      maxlength: 100,
    },
    bio: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    skills: {
      type: [String],
      default: [],
    },
    languages: {
      type: [String],
      default: [],
    },
    resume_link: {
      type: String,
      trim: true,
    },
    portfolio_link: {
      type: String,
      trim: true,
    },
    workExperience: [
      {
        title: { type: String, required: true, maxlength: 120 },
        company: { type: String, required: true, maxlength: 120 },
        location: { type: String, maxlength: 100 },
        startDate: { type: String, maxlength: 30 },
        endDate: { type: String, maxlength: 30 },
        current: { type: Boolean, default: false },
        description: { type: String, maxlength: 2000 },
      },
    ],
    education: [
      {
        school: { type: String, required: true, maxlength: 150 },
        degree: { type: String, maxlength: 100 },
        field: { type: String, maxlength: 100 },
        startDate: { type: String, maxlength: 30 },
        endDate: { type: String, maxlength: 30 },
        description: { type: String, maxlength: 2000 },
      },
    ],
    certificates: [
      {
        name: { type: String, required: true, maxlength: 150 },
        issuer: { type: String, maxlength: 100 },
        year: { type: String, maxlength: 10 },
        url: { type: String, maxlength: 500 },
      },
    ],
    savedJobs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Job",
      },
    ],
    isVerified: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: USER_STATUS,
      default: "active",
    },
    lastActiveAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Hash the password only when it actually changed (also avoids re-hashing on metadata updates)
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bycrypt_salt_rounds)
    );
  }
});

const UserModel = model<IUser, IUserModel>("User", userSchema);

export default UserModel;
