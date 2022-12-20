'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class OrderContact extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            OrderContact.belongsTo(models.Order, {
                foreignKey: 'orderId',
                as: 'order',
            });
        }
    }
    OrderContact.init({
        orderId: DataTypes.INTEGER,
        fullName: DataTypes.STRING,
        email: DataTypes.STRING,
        phone: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'OrderContact',
    });
    return OrderContact;
};
