// src/shared/catchAsync.ts
import { NextFunction, Request, Response } from "express";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch(next); // ✅ passes all errors to global error handler
  };
};

export default catchAsync;