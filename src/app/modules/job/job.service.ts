import JobModel from "./job.model";
import { IJob } from "./job.interface";

class JobService {
  // Create a new job
  async createJob(data: Partial<IJob>): Promise<IJob> {
    //console.log("service job------->",data)
    const job = await JobModel.create(data);
    //console.log("job------->",job)
    return job.toObject();
  }

  // Get all jobs with optional pagination
  async getJobs(
    page = 1,
    limit = 10,
    filters: { search?: string; category?: string; location?: string } = {}
  ): Promise<{ data: IJob[]; total: number }> {
    const skip = (page - 1) * limit;

    const query: any = {};

    // Full text search on title, company, description
    if (filters.search) {
      query.$text = { $search: filters.search };
    }

    if (filters.category) {
      query.category = filters.category;
    }

    if (filters.location) {
      query["location.type"] = filters.location;
    }

    const [data, total] = await Promise.all([
      JobModel.find(query).skip(skip).limit(limit).lean(),
      JobModel.countDocuments(query),
    ]);

    return { data, total };
  }

  // Get single job by ID
  async getJobById(id: string) {
    return JobModel.findById(id).lean();
  }

  // Update job
  async updateJob(id: string, updateData: Partial<IJob>) {
    return JobModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  // Delete job
  async deleteJob(id: string): Promise<IJob | null> {
    return JobModel.findByIdAndDelete(id).lean();
  }
}

export default new JobService();