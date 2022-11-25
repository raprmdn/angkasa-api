'use strict';
const {
    Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            User.belongsTo(models.Role, {
                foreignKey: 'roleId',
                as: 'role',
            });
        }
    }
    User.init({
        fullname: DataTypes.STRING,
        username: DataTypes.STRING,
        email: DataTypes.STRING,
        password: DataTypes.STRING,
        emailVerifiedAt: DataTypes.DATE,
        roleId: DataTypes.INTEGER,
        provider: {
            type: DataTypes.STRING,
            defaultValue: 'local'
        },
        providerId: DataTypes.STRING,
        avatar: DataTypes.STRING
    }, {
        sequelize,
        modelName: 'User',
    });
    return User;
};
