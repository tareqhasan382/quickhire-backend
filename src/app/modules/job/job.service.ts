import JobModel from "./job.model";
import { IJob } from "./job.interface";
import { Types } from "mongoose";

interface JobFilters {
  search?: string;
  title?: string;
  location?: string;
  locationType?: string;
  category?: string;
  employmentType?: string;
  experienceLevel?: string;
  minSalary?: string;
  status?: string;
  sort?: string;
  company?: string;
}

type SortOrder = 1 | -1;

// Splits a comma-separated filter value into an array of non-empty strings
const toList = (value?: string): string[] | undefined => {
  const list = value
    ?.split(",")
    .map((item) => item.trim())
    .filter(Boolean);
  return list?.length ? list : undefined;
};

class JobService {
  // Create a new job
  async createJob(data: Partial<IJob>): Promise<IJob> {
    const job = await JobModel.create(data);
    return job.toObject();
  }

  // Get jobs with filters, pagination and sorting
  async getJobs(
    page = 1,
    limit = 10,
    filters: JobFilters = {}
  ): Promise<{ data: IJob[]; total: number }> {
    const skip = (page - 1) * limit;
    const query: any = {};

    // Public listing shows only active jobs unless a status is requested
    query.status = filters.status || "Active";

    if (filters.search && filters.search.trim()) {
      query.$text = { $search: filters.search };
    }

    if (filters.title && filters.title.trim()) {
      query.title = { $regex: filters.title.trim(), $options: "i" };
    }

    if (filters.location && filters.location.trim()) {
      query["location.city"] = { $regex: filters.location.trim(), $options: "i" };
    }

    const locationTypes = toList(filters.locationType);
    if (locationTypes) {
      query["location.type"] = { $in: locationTypes };
    }

    const categories = toList(filters.category);
    if (categories) {
      query.category = { $in: categories };
    }

    const employmentTypes = toList(filters.employmentType);
    if (employmentTypes) {
      query.employmentType = { $in: employmentTypes };
    }

    const experienceLevels = toList(filters.experienceLevel);
    if (experienceLevels) {
      query.experienceLevel = { $in: experienceLevels };
    }

    if (filters.company && filters.company.trim()) {
      query.company = { $regex: filters.company.trim(), $options: "i" };
    }

    if (filters.minSalary) {
      const min = parseInt(filters.minSalary, 10);
      if (!isNaN(min)) {
        query["salary.max"] = { $gte: min };
      }
    }

    const sort: Record<string, SortOrder> = {};
    switch (filters.sort) {
      case "salary-high":
        sort["salary.max"] = -1;
        break;
      case "salary-low":
        sort["salary.max"] = 1;
        break;
      case "popular":
        sort.applicantsCount = -1;
        break;
      case "oldest":
        sort.createdAt = 1;
        break;
      default:
        sort.createdAt = -1;
        break;
    }

    const [data, total] = await Promise.all([
      JobModel.find(query).sort(sort).skip(skip).limit(limit).lean(),
      JobModel.countDocuments(query),
    ]);

    return { data, total };
  }

  // Get featured active jobs
  async getFeaturedJobs(limit = 6): Promise<IJob[]> {
    return JobModel.find({ featured: true, status: "Active" })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();
  }

  // Get single job by ID (and bump views)
  async getJobById(id: string) {
    const job = await JobModel.findById(id).lean();
    if (job) {
      await JobModel.findByIdAndUpdate(id, { $inc: { views: 1 } }).lean();
    }
    return job;
  }

  // Get the recruiter's own jobs (admin allowed via role check)
  async getMyJobs(userId: string): Promise<IJob[]> {
    const query: any = { user_id: new Types.ObjectId(userId) };
    return JobModel.find(query).sort({ createdAt: -1 }).lean();
  }

  // Get a job the user is allowed to manage (owner or admin)
  async getOwnedJob(id: string, userId: string, role: string) {
    const job = await JobModel.findById(id).lean();
    if (!job) return null;

    if (role !== "admin" && job.user_id?.toString() !== userId) {
      throw new Error("Forbidden");
    }

    return job;
  }

  // Update job
  async updateJob(id: string, updateData: Partial<IJob>) {
    return JobModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();
  }

  // Delete job
  async deleteJob(id: string): Promise<IJob | null> {
    return JobModel.findByIdAndDelete(id).lean();
  }
}

export default new JobService();
