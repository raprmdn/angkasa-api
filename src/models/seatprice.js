'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class SeatPrice extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            SeatPrice.belongsTo(models.Flight, {
                foreignKey: "flightId",
                as: "flight",
            });
        }
    }
    SeatPrice.init({
        flightId: DataTypes.INTEGER,
        seatType: DataTypes.STRING,
        price: DataTypes.DOUBLE,
        discount: DataTypes.DOUBLE
    }, {
        sequelize,
        modelName: 'SeatPrice',
        timestamps: false,
    });
    return SeatPrice;
};
