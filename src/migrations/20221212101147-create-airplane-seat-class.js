'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('AirplaneSeatClasses', {
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
                    key: 'id',
                }
            },
            seatClassId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'SeatClasses',
                    key: 'id',
                }
            },
            seat: {
                type: Sequelize.INTEGER,
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('AirplaneSeatClasses');
    }
};
