'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Airports', [
            {
                name: 'Soekarno-Hatta International Airport',
                country: 'Indonesia',
                region: 'Banten',
                municipality: 'Jakarta',
                iata: 'CGK',
                type: 'large_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Ngurah Rai International Airport',
                country: 'Indonesia',
                region: 'Bali',
                municipality: 'Denpasar',
                iata: 'DPS',
                type: 'large_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Juanda International Airport',
                country: 'Indonesia',
                region: 'Jawa Timur (East Java)',
                municipality: 'Surabaya',
                iata: 'SUB',
                type: 'large_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Adi Sutjipto International Airport',
                country: 'Indonesia',
                region: 'Yogyakarta',
                municipality: 'Yogyakarta',
                iata: 'JOG',
                type: 'large_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Kualanamu International Airport',
                country: 'Indonesia',
                region: 'Sumatera Utara (North Sumatra)',
                municipality: 'Medan',
                iata: 'KNO',
                type: 'large_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sultan Hasanuddin International Airport',
                country: 'Indonesia',
                region: 'Sulawesi Selaatan (South Sulawesi)',
                municipality: 'Makassar',
                iata: 'UPG',
                type: 'large_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Minangkabau International Airport',
                country: 'Indonesia',
                region: 'Sumatera Barat (West Sumatra)',
                municipality: 'Padang',
                iata: 'PDG',
                type: 'medium_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Sultan Mahmud Badaruddin II International Airport',
                country: 'Indonesia',
                region: 'Sumatera Selatan (South Sumatra)',
                municipality: 'Palembang',
                iata: 'PLM',
                type: 'medium_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Syamsudin Noor International Airport',
                country: 'Indonesia',
                region: 'Kalimantan Selatan (South Kalimantan)',
                municipality: 'Banjarmasin',
                iata: 'BDJ',
                type: 'small_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: 'Supadio International Airport',
                country: 'Indonesia',
                region: 'Kalimantan Barat (West Kalimantan)',
                municipality: 'Pontianak',
                iata: 'PNK',
                type: 'medium_airport',
                createdAt: new Date(),
                updatedAt: new Date()
            }
            ], {});
    },

    async down(queryInterface, Sequelize) {
         await queryInterface.bulkDelete('Airports', null, {});
    }
};
