import { DB_CONFIG } from "../config/db.config";
import { DataTypes, Sequelize } from "sequelize";
import AuthorInit from "../models/author.model";
import BookInit from "../models/book.model";
import BookAuthorInit from "../models/bookAuthor.model";
import CategoryInit from "../models/category.model";
import BookCategoryInit from "../models/bookCategory.model";
import UserInit from "../models/user.model";
import ReviewInit from "../models/review.model";

const sequelize = new Sequelize(
  DB_CONFIG.DB!,
  DB_CONFIG.USER!,
  DB_CONFIG.PASSWORD!,
  {
    host: DB_CONFIG.HOST!,
    port: parseInt(DB_CONFIG.PORT!),
    dialect: "postgres",
    pool: {
      max: DB_CONFIG.pool.max,
      min: DB_CONFIG.pool.min,
      acquire: DB_CONFIG.pool.acquire,
      idle: DB_CONFIG.pool.idle,
    },
    logging: false,
  }
);

interface Database {
  sequelize: Sequelize;
  author: ReturnType<typeof AuthorInit>;
  book: ReturnType<typeof BookInit>;
  category: ReturnType<typeof CategoryInit>;
  bookCategory: ReturnType<typeof BookCategoryInit>;
  bookAuthor: ReturnType<typeof BookAuthorInit>;
  user: ReturnType<typeof UserInit>;
  review: ReturnType<typeof ReviewInit>;
}

const db: Database = {
  sequelize: sequelize,
  author: AuthorInit(sequelize, DataTypes),
  book: BookInit(sequelize, DataTypes),
  bookAuthor: BookAuthorInit(sequelize, DataTypes),
  category: CategoryInit(sequelize, DataTypes),
  bookCategory: BookCategoryInit(sequelize, DataTypes),
  user: UserInit(sequelize, DataTypes),
  review: ReviewInit(sequelize, DataTypes),
};

// ** Relationships (Sequelize associations) **

//Author many-to-many Book
db.author.belongsToMany(db.book, {
  through: db.bookAuthor,
  as: "books",
});

//Book many-to-many Author
db.book.belongsToMany(db.author, {
  through: db.bookAuthor,
  as: "authors",
});

//Category many-to-many Book
db.category.belongsToMany(db.book, {
  through: db.bookCategory,
  as: "books",
});

//Book many-to-many Category
db.book.belongsToMany(db.category, {
  through: db.bookCategory,
  as: "categories",
});

//Book one-to-many Review
db.book.hasMany(db.review, {
  as: "reviews",
  foreignKey: "bookId",
});

//User one-to-many Review
db.user.hasMany(db.review, {
  as: "reviews",
  foreignKey: "userId",
});

//Review many-to-one User
db.review.belongsTo(db.user, {
  as: "reviewer",
  foreignKey: "userId",
});

//Review many-to-one Book
db.review.belongsTo(db.book, {
  as: "targetBook",
  foreignKey: "bookId",
});

export default db;
