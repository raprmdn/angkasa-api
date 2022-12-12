"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SeatClassBenefits", [
      {
        seatClassId: 1,
        benefitId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatClassId: 1,
        benefitId: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatClassId: 3,
        benefitId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatClassId: 3,
        benefitId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatClassId: 3,
        benefitId: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        seatClassId: 3,
        benefitId: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SeatClassBenefits", null, {});
  },
};
