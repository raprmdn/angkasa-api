'use strict';

const { SeedFlights, SeedFlightSeatPrices } = require("../helpers/flight.helper");

const flights = SeedFlights();

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Flights', flights, { returning: true }).then(async (flights) => {
            const seatPrices = SeedFlightSeatPrices(flights);
            await queryInterface.bulkInsert('SeatPrices', seatPrices);
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Flights', null, {});
        await queryInterface.bulkDelete('SeatPrices', null, {});
    }
};
