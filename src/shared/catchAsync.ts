import { NextFunction, Request, RequestHandler, Response } from "express";

const catchAsync = (fn: RequestHandler) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next); // await added
    } catch (error) {
      next(error); // forward error to global error handler
    }
  };
};

export default catchAsync;