"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("SeatClassBenefits", [
            {
                seatClassId: 1,
                benefitId: 2,
            },
            {
                seatClassId: 1,
                benefitId: 6,
            },
            {
                seatClassId: 3,
                benefitId: 1,
            },
            {
                seatClassId: 3,
                benefitId: 3,
            },
            {
                seatClassId: 3,
                benefitId: 5,
            },
            {
                seatClassId: 3,
                benefitId: 6,
            },
            {
                seatClassId: 3,
                benefitId: 7,
            },
            {
                seatClassId: 4,
                benefitId: 1,
            },
            {
                seatClassId: 4,
                benefitId: 4,
            },
            {
                seatClassId: 4,
                benefitId: 5,
            },
            {
                seatClassId: 4,
                benefitId: 6,
            },
            {
                seatClassId: 4,
                benefitId: 7,
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("SeatClassBenefits", null, {});
    },
};
