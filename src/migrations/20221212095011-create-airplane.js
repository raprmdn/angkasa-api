'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Airplanes', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            type: {
                type: Sequelize.STRING
            },
            airplaneCode: {
                type: Sequelize.STRING
            },
            seat: {
                type: Sequelize.INTEGER
            },
            airlineId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Airlines',
                    key: 'id'
                }
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
        await queryInterface.dropTable('Airplanes');
    }
};
