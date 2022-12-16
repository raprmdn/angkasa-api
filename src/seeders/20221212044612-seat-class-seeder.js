"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("SeatClasses", [
      {
        type: "ECONOMY",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "PREMIUM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "BUSINESS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "FIRST CLASS",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: "QUIET ZONE",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("SeatClass", null, {});
  },
};
