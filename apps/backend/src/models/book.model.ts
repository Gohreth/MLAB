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
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  HasManyHasAssociationMixin,
  HasManySetAssociationsMixin,
  HasManyAddAssociationsMixin,
  HasManyHasAssociationsMixin,
  HasManyRemoveAssociationMixin,
  HasManyRemoveAssociationsMixin,
  Model,
  ModelDefined,
  Optional,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  NonAttribute,
  ForeignKey,
  Sequelize,
} from "sequelize";
import { Author } from "./author.model";
import { Category } from "./category.model";
import { Review } from "./review.model";

// 'projects' is excluded as it's not an attribute, it's an association.
export class Book extends Model<
  InferAttributes<Book, { omit: "authors" }>,
  InferCreationAttributes<Book, { omit: "authors" }>
> {
  declare _id: number;
  declare title: string;
  declare isbn: string;
  declare pageCount: number;
  declare publishedDate: Date;
  declare thumbnailUrl: string;
  declare shortDescription: string;
  declare longDescription: string;
  declare status: string;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getAuthors: HasManyGetAssociationsMixin<Author>; // Note the null assertions!
  declare addAuthor: HasManyAddAssociationMixin<Author, number>;
  declare countAuthors: HasManyCountAssociationsMixin;

  declare getCategories: HasManyGetAssociationsMixin<Category>; // Note the null assertions!
  declare addCategory: HasManyAddAssociationMixin<Category, number>;
  declare countCategories: HasManyCountAssociationsMixin;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare authors?: NonAttribute<Author[]>; // Note this is optional since it's only populated when explicitly requested in code
  declare categories?: NonAttribute<Category[]>; // Note this is optional since it's only populated when explicitly requested in code
  declare reviews?: NonAttribute<Review[]>; // Note this is optional since it's only populated when explicitly requested in code

  //Instance methods
  async getAverageRating() {}

  declare static associations: {
    authors: Association<Book, Author>;
    categories: Association<Book, Category>;
    reviews: Association<Book, Review>;
  };
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Book.init(
    {
      _id: {
        type: dataTypes.INTEGER,
        primaryKey: true,
      },
      title: {
        type: new dataTypes.STRING(128),
      },
      isbn: {
        type: new dataTypes.STRING(128),
      },
      pageCount: {
        type: dataTypes.INTEGER,
      },
      publishedDate: {
        type: dataTypes.DATE,
      },
      thumbnailUrl: {
        type: new dataTypes.STRING(128),
      },
      shortDescription: {
        type: dataTypes.TEXT,
      },
      longDescription: {
        type: dataTypes.TEXT,
      },
      status: {
        type: new dataTypes.STRING(64),
      },
    },
    {
      sequelize,
      tableName: "books",
    }
  );
};
