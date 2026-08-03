import CompanyModel from "./company.model";
import { ICompany } from "./company.interface";
import { Types } from "mongoose";

interface CompanyFilters {
  search?: string;
  industry?: string;
  size?: string;
  status?: string;
  verified?: string;
}

class CompanyService {
  // Create a new company profile
  async createCompany(data: Partial<ICompany>): Promise<ICompany> {
    const existing = await CompanyModel.findOne({ name: data.name }).lean();
    if (existing) {
      throw new Error("Company with this name already exists");
    }
    const company = await CompanyModel.create(data);
    return company.toObject();
  }

  // Get all companies with optional filters + pagination
  async getCompanies(
    page = 1,
    limit = 10,
    filters: CompanyFilters = {}
  ): Promise<{ data: ICompany[]; total: number }> {
    const skip = (page - 1) * limit;
    const query: any = {};

    if (filters.search && filters.search.trim()) {
      query.$text = { $search: filters.search };
    }

    if (filters.industry && filters.industry.trim()) {
      query.industry = filters.industry;
    }

    if (filters.size && filters.size.trim()) {
      query.size = filters.size;
    }

    if (filters.status && filters.status.trim()) {
      query.status = filters.status;
    }

    if (filters.verified) {
      query.verified = filters.verified === "true";
    }

    const [data, total] = await Promise.all([
      CompanyModel.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      CompanyModel.countDocuments(query),
    ]);

    return { data, total };
  }

  // Get a single company by ID
  async getCompanyById(id: string) {
    return CompanyModel.findById(id).lean();
  }

  // Get the recruiter's own company profiles
  async getMyCompanies(userId: string): Promise<ICompany[]> {
    const query: any = { user_id: new Types.ObjectId(userId) };
    return CompanyModel.find(query).sort({ createdAt: -1 }).lean();
  }

  // Update a company profile
  async updateCompany(id: string, updateData: Partial<ICompany>) {
    return CompanyModel.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).lean();
  }

  // Delete a company
  async deleteCompany(id: string): Promise<ICompany | null> {
    return CompanyModel.findByIdAndDelete(id).lean();
  }
}

export default new CompanyService();
