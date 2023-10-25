import { app } from "./app";
import db from "./database";
import { Data } from "./utils/dataSeed.util";
import jwt from "jsonwebtoken";

const RECOMMENDED_BOOKS_QUANTITY = 300;

export interface UserPayload extends jwt.JwtPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

(async (limit: number) => {
  try {
    await db.sequelize.sync({ force: true });
    await Data.seed(limit);

    //const book = await db.book.findByPk(141);
    const reviews = await db.review.findAll({
      include: [{ association: "targetBook" }, { association: "reviewer" }],
    });

    app.listen(3001, () => console.log("Listening on port 3001!"));
  } catch (error) {
    console.log(error);
  }
})(RECOMMENDED_BOOKS_QUANTITY);
