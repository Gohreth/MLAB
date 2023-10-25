import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UserService } from "../services/user.service";
import { AUTH_CONFIG } from "../config/auth.config";

export class UserController {
  static async signUp(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.signUp(req.body);
      //Generar JWT
      const userJwt = jwt.sign(
        {
          id: user!.dataValues.id,
          username: user!.dataValues.username,
          email: user!.dataValues.email,
        },
        AUTH_CONFIG.SECRET!
      );

      //Almacenar en session
      req.session = {
        jwt: userJwt,
      };

      res.status(201).send({
        success: true,
        data: {
          user: user.dataValues,
        },
        message: "User signed up successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.signIn(req.body);

      //Generar JWT
      const userJwt = jwt.sign(
        {
          id: user!.dataValues.id,
          username: user!.dataValues.username,
          email: user!.dataValues.email,
        },
        AUTH_CONFIG.SECRET!
      );

      //Almacenar en session
      req.session = {
        jwt: userJwt,
      };

      res.send({
        success: true,
        data: {
          user: user.dataValues,
        },
        message: "User logged in successfully",
      });
    } catch (error) {
      next(error);
    }
  }
  static async signOut(req: Request, res: Response, next: NextFunction) {
    try {
      req.session = null;
      return res.send({
        success: true,
        message: "Successfully logged out",
      });
    } catch (error) {
      next(error);
    }
  }
  static async getCurrentUser(req: Request, res: Response, next: NextFunction) {
    try {
      res.send({
        success: true,
        data: {
          user: req.currentUser,
        },
        message: "Current user",
      });
    } catch (error) {
      next(error);
    }
  }
}
