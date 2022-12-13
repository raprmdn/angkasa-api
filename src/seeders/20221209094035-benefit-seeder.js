'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Benefits', [
      {
        name: "HIBURAN",
        icon: "https://cdn4.iconfinder.com/data/icons/48-bubbles/48/24.TV-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BAGASI 15 KG",
        icon: "https://cdn3.iconfinder.com/data/icons/kicon-business/24/suitcase-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BAGASI 30 KG",
        icon: "https://cdn3.iconfinder.com/data/icons/kicon-business/24/suitcase-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "BAGASI 50 KG",
        icon: "https://cdn3.iconfinder.com/data/icons/kicon-business/24/suitcase-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "WIFI",
        icon: "https://cdn3.iconfinder.com/data/icons/feather-5/24/wifi-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "MAKANAN",
        icon: "https://cdn2.iconfinder.com/data/icons/ui-basic-outline-2/512/UI_Basic_outline-120-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "USB PORT / POWER",
        icon: "https://cdn0.iconfinder.com/data/icons/iphone-7-airpods-icons/24/lightning-usb-256.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Benefits', null, {})
  }
};
