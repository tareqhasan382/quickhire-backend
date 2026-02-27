
export type UserRole = "admin" | "user";
export enum ENUM_ROLE {
  ADMIN = "admin",
  USER = "user",
}
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt?: Date;
  updatedAt?: Date;
}