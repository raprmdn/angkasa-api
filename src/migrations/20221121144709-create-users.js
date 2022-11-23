'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            fullname: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            emailVerifiedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
            roleId: {
                type: Sequelize.INTEGER,
                allowNull: true,
                references: {
                    model: 'Roles',
                    key: 'id',
                }
            },
            provider: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            providerId: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            avatar: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Users');
    }
};
