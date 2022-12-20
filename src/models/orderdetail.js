'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderDetail extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderDetail.belongsTo(models.Order, {
                foreignKey: 'orderId',
                as: 'order',
            });

            OrderDetail.belongsTo(models.Flight, {
                foreignKey: 'flightId',
                as: 'flight',
            });
        }
    }
    OrderDetail.init({
        orderId: DataTypes.INTEGER,
        flightId: DataTypes.INTEGER,
        seatType: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'OrderDetail',
    });
    return OrderDetail;
};
