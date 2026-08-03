import bcrypt from "bcrypt";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import config from "../../../config";
import UserModel from "./user.model";
import JobModel from "../job/job.model";
import { IUser, SafeUser } from "./user.interface";

class UserService {
  // Register a new user (role limited to candidate/recruiter via validation)
  async register(data: Partial<IUser>): Promise<SafeUser> {
    const existingUser = await UserModel.findOne({ email: data.email }).lean();
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const user = await UserModel.create(data);
    const { password: _, ...userObj } = user.toObject();
    return userObj;
  }

  // Login and issue a signed JWT
  async login(
    email: string,
    password: string
  ): Promise<{ user: SafeUser; token: string }> {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    if (user.status === "suspended") throw new Error("Account suspended");

    user.lastActiveAt = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      config.jwt.secret as Secret,
      {
        expiresIn: config.jwt.expires_in as SignOptions["expiresIn"],
      }
    );

    const { password: _, ...userObj } = user.toObject();
    return { user: userObj, token };
  }

  // Get all users (admin only)
  async getAllUsers(): Promise<SafeUser[]> {
    return UserModel.find().select("-password").sort({ createdAt: -1 }).lean();
  }

  // Get a single user by ID (admin only)
  async getUserById(id: string): Promise<SafeUser | null> {
    return UserModel.findById(id).select("-password").lean();
  }

  // Update a user (admin only) — used for role/status management
  async updateUser(id: string, updateData: Partial<IUser>): Promise<SafeUser | null> {
    return UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .lean();
  }

  // Get the logged-in user's own profile
  async getMe(id: string): Promise<SafeUser | null> {
    return UserModel.findById(id).select("-password").lean();
  }

  // Update the logged-in user's own profile
  async updateMe(id: string, updateData: Partial<IUser>): Promise<SafeUser | null> {
    return UserModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .select("-password")
      .lean();
  }

  // Get the logged-in user's saved jobs
  async getSavedJobs(id: string) {
    const user = await UserModel.findById(id)
      .populate({ path: "savedJobs", match: { status: "Active" } })
      .lean();
    return user?.savedJobs ?? [];
  }

  // Save a job for the logged-in user
  async saveJob(id: string, jobId: string): Promise<SafeUser | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { $addToSet: { savedJobs: new Types.ObjectId(jobId) } },
      { new: true }
    )
      .select("-password")
      .lean();
  }

  // Remove a saved job from the logged-in user
  async unsaveJob(id: string, jobId: string): Promise<SafeUser | null> {
    return UserModel.findByIdAndUpdate(
      id,
      { $pull: { savedJobs: new Types.ObjectId(jobId) } },
      { new: true }
    )
      .select("-password")
      .lean();
  }

  // Resolve whether a job exists (used before save/unsave)
  async findJobById(jobId: string) {
    if (!Types.ObjectId.isValid(jobId)) return null;
    return JobModel.findById(jobId).select("_id title").lean();
  }
}

export default new UserService();
