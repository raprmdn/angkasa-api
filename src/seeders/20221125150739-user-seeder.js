'use strict';
const bcrypt = require("bcrypt");

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Users', [
            {
                fullname: 'Rafi Putra Ramadhan',
                username: 'raprmdn',
                email: 'rafi@email.com',
                password: await bcrypt.hash('Abc123456!', 10),
                emailVerifiedAt: new Date(),
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                fullname: 'Lilik Wahyu Nugroho',
                username: 'lilik',
                email: 'lilik@email.com',
                password: await bcrypt.hash('Abc123456!', 10),
                emailVerifiedAt: new Date(),
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                fullname: 'Fathoni Zikri Nugroho',
                username: 'fathoni',
                email: 'fathoni@email.com',
                password: await bcrypt.hash('Abc123456!', 10),
                emailVerifiedAt: new Date(),
                roleId: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
            {
                fullname: 'user',
                username: 'user',
                email: 'user@email.com',
                password: await bcrypt.hash('Abc123456!', 10),
                emailVerifiedAt: new Date(),
                roleId: 2,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Users', null, {});
    }
};
