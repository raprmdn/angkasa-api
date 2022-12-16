const moment = require("moment");
const { RupiahFormat } = require("../currency.helper");

const transform = (flight) => ({
    id: flight.id,
    flightNumber: flight.flightNumber,
    date: {
        raw: flight.date,
        formatted: moment(flight.date).format('YYYY-MM-DD'),
    },
    fromAirport: {
        iata: flight.fromAirportIata,
        name: flight.fromAirportName,
        country: flight.fromAirportCountry,
        city: flight.fromAirportCity,
    },
    toAirport: {
        iata: flight.toAirportIata,
        name: flight.toAirportName,
        country: flight.toAirportCountry,
        city: flight.toAirportCity,
    },
    std: {
        raw: flight.std,
        hours: moment(flight.std).format('HH:mm'),
        dm: moment(flight.std).format('DD MMM'),
    },
    sta: {
        raw: flight.sta,
        hours: moment(flight.sta).format('HH:mm'),
        dm: moment(flight.sta).format('DD MMM'),
    },
    estimated: flight.estimated,
    type: flight.type,
    airplaneId: flight.airplaneId,
});

const seatPricesMapper = (flight) => ({
    class: flight.seatPrices.map((seatPrice) => ({
        id: seatPrice.id,
        type: seatPrice.seatType,
        price: {
            raw: seatPrice.price,
            formatted: RupiahFormat(seatPrice.price),
        },
        discount: {
            raw: seatPrice.discount,
            formatted: RupiahFormat(seatPrice.discount),
        },
    })),
});

const flightIndexTransform = (flight) => ({
    ...transform(flight),
    airplane: flight.airplane,
    ...seatPricesMapper(flight),
});

const flightSearchTransform = (flight) => ({
    ...transform(flight),
    class: {
        id: flight.seatPrices[0].id,
        type: flight.seatPrices[0].seatType,
        price: {
            raw: flight.seatPrices[0].price,
            formatted: RupiahFormat(flight.seatPrices[0].price),
        },
        discount: {
            raw: flight.seatPrices[0].discount,
            formatted: RupiahFormat(flight.seatPrices[0].discount),
        }
    },
    airplane: {
        id: flight.airplane.id,
        type: flight.airplane.type,
        airplaneCode: flight.airplane.airplaneCode,
        seat: flight.airplane.seat,
        airline: {
            id: flight.airplane.airline.id,
            name: flight.airplane.airline.name,
            airlineIata: flight.airplane.airline.airlineIata,
            logo: flight.airplane.airline.logo,
        },
        class: {
            id: flight.airplane.seatClasses[0].id,
            type: flight.airplane.seatClasses[0].type,
            seat: flight.airplane.seatClasses[0].AirplaneSeatClass.seat,
            benefits: flight.airplane.seatClasses[0].benefits.map((benefit) => ({
                id: benefit.id,
                name: benefit.name,
                icon: benefit.icon,
            })),
        }
    }
});

const flightShowTransform = (flight) => ({
    ...transform(flight),
    ...seatPricesMapper(flight),
    airplane: {
        id: flight.airplane.id,
        type: flight.airplane.type,
        airplaneCode: flight.airplane.airplaneCode,
        seat: flight.airplane.seat,
        airline: {
            id: flight.airplane.airline.id,
            name: flight.airplane.airline.name,
            airlineIata: flight.airplane.airline.airlineIata,
            logo: flight.airplane.airline.logo,
        },
        class: flight.airplane.seatClasses.map((seatClass) => ({
            id: seatClass.id,
            type: seatClass.type,
            seat: seatClass.AirplaneSeatClass.seat,
            benefits: flight.airplane.seatClasses[0].benefits.map((benefit) => ({
                id: benefit.id,
                name: benefit.name,
                icon: benefit.icon,
            })),
        })),
    }
});

module.exports = {
    FlightIndexTransform: (flights) => flights.map((flight) => flightIndexTransform(flight)),
    FlightSearchTransform: (flights) => flights.map((flight) => flightSearchTransform(flight)),
    FlightShowTransform: (flight) => flightShowTransform(flight),
};
