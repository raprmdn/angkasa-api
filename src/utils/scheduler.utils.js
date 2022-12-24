const cron = require('node-cron');
const { Flight } = require('../models');
const { Op } = require('sequelize');
const moment = require('moment');

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
