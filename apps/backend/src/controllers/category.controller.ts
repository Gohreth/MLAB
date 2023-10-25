import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../services/category.service";

export class CategoryController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await CategoryService.findAll();
      res.send({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
