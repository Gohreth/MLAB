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
import { Review } from "./review.model";
import { Password } from "../utils/password.util";

// 'projects' is excluded as it's not an attribute, it's an association.
export class User extends Model<
  InferAttributes<User, { omit: "reviews" | "following" | "followers" }>,
  InferCreationAttributes<User, { omit: "reviews" | "following" | "followers" }>
> {
  // id can be undefined during creation when using `autoIncrement`
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;

  // timestamps!
  // createdAt can be undefined during creation
  declare createdAt: CreationOptional<Date>;
  // updatedAt can be undefined during creation
  declare updatedAt: CreationOptional<Date>;

  // Since TS cannot determine model association at compile time
  // we have to declare them here purely virtually
  // these will not exist until `Model.init` was called.
  declare getReviews: HasManyGetAssociationsMixin<Review>; // Note the null assertions!
  declare addReview: HasManyAddAssociationMixin<Review, number>;
  declare setReviews: HasManySetAssociationsMixin<Review, number>;
  declare removeReview: HasManyRemoveAssociationMixin<Review, number>;
  declare hasReview: HasManyHasAssociationMixin<Review, number>;
  declare countReviews: HasManyCountAssociationsMixin;

  declare getFollowings: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addFollowing: HasManyAddAssociationMixin<User, number>;
  declare setFollowings: HasManySetAssociationsMixin<User, number>;
  declare removeFollowing: HasManyRemoveAssociationMixin<User, number>;
  declare hasFollowing: HasManyHasAssociationMixin<User, number>;
  declare countFollowings: HasManyCountAssociationsMixin;

  declare getFollowers: HasManyGetAssociationsMixin<User>; // Note the null assertions!
  declare addFollower: HasManyAddAssociationMixin<User, number>;
  declare setFollowers: HasManySetAssociationsMixin<User, number>;
  declare removeFollower: HasManyRemoveAssociationMixin<User, number>;
  declare hasFollower: HasManyHasAssociationMixin<User, number>;
  declare countFollowers: HasManyCountAssociationsMixin;

  // You can also pre-declare possible inclusions, these will only be populated if you
  // actively include a relation.
  declare reviews?: NonAttribute<Review[]>; // Note this is optional since it's only populated when explicitly requested in code
  declare following?: NonAttribute<User[]>;
  declare followers?: NonAttribute<User[]>;

  declare static associations: {
    reviews: Association<User, Review>;
    following: Association<User, User>;
    followers: Association<User, User>;
  };
}

export default (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
  return User.init(
    {
      id: {
        type: dataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: dataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: dataTypes.STRING,
        allowNull: false,
      },
      createdAt: {
        type: dataTypes.DATE,
        allowNull: false,
      },
      updatedAt: { type: dataTypes.DATE, allowNull: false },
    },
    {
      sequelize,
      tableName: "users",
      hooks: {
        async beforeCreate(attributes, _options) {
          if (attributes.changed("password")) {
            attributes.setDataValue(
              "password",
              await Password.toHash(attributes.getDataValue("password"))
            );
          }
        },
      },
    }
  );
};
