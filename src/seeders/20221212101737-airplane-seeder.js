'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Airplanes', [
            {
                type: 'Boeing 737-8U3',
                planeCode: 'PK-GMC',
                seat: 170,
                airlineId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Boeing 777-300ER',
                planeCode: 'PK-GIE',
                seat: 314,
                airlineId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Airplanes', null, {});
    }
};
