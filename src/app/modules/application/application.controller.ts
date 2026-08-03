import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import ApplicationService from "./application.service";

interface ApplicationQuery {
  page?: string;
  limit?: string;
  status?: string;
}

const createApplication = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  // Merge user_id from token into request body
  const applicationData = {
    ...req.body,
    user_id: user.userId,
  };
  const application = await ApplicationService.createApplication(applicationData);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Application created successfully",
    data: application,
  });
});

const getApplications = catchAsync(
  async (req: Request<{}, {}, {}, ApplicationQuery>, res: Response) => {
    const page = req.query.page ? parseInt(req.query.page, 10) : 1;
    const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;

    const { data, total } = await ApplicationService.getApplications(
      page,
      limit,
      req.query.status
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Applications fetched successfully",
      meta: { page, limit, total },
      data,
    });
  }
);

const getMyApplications = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const applications = await ApplicationService.getMyApplications(user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My applications fetched successfully",
    data: applications,
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
  if (!application) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Application not found",
    });
  }

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
  if (!application) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Application not found",
    });
  }

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
  if (!application) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Application not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application deleted successfully",
    data: application,
  });
});

const getRecruiterApplications = catchAsync(
  async (req: Request<{}, {}, {}, ApplicationQuery>, res: Response) => {
    const user = req.user;
    if (!user) {
      return sendResponse(res, {
        statusCode: 401,
        success: false,
        message: "Unauthorized: User not found in token",
      });
    }

    const applications = await ApplicationService.getRecruiterApplications(
      user.userId,
      req.query.status
    );

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Applications fetched successfully",
      data: applications,
    });
  }
);

const updateApplicationStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Application ID is required and must be a string",
    });
  }

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const application = await ApplicationService.updateApplicationStatus(
    id,
    user.userId,
    req.body
  );
  if (!application) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Application not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application status updated successfully",
    data: application,
  });
});

const withdrawMyApplication = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = req.user;

  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Application ID is required and must be a string",
    });
  }

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: User not found in token",
    });
  }

  const application = await ApplicationService.withdrawMyApplication(id, user.userId);
  if (!application) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Application not found",
    });
  }

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Application withdrawn successfully",
    data: application,
  });
});

export const ApplicationController = {
  createApplication,
  getApplications,
  getMyApplications,
  getRecruiterApplications,
  getApplicationById,
  updateApplication,
  updateApplicationStatus,
  withdrawMyApplication,
  deleteApplication,
};
