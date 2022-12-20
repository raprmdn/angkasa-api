'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Passengers', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            orderId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Orders',
                    key: 'id'
                }
            },
            fullName: {
                type: Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            citizenship: {
                type: Sequelize.STRING
            },
            birthdate: {
                type: Sequelize.STRING
            },
            passport: {
                type: Sequelize.STRING
            },
            passportCitizenship: {
                type: Sequelize.STRING
            },
            passportExpire: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Passengers');
    }
};
