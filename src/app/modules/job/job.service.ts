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
  async getJobs(page = 1, limit = 10): Promise<{ data: IJob[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      JobModel.find().skip(skip).limit(limit).lean(),
      JobModel.countDocuments(),
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