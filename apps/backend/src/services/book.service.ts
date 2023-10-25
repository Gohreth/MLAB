import { Op } from "sequelize";
import db from "../database";

interface QueryParams {
  page: number;
  limit: number;
  orderBy: string | string[];
  sortBy: ("asc" | "desc") | ("asc" | "desc")[];
  keyword?: string;
  category?: number;
}

export class BookService {
  static async findAll({
    page,
    limit,
    orderBy,
    sortBy,
    keyword,
    category,
  }: QueryParams) {
    try {
      const query: any = {};
      const categoryQuery: any = {};

      if (keyword) {
        query.title = { [Op.iLike]: `%${keyword}%` };
      }

      if (category) {
        categoryQuery["$CategoryId$"] = { [Op.eq]: category };
      }

      const queries: any = {
        offset: (page - 1) * limit,
        limit,
      };

      if (orderBy) {
        queries.order = [[orderBy, sortBy]];
      }

      const data = await db.book.findAndCountAll({
        where: query,
        ...queries,
        distinct: true,
        include: [
          {
            association: "authors",
            through: {
              attributes: [],
            },
          },
          {
            association: "categories",
            through: {
              attributes: [],
            },
            where: categoryQuery,
          },
        ],
      });

      const res = {
        totalPages: Math.ceil(data?.count / limit),
        totalItems: data?.count,
        books: data?.rows,
      };

      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
  static async findById(id: number) {
    try {
      const data = await db.book.findByPk(id, {
        include: [
          {
            association: "authors",
            through: {
              attributes: [],
            },
          },
          {
            association: "categories",
            through: {
              attributes: [],
            },
          },
          {
            association: "reviews",
          },
        ],
      });

      const res = {
        book: data?.dataValues,
      };

      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
