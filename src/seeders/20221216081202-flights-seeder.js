'use strict';

const moment = require("moment");

const length = 7;
const dateNow = moment().format('YYYY-MM-DD HH:mm:ss');
const flights = [];

const airplane1 = [...Array(length)].map((_, i) => {
    const date = moment(dateNow).add(i, "days").format('YYYY-MM-DD HH:mm:ss');
    return {
        airplaneId: 1,
        flightNumber: 'GA 420',
        date: date,
        fromAirportIata: 'CGK',
        fromAirportName: 'Soekarno-Hatta International Airport',
        fromAirportCountry: 'Indonesia',
        fromAirportCity: 'Jakarta',
        toAirportIata: 'DPS',
        toAirportName: 'Ngurah Rai (Bali) International Airport',
        toAirportCountry: 'Indonesia',
        toAirportCity: 'Denpasar',
        std: moment(date).add(11, 'hours').add(40, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        sta: moment(date).add(14, 'hours').add(35, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        estimated: '1h 55m',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
});

const airplane2 = [...Array(length)].map((_, i) => {
    const date = moment(dateNow).add(i, "days").format('YYYY-MM-DD HH:mm:ss');
    return {
        airplaneId: 2,
        flightNumber: 'GA 421',
        date: date,
        fromAirportIata: 'CGK',
        fromAirportName: 'Soekarno-Hatta International Airport',
        fromAirportCountry: 'Indonesia',
        fromAirportCity: 'Jakarta',
        toAirportIata: 'DPS',
        toAirportName: 'Ngurah Rai (Bali) International Airport',
        toAirportCountry: 'Indonesia',
        toAirportCity: 'Denpasar',
        std: moment(date).add(8, 'hours').add(40, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        sta: moment(date).add(11, 'hours').add(35, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        estimated: '1h 50m',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
});

const airplane6 = [...Array(length)].map((_, i) => {
    const date = moment(dateNow).add(i, "days").format('YYYY-MM-DD HH:mm:ss');
    return {
        airplaneId: 6,
        flightNumber: 'JT 620',
        date: date,
        fromAirportIata: 'CGK',
        fromAirportName: 'Soekarno-Hatta International Airport',
        fromAirportCountry: 'Indonesia',
        fromAirportCity: 'Jakarta',
        toAirportIata: 'DPS',
        toAirportName: 'Ngurah Rai (Bali) International Airport',
        toAirportCountry: 'Indonesia',
        toAirportCity: 'Denpasar',
        std: moment(date).add(18, 'hours').format("YYYY-MM-DD HH:mm:ss"),
        sta: moment(date).add(20, 'hours').add(50, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        estimated: '1h 55m',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
});

const airplane7 = [...Array(length)].map((_, i) => {
    const date = moment(dateNow).add(i, "days").format('YYYY-MM-DD HH:mm:ss');
    return {
        airplaneId: 7,
        flightNumber: 'JT 621',
        date: date,
        fromAirportIata: 'CGK',
        fromAirportName: 'Soekarno-Hatta International Airport',
        fromAirportCountry: 'Indonesia',
        fromAirportCity: 'Jakarta',
        toAirportIata: 'DPS',
        toAirportName: 'Ngurah Rai (Bali) International Airport',
        toAirportCountry: 'Indonesia',
        toAirportCity: 'Denpasar',
        std: moment(date).add(13, 'hours').format("YYYY-MM-DD HH:mm:ss"),
        sta: moment(date).add(15, 'hours').add(50, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        estimated: '1h 50m',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
});

const airplane8 = [...Array(length)].map((_, i) => {
    const date = moment(dateNow).add(i, "days").format('YYYY-MM-DD HH:mm:ss');
    return {
        airplaneId: 8,
        flightNumber: 'ID 6504',
        date: date,
        fromAirportIata: 'CGK',
        fromAirportName: 'Soekarno-Hatta International Airport',
        fromAirportCountry: 'Indonesia',
        fromAirportCity: 'Jakarta',
        toAirportIata: 'DPS',
        toAirportName: 'Ngurah Rai (Bali) International Airport',
        toAirportCountry: 'Indonesia',
        toAirportCity: 'Denpasar',
        std: moment(date).add(17, 'hours').add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        sta: moment(date).add(20, 'hours').add(20, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        estimated: '1h 55m',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
});

const airplane9 = [...Array(length)].map((_, i) => {
    const date = moment(dateNow).add(i, "days").format('YYYY-MM-DD HH:mm:ss');
    return {
        airplaneId: 9,
        flightNumber: 'ID 6505',
        date: date,
        fromAirportIata: 'CGK',
        fromAirportName: 'Soekarno-Hatta International Airport',
        fromAirportCountry: 'Indonesia',
        fromAirportCity: 'Jakarta',
        toAirportIata: 'DPS',
        toAirportName: 'Ngurah Rai (Bali) International Airport',
        toAirportCountry: 'Indonesia',
        toAirportCity: 'Denpasar',
        std: moment(date).add(12, 'hours').add(30, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        sta: moment(date).add(15, 'hours').add(20, 'minutes').format("YYYY-MM-DD HH:mm:ss"),
        estimated: '1h 50m',
        createdAt: new Date(),
        updatedAt: new Date(),
    }
});

flights.push(...airplane1);
flights.push(...airplane2);
flights.push(...airplane6);
flights.push(...airplane7);
flights.push(...airplane8);
flights.push(...airplane9);

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('Flights', flights, { returning: true }).then(async (flights) => {
            const seatPrices = [];
            flights.map(flight => {
                if (flight.airplaneId === 1) {
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'BUSINESS',
                        price: 11010720,
                        discount: 35000,
                    });
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'ECONOMY',
                        price: 1921020,
                    });
                }

                if (flight.airplaneId === 2) {
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'FIRST CLASS',
                        price: 18672528,
                        discount: 75000,
                    });
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'BUSINESS',
                        price: 12756600,
                        discount: 35000,
                    });
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'ECONOMY',
                        price: 7372600,
                    });
                }

                if (flight.airplaneId === 6) {
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'ECONOMY',
                        price: 990080,
                    });
                }

                if (flight.airplaneId === 7) {
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'ECONOMY',
                        price: 1259780,
                    });
                }

                if (flight.airplaneId === 8) {
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'ECONOMY',
                        price: 1157930,
                    });
                }

                if (flight.airplaneId === 9) {
                    seatPrices.push({
                        flightId: flight.id,
                        seatType: 'ECONOMY',
                        price: 1792830,
                    });
                }
            });

            await queryInterface.bulkInsert('SeatPrices', seatPrices);
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Flights', null, {});
    }
};
