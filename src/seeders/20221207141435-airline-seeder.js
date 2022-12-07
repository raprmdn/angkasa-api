'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airlines', [
      {
        name: 'GARUDA INDONESIA',
        slug: 'garuda-indonesia',
        logo: null,
        airlineIata: 'GA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'LION AIRLINES',
        slug: 'lion-airlines',
        logo: null,
        airlineIata: 'JT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BATIK AIR',
        slug: 'batik-air',
        logo: null,
        airlineIata: 'ID',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airlines', null, {});
  }
};
