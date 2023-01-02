const cron = require('node-cron');
const { Flight, SeatPrice } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');
const { SeedFlights, SeedFlightSeatPrices } = require("../helpers/flight.helper");

// Run Every 1 Hour
cron.schedule('0 * * * *', async () => {
    const flights = await Flight.findAll({
        where: {
            date: {
                [Op.gte]: moment().format('YYYY-MM-DD 00:00:00'),
                [Op.lte]: moment().format('YYYY-MM-DD 23:59:59'),
            },
            std: {
                [Op.lte]: moment().format('YYYY-MM-DD HH:mm:ss'),
            },
        }
    });

    let flightNumbers = [];
    await Promise.all(
        flights.map(async flight => {
            if (flight.status === 'SCHEDULED') {
                flightNumbers.push(flight.flightNumber);
                await flight.update({
                    status: 'LANDED',
                });
            }
        }),
    );

    console.info(`
    Scheduler: (Flights Scheduler) [Update the Flight Status to LANDED every 1 hour]
    Affected rows: ${flightNumbers.length}
    Affected flight numbers: ${flightNumbers.join(', ')}
    Type: UPDATE_FLIGHT_STATUS
    Triggered at: ${moment().format('MMMM DD, YYYY HH:mm:ss')}
    `);
});

// Run every day at midnight
cron.schedule('0 0 * * *', async () => {
    const maxDate = await Flight.max('date');
    const maxDateMoment = moment(maxDate).format('YYYY MM DD HH:mm:ss');
    const now = moment().format('YYYY MM DD HH:mm:ss');

    if (now > maxDateMoment) {
        console.info(`There's no more flights scheduled. New flights will be created.`);
        const flights = SeedFlights();
        await Flight.bulkCreate(flights).then(async (flights) => {
            const seatPrices = SeedFlightSeatPrices(flights);
            await SeatPrice.bulkCreate(seatPrices);
            console.info(`
        Scheduler: (Flights Scheduler) [Create new flights for the next 7 days]
        Flights created: ${flights.length}
        Flights:
        ${JSON.stringify(flights, null, 2)}
        Seat Prices:
        ${JSON.stringify(seatPrices, null, 2)}
        Type: CREATE_FLIGHTS
        Triggered at: ${moment().format('MMMM DD, YYYY HH:mm:ss')}
        `);
        });
    }

    console.info(`
    Scheduler: (Flights Scheduler) [Check if there's no more flights, if so, create new flights schedule]
    Runner: Running every 1 day at 01:00
    Max Date: ${maxDateMoment}
    Now: ${now}
    Type: CHECK_FLIGHTS
    Triggered at: ${moment().format('MMMM DD, YYYY HH:mm:ss')}
    Status: ${now >= maxDateMoment ? 'No more flights scheduled. New flights schedule has been created.' : 'There are still flights scheduled'}
    `)
});
