'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Airplanes', [
            {
                type: 'Boeing 737-8U3',
                airplaneCode: 'PK-GMC',
                seat: 170,
                airlineId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Boeing 777-3U3ER',
                airplaneCode: 'PK-GIK',
                seat: 314,
                airlineId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Airbus A330-900 NEO',
                airplaneCode: 'PK-GHE',
                seat: 301,
                airlineId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Airbus A330-341',
                airplaneCode: 'PK-GPF',
                seat: 287,
                airlineId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Airbus A330-343',
                airplaneCode: 'PK-LEG',
                seat: 440,
                airlineId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Boeing 737-8GP',
                airplaneCode: 'PK-LJY',
                seat: 189,
                airlineId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Boeing 737-8GP',
                airplaneCode: 'PK-LOH',
                seat: 189,
                airlineId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Airbus A320-214',
                airplaneCode: 'PK-LUP',
                seat: 156,
                airlineId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                type: 'Boeing 737-8GP',
                airplaneCode: 'PK-LDJ',
                seat: 189,
                airlineId: 3,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Airplanes', null, {});
    }
};
