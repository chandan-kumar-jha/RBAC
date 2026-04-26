import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

type CustomError = Error & {
  statusCode?: number;
};

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let message = "Internal Server Error";
  let status = 500;

  const error = err as CustomError;

  if (error.message) {
    message = error.message;
  }

  if (error.statusCode && typeof error.statusCode === "number") {
    status = error.statusCode;
  }
  logger.error("Unhandled Error", {
    message,
    status,
    path: req.path,
    method: req.method,
    stack: error.stack,
  });

  res.status(status).json({
    success: false,
    message,
  });
};