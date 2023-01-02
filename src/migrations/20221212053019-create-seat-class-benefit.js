'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('SeatClassBenefits', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            seatClassId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'SeatClasses',
                    key: 'id',
                },
            },
            benefitId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'Benefits',
                    key: 'id',
                },
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('SeatClassBenefits');
    }
};
