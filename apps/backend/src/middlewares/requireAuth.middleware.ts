import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/notAuthorized.error";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.currentUser) throw new NotAuthorizedError("Not authorized");
    next();
  } catch (error) {
    next(error);
  }
};
