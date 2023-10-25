/**
 * Keep this file in sync with the code in the "Usage" section
 * in /docs/manual/other-topics/typescript.md
 *
 * Don't include this comment in the md file.
 */
import {
  Association,
  DataTypes,
  HasManyAddAssociationMixin,
  HasManyCountAssociationsMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  Sequelize,
} from "sequelize";
import { Book } from "./book.model";
import { User } from "./user.model";

// 'projects' is excluded as it's not an attribute, it's an association.
export class Review extends Model<
  InferAttributes<Review, { omit: "targetBook" | "reviewer" }>,
  InferCreationAttributes<Review, { omit: "targetBook" | "reviewer" }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare rating: number;
  declare content: string;
  declare bookId: number;
  declare userId: number;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getBooks: HasManyGetAssociationsMixin<Book>; // Note the null assertions!
  declare addBook: HasManyAddAssociationMixin<Book, number>;
  declare hasBook: HasManyHasAssociationMixin<Book, number>;
  declare hasBooks: HasManyHasAssociationsMixin<Book, number>;
  declare countBooks: HasManyCountAssociationsMixin;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare targetBook: NonAttribute<Book>; // Note this is optional since it's only populated when explicitly requested in code
  declare reviewer: NonAttribute<User>;

  declare static associations: {
    targetBook: Association<Review, Book>;
    reviewer: Association<Review, User>;
  };
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Review.init(
    {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      bookId: {
        type: dataTypes.INTEGER,
      },
      userId: {
        type: dataTypes.INTEGER,
      },
      rating: {
        type: dataTypes.INTEGER,
        allowNull: false,
      },
      content: {
        type: dataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: true,
      },
      updatedAt: { type: dataTypes.DATE, allowNull: true },
    },
    {
      sequelize,
      tableName: "reviews",
    }
  );
};
