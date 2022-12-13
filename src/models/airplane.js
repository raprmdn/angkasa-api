'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Airplane extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Airplane.belongsTo(models.Airline, {
                foreignKey: "airlineId",
                as: "airline",
            });

            Airplane.belongsToMany(models.SeatClass, {
                through: models.AirplaneSeatClass,
                foreignKey: "airplaneId",
                as: "seatClasses",
            });
        }
    }
    Airplane.init({
        type: DataTypes.STRING,
        planeCode: DataTypes.STRING,
        seat: DataTypes.INTEGER,
        airlineId: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'Airplane',
    });
    return Airplane;
};
