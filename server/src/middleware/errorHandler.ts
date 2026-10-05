import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";

import { AppError } from "../lib/AppError.js";

function sendError(
  res: Response,
  status: number,
  code: string,
  message: string,
  details?: Record<string, string>,
) {
  return res.status(status).json({
    success: false,
    error: {
      code,
      message,
      ...(details && { details }),
    },
  });
}

export function errorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  if (error instanceof ZodError) {
    const details: Record<string, string> = {};

    for (const issue of error.issues) {
      const key = issue.path.join(".") || "body";

      if (!(key in details)) {
        details[key] = issue.message;
      }
    }

    return sendError(
      res,
      400,
      "VALIDATION_ERROR",
      "Validation failed",
      details,
    );
  }

  if (error instanceof AppError) {
    return sendError(
      res,
      error.statusCode,
      error.code,
      error.message,
      error.details,
    );
  }

  if (error instanceof SyntaxError && "body" in error) {
    return sendError(
      res,
      400,
      "INVALID_JSON",
      "Request body is not valid JSON",
    );
  }

  console.error(error);

  return sendError(
    res,
    500,
    "INTERNAL_ERROR",
    "Something went wrong. Please try again later.",
  );
}