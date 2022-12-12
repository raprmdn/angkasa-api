'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Airports', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false
            },
            country: {
                type: Sequelize.STRING,
                allowNull: false
            },
            region: {
                type: Sequelize.STRING,
                allowNull: false
            },
            municipality: {
                type: Sequelize.STRING,
                allowNull: false
            },
            iata: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING,
                allowNull: false
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('Airports');
    }
};
