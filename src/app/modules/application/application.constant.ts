export const APPLICATION_STATUS = [
  "Pending",
  "Reviewed",
  "Interview",
  "Hired",
  "Rejected",
] as const;

export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];
