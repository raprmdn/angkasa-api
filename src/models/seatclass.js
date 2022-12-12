"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeatClass extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SeatClass.hasMany(models.SeatClassBenefit, {
        foreignKey: "seatClasId",
        as: "seatClassBenefits",
      });
    }
  }
  SeatClass.init(
    {
      type: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "SeatClass",
    }
  );
  return SeatClass;
};
