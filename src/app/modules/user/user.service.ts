// src/app/modules/user/user.service.ts
import UserModel from "./user.model";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import jwt, { Secret } from "jsonwebtoken";
import config from "../../../config";

class UserService {
  // Register user
  async register(data: Partial<IUser>): Promise<IUser> {
        const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const user = await UserModel.create(data);
    return user.toObject();
  }

  // Login user
  async login(email: string, password: string): Promise<{ user: Omit<IUser, "password">; token: string }> {
    const user = await UserModel.findOne({ email }).select("+password");
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      config.jwt.secret as Secret,
      {
        expiresIn: "1h",
      }
    );

    // const userObj = user.toObject();
    // delete userObj.password;

    // return { user: userObj, token };
        const { password: _, ...userObj } = user.toObject(); // ✅ destructure instead of delete

    return { user: userObj, token };
  }

  // Get all users
  async getAllUsers(): Promise<IUser[]> {
    return UserModel.find().select("-password").lean();
  }

  // Get user by ID
  async getUserById(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select("-password").lean();
  }

  // Get logged-in user
  async getMe(id: string): Promise<IUser | null> {
    return UserModel.findById(id).select("-password").lean();
  }
}

export default new UserService();