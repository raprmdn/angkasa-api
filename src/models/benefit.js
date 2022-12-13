"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class Benefit extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            Benefit.belongsToMany(models.SeatClass, {
                through: models.SeatClassBenefit,
                foreignKey: "benefitId",
                as: "seatClasses",
            });
        }
    }
    Benefit.init(
        {
            name: DataTypes.STRING,
            icon: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Benefit",
        }
    );
    return Benefit;
};
