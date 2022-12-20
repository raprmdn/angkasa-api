'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Passenger extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Passenger.belongsTo(models.Order, {
                foreignKey: 'orderId',
                as: 'order',
            });
        }
    }
    Passenger.init({
        orderId: DataTypes.INTEGER,
        fullName: DataTypes.STRING,
        firstName: DataTypes.STRING,
        lastName: DataTypes.STRING,
        citizenship: DataTypes.STRING,
        birthdate: DataTypes.STRING,
        passport: DataTypes.STRING,
        passportCitizenship: DataTypes.STRING,
        passportExpire: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Passenger',
    });
    return Passenger;
};
