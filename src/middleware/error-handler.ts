import { NextFunction, Request, Response } from "express";

/**
 * Error handler middleware.
 * Checks if there is an error in which case it logs the error and sends a relevant response.
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  if (!err) {
    return next();
  }

  if (res.headersSent) {
    return next(err);
  }

  // TODO: Add checks for 404 errors
  const { message } = err;
  return res.status(500).json({ error: message });
};
