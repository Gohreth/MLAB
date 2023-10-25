import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { AUTH_CONFIG } from "../config/auth.config";
import { UserPayload } from "..";

export const getCurrentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }
  try {
    const payload = jwt.verify(
      req.session.jwt,
      AUTH_CONFIG.SECRET!
    ) as UserPayload;

    req.currentUser = payload;
    return next();
  } catch (error) {
    return next(error);
  }
};
