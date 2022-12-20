const moment = require('moment');
const { RupiahFormat } = require("../currency.helper");

const transform = (order) => ({
    id: order.id,
    userId: order.userId,
    identifier: order.identifier,
    code: order.code,
    totalPassengers: order.totalPassengers,
    total: {
        raw: order.total,
        formatted: RupiahFormat(order.total),
    },
    discount: {
        raw: order.discount,
        formatted: RupiahFormat(order.discount),
    },
    type: order.type,
    isRequiredVisa: order.isRequiredVisa,
    paymentMethod: order.paymentMethod,
    paidAt: {
        raw: order.paidAt,
        formatted: order.paidAt ? moment(order.paidAt).format('YYYY-MM-DD HH:mm:ss') : null,
    },
    status: order.status,
    transactionDate: {
        raw: order.createdAt,
        formatted: moment(order.createdAt).format('YYYY-MM-DD HH:mm:ss'),
    }
});

const createOrderTransform = (order) => ({
    ...transform(order),
    orderDetails: order.orderDetails.map((orderDetail) => ({
        id: orderDetail.id,
        orderId: orderDetail.orderId,
        flightId: orderDetail.flightId,
        seatType: orderDetail.seatType,
        flight: {
            id: orderDetail.flight.id,
            flightNumber: orderDetail.flightNumber,
            date: {
                raw: orderDetail.flight.date,
                formatted: moment(orderDetail.flight.date).format('YYYY-MM-DD'),
            },
            fromAirportIata: orderDetail.flight.fromAirportIata,
            toAirportIata: orderDetail.flight.toAirportIata,
            std: {
                raw: orderDetail.flight.std,
                hours: moment(orderDetail.flight.std).format('HH:mm'),
                dm: moment(orderDetail.flight.std).format('DD MMM'),
            },
            sta: {
                raw: orderDetail.flight.sta,
                hours: moment(orderDetail.flight.sta).format('HH:mm'),
                dm: moment(orderDetail.flight.sta).format('DD MMM'),
            },
            estimated: orderDetail.flight.estimated,
            type: orderDetail.flight.type,
            seatPrice: {
                id: orderDetail.flight.seatPrices[0].id,
                seatType: orderDetail.flight.seatPrices[0].seatType,
                price: {
                    raw: orderDetail.flight.seatPrices[0].price,
                    formatted: RupiahFormat(orderDetail.flight.seatPrices[0].price),
                },
                discount: {
                    raw: orderDetail.flight.seatPrices[0].discount,
                    formatted: RupiahFormat(orderDetail.flight.seatPrices[0].discount),
                }
            },
            airplane: {
                id: orderDetail.flight.airplane.id,
                type: orderDetail.flight.airplane.type,
                airplaneCode: orderDetail.flight.airplane.airplaneCode,
                airline: {
                    id: orderDetail.flight.airplane.airline.id,
                    name: orderDetail.flight.airplane.airline.name,
                    logo: orderDetail.flight.airplane.airline.logo,
                }
            }
        },
    })),
    orderContact: {
        fullName: order.orderContact.fullName,
        email: order.orderContact.email,
        phone: order.orderContact.phone,
    },
    passengers: order.passengers?.map((passenger) => ({
        id: passenger.id,
        fullName: passenger.fullName,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        citizenship: passenger.citizenship,
        passport: passenger.passport,
        passportCitizenship: passenger.passportCitizenship,
        passportExpire: passenger.passportExpire,
    })) || [],
});

module.exports = {
    CreateOrderTransformer: (order) => createOrderTransform(order),
};
