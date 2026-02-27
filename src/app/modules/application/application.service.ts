import ApplicationModel from "./application.model";
import { IApplication } from "./application.interface";

class ApplicationService {
  // Create a new application
  async createApplication(data: Partial<IApplication>): Promise<IApplication> {
    const application = await ApplicationModel.create(data);
    return application.toObject();
  }

  // Get all applications with optional pagination
  async getApplications(page = 1, limit = 10): Promise<{ data: IApplication[]; total: number }> {
    const skip = (page - 1) * limit;
    const [data, total] = await Promise.all([
      ApplicationModel.find().skip(skip).limit(limit).lean(),
      ApplicationModel.countDocuments(),
    ]);

    return { data, total };
  }


  // Get single application by ID
  async getApplicationById(id: string) {
    return ApplicationModel.findById(id).lean();
  }

  // Update application by ID
  async updateApplication(id: string, updateData: Partial<IApplication>) {
    return ApplicationModel.findByIdAndUpdate(id, updateData, { new: true }).lean();
  }

  // Delete application by ID
  async deleteApplication(id: string) {
    return ApplicationModel.findByIdAndDelete(id).lean();
  }
}

export default new ApplicationService();