const {
    Order, Flight, User, SeatPrice, OrderDetail,
    Airplane, Airline, OrderContact, Passenger, sequelize
} = require('../models');
const { StatusCodes: status } = require('http-status-codes');
const moment = require('moment');
const { apiResponse, apiNotFoundResponse, apiBadRequestResponse} = require("../utils/apiResponse.utils");
const { generateIdentifier, generateCode, isRequiredVisa } = require("../helpers/order.helper");
const { CreateOrderTransformer } = require("../helpers/transformers/order.transformers");

module.exports = {
    create: async (req) => {
        try {
            const res = await sequelize.transaction(async (t) => {
                const { id } = req.user;
                const { flightId, totalPassengers, contact, passengers, paymentMethod, class: seat } = req.body;

                const user = await User.findByPk(id);
                if (!user) {
                    throw apiNotFoundResponse('User not found');
                }

                const flights = await Flight.findAll({
                    where: {
                        id: flightId
                    },
                    include: [
                        {
                            model: SeatPrice,
                            as: 'seatPrices',
                            where: {
                                seatType: seat
                            }
                        }
                    ]
                });
                if (flights.length !== flightId.length) {
                    throw apiNotFoundResponse('Flight not found');
                }
                if (flights.some(flight => moment(flight.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD'))) {
                    throw apiBadRequestResponse('Flight is already expired');
                }

                const identifier = generateIdentifier();
                const code = generateCode();
                const tripType = flightId.length === 1 ? 'one-way' : 'round-trip';
                const requireVisa = isRequiredVisa(flights[0].toAirportCountry);
                let total = [];
                let discount = [];

                flights.map((flight) => {
                    total.push(flight.seatPrices[0].price * totalPassengers);
                    discount.push(flight.seatPrices[0].discount ? flight.seatPrices[0].discount * totalPassengers : 0);
                });

                total = total.reduce((a, b) => a + b, 0);
                discount = discount.reduce((a, b) => a + b, 0);

                const order = await user.createOrder({
                    identifier,
                    code,
                    totalPassengers,
                    total,
                    discount,
                    type: tripType,
                    isRequiredVisa: requireVisa,
                    paymentMethod,
                }, { transaction: t });

                await Promise.all(
                    flights.map(async (flight) => {
                        await order.createOrderDetail({
                            flightId: flight.id,
                            seatType: flight.seatPrices[0].seatType,
                        }, { transaction: t });
                    })
                );

                await order.createOrderContact({
                    fullName: contact.fullName,
                    email: contact.email,
                    phone: contact.phone,
                }, { transaction: t });

                await Promise.all(
                    passengers.map(async (passenger) => {
                        await order.createPassenger({
                            fullName: passenger.fullName,
                            firstName: passenger.firstName || null,
                            lastName: passenger.lastName || null,
                            citizenship: passenger.citizenship || null,
                            passport: passenger.passport || null,
                            passportCitizenship: passenger.passportCitizenship || null,
                            passportExpire: passenger.passportExpire || null,
                        }, { transaction: t });
                    })
                );

                return order;
            });

            const seat = await res.getOrderDetails();
            const order = await Order.findByPk(res.id, {
                include: [
                    {
                        model: OrderDetail,
                        as: 'orderDetails',
                        include: [
                            {
                                model: Flight,
                                as: 'flight',
                                include: [
                                    {
                                        model: SeatPrice,
                                        as: 'seatPrices',
                                        where: {
                                            seatType: seat[0].seatType
                                        }
                                    },
                                    {
                                        model: Airplane,
                                        as: 'airplane',
                                        include: [
                                            {
                                                model: Airline,
                                                as: 'airline',
                                                attributes: ['id', 'name', 'logo'],
                                            },
                                        ]
                                    },
                                ]
                            }
                        ]
                    },
                    {
                        model: OrderContact,
                        as: 'orderContact',
                    },
                    {
                        model: Passenger,
                        as: 'passengers',
                    }
                ],
            });
            const orderTransformed = CreateOrderTransformer(order);

            return apiResponse(status.OK, 'OK', 'Order created successfully', { order: orderTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    }
};
