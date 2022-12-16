const { Flight } = require("../models");
const moment = require("moment");
const { apiBadRequestResponse } = require("../utils/apiResponse.utils");

module.exports = {
    FormatFlightDate: (date) => moment(date).format('YYYY-MM-DD HH:mm:ss'),
    FormatFlightEstimated: (estimated) => {
        const hours = moment.duration(estimated, 'm').hours();
        const minutes = moment.duration(estimated, 'm').minutes();
        return `${hours}h ${minutes}m`;
    },
    generateFlightNumber: (airline) => {
        const random = Math.floor(10 + Math.random() * 9000);
        return `${airline.airlineIata} ${random}`;
    },
    CheckAvailabilityFlights: async (id, std, sta, date, flightId) => {
        const flights = await Flight.findAll({
            where: {
                airplaneId: id,
                date: date,
            },
        });

        if (flights.length > 0) {
            flights.forEach((flight) => {
                if (+flightId !== flight.id) {
                    const stdFlight = moment(flight.std);
                    const staFlight = moment(flight.sta).add(2, 'hours');
                    const stdRequest = moment(std);
                    const staRequest = moment(sta);

                    if (stdRequest.isBetween(stdFlight, staFlight) || staRequest.isBetween(stdFlight, staFlight)) {
                        throw apiBadRequestResponse('Airplane is not available at the selected time');
                    }
                }
            });
        }
    },
};
