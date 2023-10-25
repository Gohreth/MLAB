import { DataTypes, Model, Sequelize } from "sequelize";

class BookAuthor extends Model {}

export default (sequelize: Sequelize, _dataTypes: typeof DataTypes) => {
  return BookAuthor.init(
    {},
    {
      sequelize,
      modelName: "bookAuthors",
      timestamps: false,
    }
  );
};
