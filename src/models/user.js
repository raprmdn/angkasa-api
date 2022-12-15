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

            User.hasMany(models.Notification, {
              as: 'notifications',
              foreignKey: 'userId'
            })
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

    User.addHook('afterCreate', async (user) => {
      const firstName = user.fullname.split(' ')[0];
      await sequelize.models.Notification.create({
        userId: user.id,
        title: `Hi ${firstName} 👋, Welcome to Angkasa !!`,
        body: "Thanks for signing up. Ready to take off? Now no need worry if you want to go anywhere, find lots of flight ticket to various destination you want only in Angkasa",
        type: "REGISTERED_NOTIFICATION",
      })
    })
    return User;
};
