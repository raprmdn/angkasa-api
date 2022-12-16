'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Flight extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Flight.belongsTo(models.Airplane, {
                foreignKey: "airplaneId",
                as: "airplane",
            });

            Flight.hasMany(models.SeatPrice, {
                foreignKey: "flightId",
                as: "seatPrices",
            });
        }
    }
    Flight.init({
        airplaneId: DataTypes.INTEGER,
        flightNumber: DataTypes.STRING,
        date: DataTypes.DATE,
        fromAirportIata: DataTypes.STRING,
        fromAirportName: DataTypes.STRING,
        fromAirportCountry: DataTypes.STRING,
        fromAirportCity: DataTypes.STRING,
        toAirportIata: DataTypes.STRING,
        toAirportName: DataTypes.STRING,
        toAirportCountry: DataTypes.STRING,
        toAirportCity: DataTypes.STRING,
        std: DataTypes.DATE,
        sta: DataTypes.DATE,
        estimated: DataTypes.STRING,
        type: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Flight',
    });
    return Flight;
};
