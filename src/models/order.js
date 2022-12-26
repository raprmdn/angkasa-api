'use strict';
const {
    Model
} = require('sequelize');
const { RupiahFormat } = require('../helpers/currency.helper');

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
        hooks: {
            afterCreate: async(attributes, options) => {
                const { User, Notification } = sequelize.models;
                const user = await User.findByPk(attributes.userId);
                const rupiahFormat = RupiahFormat(attributes.total);
                await Notification.create({
                    userId: attributes.userId,
                    title: `Hi ${user.fullname.split(' ')[0]} 👋, You've made a new order #${attributes.code}`,
                    body: `Thanks for choosing Angkasa, recently you've made a new order #${attributes.code} with total payment of ${rupiahFormat}. Please proceed with the payment to complete your order, and we will process your order as soon as possible.`,
                    type: "MAKE_ORDER_NOTIFICATION",
                });
            },
            afterUpdate: async(attributes, options) => {
                const { User, Notification } = sequelize.models;
                const user = await User.findByPk(attributes.userId);

                if (attributes.changed('status') && attributes.status === 'COMPLETED') {
                    const rupiahFormat = RupiahFormat(attributes.total);
                    await Notification.create({
                        userId: attributes.userId,
                        title: `Hi ${user.fullname.split(' ')[0]} 👋, Thanks for your order #${attributes.code}`,
                        body: `Thanks for your order #${attributes.code}. We've received your payment of ${rupiahFormat}, more details about your order will be sent to your email address. Thanks for choosing Angkasa!`,
                        type: "PAID_ORDER_NOTIFICATION",
                    });
                }
            }
        }
    });
    return Order;
};
