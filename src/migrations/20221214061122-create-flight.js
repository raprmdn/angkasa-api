'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Flights', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            airplaneId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Airplanes',
                    key: 'id'
                }
            },
            flightNumber: {
                type: Sequelize.STRING
            },
            date: {
                type: Sequelize.DATE
            },
            fromAirportIata: {
                type: Sequelize.STRING
            },
            fromAirportName: {
                type: Sequelize.STRING
            },
            fromAirportCountry: {
                type: Sequelize.STRING
            },
            fromAirportCity: {
                type: Sequelize.STRING
            },
            toAirportIata: {
                type: Sequelize.STRING
            },
            toAirportName: {
                type: Sequelize.STRING
            },
            toAirportCountry: {
                type: Sequelize.STRING
            },
            toAirportCity: {
                type: Sequelize.STRING
            },
            std: {
                type: Sequelize.DATE
            },
            sta: {
                type: Sequelize.DATE
            },
            estimated: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING,
                defaultValue: 'direct'
            },
            status: {
                type: Sequelize.STRING,
                defaultValue: 'SCHEDULED'
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
        await queryInterface.dropTable('Flights');
    }
};
