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

const contactAndPassengers = (order) => ({
    orderContact: {
        fullName: order.orderContact.fullName,
        email: order.orderContact.email,
        phone: order.orderContact.phone,
    },
    passengers: order.passengers?.map((passenger) => ({
        id: passenger.id,
        fullName: passenger.fullName,
        type: passenger.type,
        number: passenger.number,
    })) || [],
})

const createOrderTransform = (order) => ({
    ...transform(order),
    orderDetails: order.orderDetails.map((orderDetail) => ({
        id: orderDetail.id,
        orderId: orderDetail.orderId,
        flightId: orderDetail.flightId,
        seatType: orderDetail.seatType,
        flight: {
            id: orderDetail.flight.id,
            flightNumber: orderDetail.flight.flightNumber,
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
        },
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
                name: orderDetail.flight.airplane.airline.name,
                logo: orderDetail.flight.airplane.airline.logo,
            }
        }
    })),
    ...contactAndPassengers(order)
});

const indexOrderTransform = (order) => ({
    ...transform(order),
    orderDetails: order.orderDetails.map((orderDetail) => ({
        id: orderDetail.id,
        flightNumber: orderDetail.flight.flightNumber,
        fromAirportIata: orderDetail.flight.fromAirportIata,
        toAirportIata: orderDetail.flight.toAirportIata,
        date: moment(orderDetail.flight.date).format('YYYY-MM-DD'),
        std: moment(orderDetail.flight.std).format('HH:mm'),
        sta: moment(orderDetail.flight.sta).format('HH:mm'),
        estimated: orderDetail.flight.estimated,
        airline: {
            name: orderDetail.flight.airplane.airline.name,
            logo: orderDetail.flight.airplane.airline.logo,
        }
    })),
});

const showOrderTransform = (order) => ({
    ...transform(order),
    orderDetails: order.orderDetails.map((orderDetail) => ({
        id: orderDetail.id,
        orderId: orderDetail.orderId,
        flightId: orderDetail.flightId,
        seatType: orderDetail.seatType,
        flight: {
            id: orderDetail.flight.id,
            flightNumber: orderDetail.flight.flightNumber,
            date: {
                raw: orderDetail.flight.date,
                formatted: moment(orderDetail.flight.date).format('YYYY-MM-DD'),
            },
            fromAirport: {
                iata: orderDetail.flight.fromAirportIata,
                name: orderDetail.flight.fromAirportName,
                country: orderDetail.flight.fromAirportCountry,
                city: orderDetail.flight.fromAirportCity,
            },
            toAirport: {
                iata: orderDetail.flight.toAirportIata,
                name: orderDetail.flight.toAirportName,
                country: orderDetail.flight.toAirportCountry,
                city: orderDetail.flight.toAirportCity,
            },
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
        },
        airplane: {
            type: orderDetail.flight.airplane.type,
            airplaneCode: orderDetail.flight.airplane.airplaneCode,
            airline: {
                name: orderDetail.flight.airplane.airline.name,
                logo: orderDetail.flight.airplane.airline.logo,
            },
            seatClass: {
                type: orderDetail.flight.airplane.seatClasses[0].type,
                benefits: orderDetail.flight.airplane.seatClasses[0].benefits.map((benefit) => ({
                    name: benefit.name,
                    icon: benefit.icon,
                })),
            }
        }
    })),
    ...contactAndPassengers(order)
});

const orderInvoiceTransform = (order) => ({
    id: order.id,
    code: order.code,
    totalPassengers: order.totalPassengers,
    total: RupiahFormat(order.total),
    discount: RupiahFormat(order.discount),
    paymentMethod: order.paymentMethod,
    paidAt: moment(order.paidAt).format('lll'),
    type: order.type,
    status: order.status,
    user: {
        fullName: order.user.fullname,
        email: order.user.email,
    },
    contact: {
        fullName: order.orderContact.fullName,
        email: order.orderContact.email,
        phone: order.orderContact.phone,
    },
    orderDetails: order.orderDetails.map((orderDetail) => ({
        flight: {
            flightNumber: orderDetail.flight.flightNumber,
            date: moment(orderDetail.flight.date).format('YYYY-MM-DD'),
            fromAirport: {
                iata: orderDetail.flight.fromAirportIata,
                name: orderDetail.flight.fromAirportName,
                country: orderDetail.flight.fromAirportCountry,
                city: orderDetail.flight.fromAirportCity,
            },
            toAirport: {
                iata: orderDetail.flight.toAirportIata,
                name: orderDetail.flight.toAirportName,
                country: orderDetail.flight.toAirportCountry,
                city: orderDetail.flight.toAirportCity,
            },
            std: moment(orderDetail.flight.std).format('HH:mm'),
            sta: moment(orderDetail.flight.sta).format('HH:mm'),
            estimated: orderDetail.flight.estimated,
            type: orderDetail.flight.type,
        },
        seatPrice: {
            seatType: orderDetail.flight.seatPrices[0].seatType,
            total: {
                raw: orderDetail.flight.seatPrices[0].price,
                formatted: RupiahFormat(orderDetail.flight.seatPrices[0].price),
            },
            price: {
                raw: orderDetail.flight.seatPrices[0].price * order.totalPassengers,
                formatted: RupiahFormat(orderDetail.flight.seatPrices[0].price * order.totalPassengers),
            }
        },
        airplane: {
            type: orderDetail.flight.airplane.type,
            airplaneCode: orderDetail.flight.airplane.airplaneCode,
            airline: {
                name: orderDetail.flight.airplane.airline.name,
            }
        }
    })),
    passengers: order.passengers.map((passenger) => ({
        fullName: passenger.fullName,
    })),
});

module.exports = {
    IndexOrderTransformer: (orders) => orders.map((order) => indexOrderTransform(order)),
    ShowOrderTransformer: (order) => showOrderTransform(order),
    CreateOrderTransformer: (order) => createOrderTransform(order),
    InvoiceOrderTransformer: (order) => orderInvoiceTransform(order),
};
