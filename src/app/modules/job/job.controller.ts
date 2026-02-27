import { Request, Response } from "express";
import JobService from "./job.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

// Query params for pagination
interface JobQuery {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  location?: string;
}
// Route param interface
interface JobIdParams {
  id: string;
}

// Controller as an object
const createJob = catchAsync(async (req: Request, res: Response) => {
  //console.log("data------->",req.body)
  const job = await JobService.createJob(req.body);
  //console.log("Created job:", job);
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

  const { search, category, location } = req.query;

  const { data, total } = await JobService.getJobs(page, limit, { search, category, location });

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Jobs fetched successfully",
    meta: { page, limit, total },
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

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job fetched successfully",
    data: job,
  });
});

const updateJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  const job = await JobService.updateJob(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job updated successfully",
    data: job,
  });
});

const deleteJob = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  const job = await JobService.deleteJob(id);

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
  getJobById,
  updateJob,
  deleteJob,
};