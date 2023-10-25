import { NextFunction, Request, Response } from "express";
import { BookService } from "../services/book.service";

export class BookController {
  static async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const {
        page = 1,
        limit = 10,
        orderBy = "_id",
        sortBy = "asc",
        keyword,
        category,
      } = req.query;

      const data = await BookService.findAll({
        page: +page ? +page : 1,
        limit: +limit ? +limit : 3,
        orderBy: orderBy as string,
        sortBy: sortBy as "asc" | "desc",
        keyword: keyword as string,
        category: category && +category ? +category : undefined,
      });

      res.send({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
  static async findById(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;

      if (typeof id !== "string" || isNaN(parseInt(id))) throw new Error();

      const data = await BookService.findById(parseInt(id));

      res.send({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
