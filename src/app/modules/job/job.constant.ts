export const JOB_CATEGORIES = [
  "Frontend",
  "Backend",
  "Fullstack",
  "DevOps",
  "Mobile",
  "Data Science",
  "Machine Learning",
  "AI Engineer",
  "Cloud Engineer",
  "Cyber Security",
  "QA / Testing",
  "UI / UX",
  "Product Manager",
  "Game Developer",
  "Blockchain",
] as const;

export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const JOB_LOCATIONS = [
  "Remote",
  "Onsite",
  "Hybrid",
] as const;

export type JobLocationType = (typeof JOB_LOCATIONS)[number];

export const EMPLOYMENT_TYPES = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship",
  "Freelance",
] as const;

export type EmploymentType = (typeof EMPLOYMENT_TYPES)[number];

export const EXPERIENCE_LEVELS = [
  "Entry",
  "Junior",
  "Mid",
  "Senior",
  "Lead",
] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export const JOB_STATUS = ["Active", "Closed", "Draft"] as const;

export type JobStatus = (typeof JOB_STATUS)[number];

export const SALARY_CURRENCIES = ["USD", "EUR", "GBP"] as const;

export type SalaryCurrency = (typeof SALARY_CURRENCIES)[number];

export const SALARY_PERIODS = ["year", "hour", "month"] as const;

export type SalaryPeriod = (typeof SALARY_PERIODS)[number];
