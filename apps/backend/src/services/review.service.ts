import db from "../database";
import { IReviewParams } from "../types/review";

export class ReviewService {
  static async create(reviewParams: IReviewParams) {
    try {
      const review = await db.review.create(reviewParams);
      const res = {
        review,
        message: "Review successfully created",
      };
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async findByBookId(bookId: IReviewParams["bookId"]) {
    try {
      const reviews = await db.review.findAll({ where: { bookId } });
      const res = {
        reviews,
        message: "Reviews successfully fetched",
      };
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
