import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import UserService from "./user.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.register(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const result = await UserService.login(email, password);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Login successful",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Users fetched successfully",
    data: users,
  });
});

const getUserById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "ID is required and must be a string",
    });
  }
  const user = await UserService.getUserById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User fetched successfully",
    data: user,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  if (!id || Array.isArray(id)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "ID is required and must be a string",
    });
  }
  const user = await UserService.updateUser(id, req.body);
  if (!user) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "User not found",
    });
  }
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "User updated successfully",
    data: user,
  });
});

const getMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: No user found in request headers.",
    });
  }
  const userData = await UserService.getMe(user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Logged-in user fetched successfully",
    data: userData,
  });
});

const updateMe = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: No user found in request headers.",
    });
  }
  const userData = await UserService.updateMe(user.userId, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Profile updated successfully",
    data: userData,
  });
});

const getSavedJobs = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: No user found in request headers.",
    });
  }
  const jobs = await UserService.getSavedJobs(user.userId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Saved jobs fetched successfully",
    data: jobs,
  });
});

const saveJob = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { jobId } = req.params;

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: No user found in request headers.",
    });
  }
  if (!jobId || Array.isArray(jobId)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  const job = await UserService.findJobById(jobId);
  if (!job) {
    return sendResponse(res, {
      statusCode: 404,
      success: false,
      message: "Job not found",
    });
  }

  const userData = await UserService.saveJob(user.userId, jobId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job saved successfully",
    data: userData,
  });
});

const unsaveJob = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;
  const { jobId } = req.params;

  if (!user) {
    return sendResponse(res, {
      statusCode: 401,
      success: false,
      message: "Unauthorized: No user found in request headers.",
    });
  }
  if (!jobId || Array.isArray(jobId)) {
    return sendResponse(res, {
      statusCode: 400,
      success: false,
      message: "Job ID is required and must be a string",
    });
  }

  const userData = await UserService.unsaveJob(user.userId, jobId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Job removed from saved jobs",
    data: userData,
  });
});

export const UserController = {
  register,
  login,
  getAllUsers,
  getUserById,
  updateUser,
  getMe,
  updateMe,
  getSavedJobs,
  saveJob,
  unsaveJob,
};
