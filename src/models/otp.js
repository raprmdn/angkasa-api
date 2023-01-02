'use strict';
const {
    Model
} = require('sequelize');
const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    class Otp extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Otp.init({
        email: DataTypes.STRING,
        otp: DataTypes.STRING,
        otpType: DataTypes.STRING,
        expirationTime: {
            type: DataTypes.DATE,
            /**
             * @param {number} value
             * @description This function is used to set the expiration time of the OTP in minutes
             */
            set(value) {
                this.setDataValue('expirationTime', moment().add(value, 'minutes').format('YYYY-MM-DD HH:mm:ss'));
            }
        }
    }, {
        sequelize,
        modelName: 'Otp',
    });
    return Otp;
};
