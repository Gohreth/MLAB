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

// 'projects' is excluded as it's not an attribute, it's an association.
export class Author extends Model<
  InferAttributes<Author, { omit: "books" }>,
  InferCreationAttributes<Author, { omit: "books" }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare name: string;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getBooks: HasManyGetAssociationsMixin<Book>; // Note the null assertions!
  declare addBook: HasManyAddAssociationMixin<Book, number>;
  declare addBooks: HasManyAddAssociationsMixin<Book, number>;
  declare setBooks: HasManySetAssociationsMixin<Book, number>;
  declare removeBook: HasManyRemoveAssociationMixin<Book, number>;
  declare removeBooks: HasManyRemoveAssociationsMixin<Book, number>;
  declare hasBook: HasManyHasAssociationMixin<Book, number>;
  declare hasBooks: HasManyHasAssociationsMixin<Book, number>;
  declare countBooks: HasManyCountAssociationsMixin;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare books?: NonAttribute<Book[]>; // Note this is optional since it's only populated when explicitly requested in code

  declare static associations: {
    books: Association<Author, Book>;
  };
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return Author.init(
    {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: new dataTypes.STRING(128),
        allowNull: false,
        unique: true,
      },
    },
    {
      sequelize,
      tableName: "authors",
      timestamps: false,
    }
  );
};
