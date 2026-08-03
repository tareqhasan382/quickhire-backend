import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import CompanyService from "./company.service";

interface CompanyQuery {
  page?: string;
  limit?: string;
  search?: string;
  industry?: string;
  size?: string;
  status?: string;
  verified?: string;
}

const createCompany = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const companyData = {
    ...req.body,
    user_id: user.userId,
  };

  const company = await CompanyService.createCompany(companyData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Company created successfully",
    data: company,
  });
});

const getCompanies = catchAsync(
  async (req: Request<{}, {}, {}, CompanyQuery>, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    const { data, total } = await CompanyService.getCompanies(page, limit, {
      search: req.query.search,
      industry: req.query.industry,
      size: req.query.size,
      status: req.query.status,
      verified: req.query.verified,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Companies fetched successfully",
      meta: { page, limit, total },
      data,
    });
  }
);

const getCompanyById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Company ID is required and must be a string",
    });
  }

  const company = await CompanyService.getCompanyById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company fetched successfully",
    data: company,
  });
});

const getMyCompanies = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const data = await CompanyService.getMyCompanies(user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My companies fetched successfully",
    data,
  });
});

const updateMyCompany = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const companies = await CompanyService.getMyCompanies(user.userId);
  const target = companies[0];
  if (!target?._id) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Company not found",
    });
  }

  const company = await CompanyService.updateCompany(target._id.toString(), req.body);
  if (!company) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Company not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company updated successfully",
    data: company,
  });
});

const updateCompany = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Company ID is required and must be a string",
    });
  }

  const company = await CompanyService.updateCompany(id, req.body);
  if (!company) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Company not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company updated successfully",
    data: company,
  });
});

const deleteCompany = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Company ID is required and must be a string",
    });
  }

  const company = await CompanyService.deleteCompany(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Company deleted successfully",
    data: company,
  });
});

export const CompanyController = {
  createCompany,
  getCompanies,
  getCompanyById,
  getMyCompanies,
  updateMyCompany,
  updateCompany,
  deleteCompany,
};
