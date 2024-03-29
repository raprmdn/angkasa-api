'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Orders', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Users',
                    key: 'id'
                }
            },
            identifier: {
                type: Sequelize.STRING
            },
            code: {
                type: Sequelize.STRING
            },
            totalPassengers: {
                type: Sequelize.INTEGER
            },
            total: {
                type: Sequelize.DOUBLE
            },
            discount: {
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            isRequiredVisa: {
                type: Sequelize.BOOLEAN
            },
            paymentMethod: {
                type: Sequelize.STRING
            },
            paidAt: {
                type: Sequelize.DATE
            },
            status: {
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
        await queryInterface.dropTable('Orders');
    }
};
