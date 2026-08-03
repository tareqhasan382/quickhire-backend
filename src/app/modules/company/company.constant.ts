export const COMPANY_INDUSTRIES = [
  "Technology",
  "Finance",
  "Healthcare",
  "Education",
  "E-commerce",
  "Marketing",
  "Design",
  "Consulting",
  "Manufacturing",
  "Real Estate",
  "Travel",
  "Food & Beverage",
  "Media",
  "Other",
] as const;
export type CompanyIndustry = (typeof COMPANY_INDUSTRIES)[number];

export const COMPANY_SIZES = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+",
] as const;
export type CompanySize = (typeof COMPANY_SIZES)[number];

export const COMPANY_STATUS = ["Active", "Pending", "Suspended"] as const;
export type CompanyStatus = (typeof COMPANY_STATUS)[number];

export const COMPANY_PLANS = ["Free", "Pro", "Enterprise"] as const;
export type CompanyPlan = (typeof COMPANY_PLANS)[number];
