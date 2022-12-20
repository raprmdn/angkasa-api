'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Order extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Order.belongsTo(models.User, {
                foreignKey: 'userId',
                as: 'user',
            });

            Order.hasMany(models.OrderDetail, {
                foreignKey: 'orderId',
                as: 'orderDetails',
            });

            Order.hasOne(models.OrderContact, {
                foreignKey: 'orderId',
                as: 'orderContact',
            });

            Order.hasMany(models.Passenger, {
                foreignKey: 'orderId',
                as: 'passengers',
            });
        }
    }
    Order.init({
        userId: DataTypes.INTEGER,
        identifier: DataTypes.STRING,
        code: DataTypes.STRING,
        totalPassengers: DataTypes.INTEGER,
        total: DataTypes.DOUBLE,
        discount: DataTypes.INTEGER,
        type: DataTypes.STRING,
        isRequiredVisa: DataTypes.BOOLEAN,
        paymentMethod: DataTypes.STRING,
        paidAt: DataTypes.DATE,
        status: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};
