import db from "../database";

export class CategoryService {
  static async findAll() {
    try {
      const categories = await db.category.findAll();

      const res = {
        categories,
        message: "Categories successfully fetched",
      };
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
