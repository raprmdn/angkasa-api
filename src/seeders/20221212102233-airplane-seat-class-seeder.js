'use strict';

module.exports = {
    async up (queryInterface, Sequelize) {
        await queryInterface.bulkInsert('AirplaneSeatClasses', [
            {
                airplaneId: 1,
                seatClassId: 1,
                seat: 162,
            },
            {
                airplaneId: 1,
                seatClassId: 3,
                seat: 8,
            },
            {
                airplaneId: 2,
                seatClassId: 4,
                seat: 8,
            },
            {
                airplaneId: 2,
                seatClassId: 3,
                seat: 38,
            },
            {
                airplaneId: 2,
                seatClassId: 1,
                seat: 268,
            },
            {
                airplaneId: 3,
                seatClassId: 3,
                seat: 24,
            },
            {
                airplaneId: 3,
                seatClassId: 1,
                seat: 277,
            },
            {
                airplaneId: 4,
                seatClassId: 3,
                seat: 24,
            },
            {
                airplaneId: 4,
                seatClassId: 1,
                seat: 263,
            },
            {
                airplaneId: 5,
                seatClassId: 1,
                seat: 440,
            },
            {
                airplaneId: 6,
                seatClassId: 1,
                seat: 189,
            },
            {
                airplaneId: 7,
                seatClassId: 1,
                seat: 189,
            },
            {
                airplaneId: 8,
                seatClassId: 3,
                seat: 12
            },
            {
                airplaneId: 8,
                seatClassId: 1,
                seat: 144
            },
            {
                airplaneId: 9,
                seatClassId: 1,
                seat: 189
            }
        ], {});
    },

    async down (queryInterface, Sequelize) {

    }
};
