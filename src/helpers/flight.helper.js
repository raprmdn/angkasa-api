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
    CheckAvailabilityFlights: async (id, std, sta, date) => {
        const anyFlight = await Flight.findOne({
            where: {
                airplaneId: id,
                date: date,
            },
        });

        if (anyFlight) {
            const anyFlightStd = moment(anyFlight.std);
            const anyFlightSta = moment(anyFlight.sta).add(2, 'hours');
            const stdMoment = moment(std);
            const staMoment = moment(sta);

            if (stdMoment.isBetween(anyFlightStd, anyFlightSta) || staMoment.isBetween(anyFlightStd, anyFlightSta)) {
                throw apiBadRequestResponse('Airplane is not available at this time')
            }
        }
    },
};
