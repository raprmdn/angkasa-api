'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class Airline extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            Airline.hasMany(models.Airplane, {
                foreignKey: "airlineId",
                as: "airplanes",
            });
        }
    }
    Airline.init({
        name: DataTypes.STRING,
        slug: DataTypes.STRING,
        logo: DataTypes.STRING,
        airlineIata: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'Airline',
    });
    return Airline;
};
