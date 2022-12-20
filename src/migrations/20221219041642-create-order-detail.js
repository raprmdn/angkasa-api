'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('OrderDetails', {
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
            flightId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Flights',
                    key: 'id'
                }
            },
            seatType: {
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
        await queryInterface.dropTable('OrderDetails');
    }
};
