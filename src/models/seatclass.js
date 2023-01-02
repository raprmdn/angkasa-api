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
            SeatClass.belongsToMany(models.Airplane, {
                through: models.AirplaneSeatClass,
                foreignKey: "seatClassId",
                as: "airplanes",
            });

            SeatClass.belongsToMany(models.Benefit, {
                through: models.SeatClassBenefit,
                foreignKey: "seatClassId",
                as: "benefits",
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
