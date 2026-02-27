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