'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Airlines', [
      {
        name: 'GARUDA INDONESIA',
        slug: 'garuda-indonesia',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/884009ae-b512-478a-9c3d-f4dbf22386eb-1608152537048-0c289e6d3a1bcb518efdd93be5ae139c.png",
        airlineIata: 'GA',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'LION AIR',
        slug: 'lion-air',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/1dedfd4e-2f74-4fa9-a3f5-d238c74d3d72-1608152770164-b210808aea30c7543cab4380aca4c3ad.png",
        airlineIata: 'JT',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'BATIK AIR',
        slug: 'batik-air',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/4d7fa58c-a41f-4424-a599-7a2ccd27f270-1608152644158-75f5ada3c1800a50a7ba02a56ae2603b.png",
        airlineIata: 'ID',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'CITILINK',
        slug: 'citilink',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/3deec547-980a-4d75-ac89-6e34eb9ddcf7-1608153225434-f5996f5af379dc69b93f00f8b725e579.png",
        airlineIata: 'QG',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'AIR ASIA',
        slug: 'air-asia',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2022/12/07/9ef0e1f0-2d8c-4441-b010-bf029dcba80c-1670411731382-4a9191284529bab874bff9f2d5f23e1a.png",
        airlineIata: 'QZ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SINGAPORE AIRLINES',
        slug: 'singapore-airlines',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/4f2bec52-f9d8-4fb5-812e-b48f2f55df1e-1608153297684-a3d7e8de8c9928c1e2fde84c53c98c80.png",
        airlineIata: 'SQ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SUPER AIR JET',
        slug: 'super-air-jet',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2021/07/02/082df819-8a50-4c9d-a178-181258372b74-1625237794501-7572e19a7cdb12996c96b225c3a7efa9.png",
        airlineIata: 'IU',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'SRIWIJAYA AIR',
        slug: 'sriwijaya-air',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/97329954-f734-4840-bb0b-a191d251672b-1608153267798-8b0e1941c0d909a586e08d437a15a1f6.png",
        airlineIata: 'SJ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'QATAR AIRWAYS',
        slug: 'qatar-airways',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/dc7c800d-c7bd-452e-a995-033de8d01487-1608153238878-1bc4a7ce106670f49f3fae829f36cef2.png",
        airlineIata: 'QR',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'EMIRATES',
        slug: 'emirates',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/54d5c2fe-a07e-4d41-8e56-1b51e7ab4b05-1608152413692-ceb311367fae1a461318d43ba43a97b5.png",
        airlineIata: 'EK',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'ETIHAD AIRWAYS',
        slug: 'etihad-airways',
        logo: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/rsfit00gsmenlarge1/string/2020/12/17/9165c628-c906-457b-9fab-f44d4890a4da-1608152471643-88fa597cfdfb23a0ad09c068632030e2.png",
        airlineIata: 'EY',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Airlines', null, {});
  }
};
