"use strict";
const { Model } = require("sequelize");
// const Roles = require("./roles");

module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Users.belongsTo(models.Roles, {
        as: "role",
        foreignKey: "roleId",
      });
    }
  }
  Users.init(
    {
      fullname: DataTypes.STRING,
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      emailVerifiedAt: DataTypes.DATE,
      roleId: DataTypes.INTEGER,
      provider: DataTypes.STRING,
      providerId: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
