'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class AirplaneSeatClass extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    AirplaneSeatClass.init({
        airplaneId: DataTypes.INTEGER,
        seatClassId: DataTypes.INTEGER,
        seat: DataTypes.INTEGER
    }, {
        sequelize,
        modelName: 'AirplaneSeatClass',
        timestamps: false,
    });
    return AirplaneSeatClass;
};
