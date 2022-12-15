'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SeatPrices', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
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
            price: {
                type: Sequelize.DOUBLE
            },
            discount: {
                type: Sequelize.DOUBLE,
                defaultValue: 0
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SeatPrices');
    }
};
