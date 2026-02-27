import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApplicationService from "./application.service";

// Query params for pagination
interface ApplicationQuery {
  page?: string;
  limit?: string;
}

// Route param interface
interface ApplicationIdParams {
  id: string;
}

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const application = await ApplicationService.createApplication(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Application created successfully",
    data: application,
  });
});

const getApplications = catchAsync(async (req: Request<{}, {}, {}, ApplicationQuery>, res: Response) => {
  const page = req.query.page ? parseInt(req.query.page, 10) : 1;
  const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

  const { data, total } = await ApplicationService.getApplications(page, limit);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Applications fetched successfully",
    meta: { page, limit, total },
    data,
  });
});

const getApplicationById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Application ID is required and must be a string",
    });
  }

  const application = await ApplicationService.getApplicationById(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application fetched successfully",
    data: application,
  });
});

const updateApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Application ID is required and must be a string",
    });
  }

  const application = await ApplicationService.updateApplication(id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application updated successfully",
    data: application,
  });
});

const deleteApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Application ID is required and must be a string",
    });
  }

  const application = await ApplicationService.deleteApplication(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application deleted successfully",
    data: application,
  });
});

export const ApplicationController = {
  createApplication,
  getApplications,
  getApplicationById,
  updateApplication,
  deleteApplication,
};