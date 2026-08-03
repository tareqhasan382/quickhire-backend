import { Types } from "mongoose";
import ApplicationModel from "./application.model";
import JobModel from "../job/job.model";
import { IApplication } from "./application.interface";

class ApplicationService {
  // Create a new application
  async createApplication(data: Partial<IApplication>): Promise<IApplication> {
    const existing = await ApplicationModel.findOne({
      job_id: data.job_id,
      user_id: data.user_id,
    }).lean();
    if (existing) {
      throw new Error("You have already applied to this job");
    }

    const application = await ApplicationModel.create(data);

    // Track applicant count on the job
    await JobModel.findByIdAndUpdate(data.job_id, {
      $inc: { applicantsCount: 1 },
    });

    return application.toObject();
  }

  // Get all applications with optional status filter + pagination
  async getApplications(
    page = 1,
    limit = 10,
    status?: string
  ): Promise<{ data: IApplication[]; total: number }> {
    const skip = (page - 1) * limit;
    const query: any = {};
    if (status && status !== "all") {
      query.status = status;
    }

    const [data, total] = await Promise.all([
      ApplicationModel.find(query)
        .populate("job_id", "title company")
        .populate("user_id", "name email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      ApplicationModel.countDocuments(query),
    ]);

    return { data, total };
  }

  // Get the current candidate's own applications
  async getMyApplications(userId: string): Promise<IApplication[]> {
    const query: any = { user_id: new Types.ObjectId(userId) };
    return ApplicationModel.find(query)
      .populate("job_id", "title company")
      .sort({ createdAt: -1 })
      .lean();
  }

  // Withdraw one of the candidate's own applications
  async withdrawMyApplication(id: string, userId: string) {
    const query: any = {
      _id: id,
      user_id: new Types.ObjectId(userId),
    };
    const application = await ApplicationModel.findOneAndDelete(query).lean();
    if (application) {
      await JobModel.findByIdAndUpdate(application.job_id, {
        $inc: { applicantsCount: -1 },
      });
    }
    return application;
  }

  // Get applications for the recruiter's own jobs
  async getRecruiterApplications(userId: string, status?: string): Promise<IApplication[]> {
    const jobQuery: any = { user_id: new Types.ObjectId(userId) };
    const jobIds = await JobModel.find(jobQuery).distinct("_id");

    const query: any = { job_id: { $in: jobIds } };
    if (status && status !== "all") {
      query.status = status;
    }

    return ApplicationModel.find(query)
      .populate("job_id", "title company")
      .populate("user_id", "name email")
      .sort({ createdAt: -1 })
      .lean();
  }

  // Get a single application for one of the recruiter's jobs
  async getRecruiterApplicationById(id: string, userId: string) {
    const application = await ApplicationModel.findById(id)
      .populate("job_id", "title company user_id")
      .lean();
    if (!application) return null;

    const job = application.job_id as unknown as { user_id?: Types.ObjectId } | null;
    if (job?.user_id?.toString() !== userId) {
      throw new Error("Forbidden");
    }

    return ApplicationModel.findById(id)
      .populate("job_id", "title company")
      .populate("user_id", "name email")
      .lean();
  }

  // Update application status/rating (recruiter scoped)
  async updateApplicationStatus(
    id: string,
    userId: string,
    updateData: Partial<IApplication>
  ) {
    const application = await ApplicationModel.findById(id)
      .populate("job_id", "title company user_id")
      .lean();
    if (!application) return null;

    const job = application.job_id as unknown as { user_id?: Types.ObjectId } | null;
    if (job?.user_id?.toString() !== userId) {
      throw new Error("Forbidden");
    }

    return ApplicationModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("job_id", "title company")
      .populate("user_id", "name email")
      .lean();
  }

  // Get single application by ID
  async getApplicationById(id: string) {
    return ApplicationModel.findById(id)
      .populate("job_id", "title company")
      .populate("user_id", "name email")
      .lean();
  }

  // Update application by ID
  async updateApplication(id: string, updateData: Partial<IApplication>) {
    return ApplicationModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    })
      .populate("job_id", "title company")
      .populate("user_id", "name email")
      .lean();
  }

  // Delete application by ID
  async deleteApplication(id: string) {
    return ApplicationModel.findByIdAndDelete(id).lean();
  }
}

export default new ApplicationService();
