import { NextFunction, Request, Response } from "express";
import { ReviewService } from "../services/review.service";

export class ReviewController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const data = await ReviewService.create(req.body);
      res.send({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
  static async findByBookId(req: Request, res: Response, next: NextFunction) {
    try {
      const { bookId } = req.query;
      if (isNaN(+bookId!)) throw new Error("Book ID not a number");
      const data = await ReviewService.findByBookId(+bookId!);
      res.send({ success: true, data });
    } catch (error) {
      next(error);
    }
  }
}
