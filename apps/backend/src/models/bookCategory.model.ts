import { DataTypes, Model, Sequelize } from "sequelize";

class BookCategory extends Model {}

export default (sequelize: Sequelize, _dataTypes: typeof DataTypes) => {
  return BookCategory.init(
    {},
    {
      sequelize,
      modelName: "bookCategories",
      timestamps: false,
    }
  );
};
