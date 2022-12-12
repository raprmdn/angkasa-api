"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SeatClassBenefit extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SeatClassBenefit.belongsTo(models.SeatClass, {
        foreignKey: "seatClassId",
        as: "seatClass",
      });
      SeatClassBenefit.belongsTo(models.Benefit, {
        foreignKey: "benefitId",
        as: "benefit",
      });
    }
  }
  SeatClassBenefit.init(
    {
      seatClassId: DataTypes.INTEGER,
      benefitId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "SeatClassBenefit",
    }
  );
  return SeatClassBenefit;
};
