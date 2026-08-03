export const USER_ROLES = ["admin", "recruiter", "candidate"] as const;
export type UserRole = (typeof USER_ROLES)[number];

// Roles a public visitor may pick during registration (admin is never self-registered)
export const REGISTER_ROLES = ["candidate", "recruiter"] as const;
export type RegisterRole = (typeof REGISTER_ROLES)[number];

export const USER_STATUS = ["active", "suspended"] as const;
export type UserStatus = (typeof USER_STATUS)[number];

export enum ENUM_ROLE {
  ADMIN = "admin",
  RECRUITER = "recruiter",
  CANDIDATE = "candidate",
}
