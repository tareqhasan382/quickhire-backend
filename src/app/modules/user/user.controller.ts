// src/app/modules/user/user.controller.ts
import { NextFunction, Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import UserService from "./user.service";

const register = catchAsync(async (req: Request, res: Response) => {
  const user = await UserService.register(req.body); // catchAsync handles errors
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

export const UserController = { register, login, getAllUsers, getUserById, getMe };