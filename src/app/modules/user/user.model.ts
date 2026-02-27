import { Schema, model } from "mongoose";
import { IUser } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true, minlength: 2 },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ["admin", "user"], default: "user" },
  },
  { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );
});

const UserModel = model<IUser>("User", userSchema);

export default UserModel;