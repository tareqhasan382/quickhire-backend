import { Request, Response } from "express";
import JobService from "./job.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

// Query params for pagination + filters
interface JobQuery {
  page?: string;
  limit?: string;
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

const createJob = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  // Merge user_id from token into request body
  const jobData = {
    ...req.body,
    user_id: user.userId,
  };
  const job = await JobService.createJob(jobData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Job created successfully",
    data: job,
  });
});

const getJobs = catchAsync(async (req: Request<{}, {}, {}, JobQuery>, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const { data, total } = await JobService.getJobs(page, limit, {
    search: req.query.search,
    title: req.query.title,
    location: req.query.location,
    locationType: req.query.locationType,
    category: req.query.category,
    employmentType: req.query.employmentType,
    experienceLevel: req.query.experienceLevel,
    minSalary: req.query.minSalary,
    status: req.query.status,
    sort: req.query.sort,
    company: req.query.company,
  });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Jobs fetched successfully",
    meta: { page, limit, total },
    data,
  });
});

const getFeaturedJobs = catchAsync(async (req: Request, res: Response) => {
  const data = await JobService.getFeaturedJobs();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Featured jobs fetched successfully",
    data,
  });
});

const getMyJobs = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const data = await JobService.getMyJobs(user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My jobs fetched successfully",
    data,
  });
});

const getJobById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  const job = await JobService.getJobById(id);
  if (!job) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Job not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job fetched successfully",
    data: job,
  });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const existing = await JobService.getOwnedJob(id, user.userId, user.role);
  if (!existing) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Job not found",
    });
  }

  const job = await JobService.updateJob(id, req.body);
  if (!job) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Job not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job updated successfully",
    data: job,
  });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const existing = await JobService.getOwnedJob(id, user.userId, user.role);
  if (!existing) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Job not found",
    });
  }

  const job = await JobService.deleteJob(id);
  if (!job) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Job not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job deleted successfully",
    data: job,
  });
});

export const JobController = {
  createJob,
  getJobs,
  getMyJobs,
  getFeaturedJobs,
  getJobById,
  updateJob,
  deleteJob,
};
