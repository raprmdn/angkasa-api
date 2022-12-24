const {
    Order, Flight, User, SeatPrice, OrderDetail,
    Airplane, Airline, OrderContact, Passenger,
    SeatClass, Benefit, sequelize
} = require('../models');
const { StatusCodes: status } = require('http-status-codes');
const moment = require('moment');
const { Op } = require("sequelize");
const { apiResponse, apiNotFoundResponse, apiBadRequestResponse } = require("../utils/apiResponse.utils");
const { generateIdentifier, generateCode, isRequiredVisa } = require("../helpers/order.helper");
const { IndexOrderTransformer, CreateOrderTransformer, ShowOrderTransformer } = require("../helpers/transformers/order.transformers");

module.exports = {
    index: async (req) => {
        try {
            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 10;
            const search = req.query.search ? req.query.search.toUpperCase() : '';
            const offset = (page - 1) * limit;
            const rows = await Order.count({
                where: {
                    [Op.or]: [
                        { code: { [Op.like]: `%${search}%` } },
                    ]
                }
            });
            const pages = Math.ceil(rows / limit);

            const orders = await Order.findAll({
                where: {
                    [Op.or]: [
                        { code: { [Op.like]: `%${search}%` } },
                    ]
                },
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
                                        model: Airplane,
                                        as: 'airplane',
                                        include: [
                                            {
                                                model: Airline,
                                                as: 'airline',
                                                attributes: ['id', 'name', 'logo'],
                                            }
                                        ]
                                    },
                                ],
                            }
                        ]
                    }
                ],
                limit: limit,
                offset: offset,
                order: [
                    ['id', 'DESC'],
                    ['orderDetails', 'id', 'ASC'],
                ],
            });
            const ordersTransformed = IndexOrderTransformer(orders);

            return apiResponse(status.OK, 'OK', 'Orders retrieved successfully.',
                {
                    orders: ordersTransformed,
                    pagination: { page, limit, offset, rows, pages }
                },
            );
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    show: async (req) => {
        try {
            const { identifier } = req.params;
            const { id, role } = req.user;

            const orderExists = await Order.findOne({
                where: {
                    identifier: identifier,
                },
                include: [
                    {
                        model: OrderDetail,
                        as: 'orderDetails',
                    }
                ]
            });
            if (!orderExists) {
                throw apiNotFoundResponse('Order not found.');
            }
            if (role !== 'ADMIN' && orderExists.userId !== id) {
                throw apiBadRequestResponse('You are not authorized to view this order.');
            }

            const order = await Order.findOne({
                where: {
                    identifier: identifier,
                },
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
                                        model: Airplane,
                                        as: 'airplane',
                                        subQuery: false,
                                        include: [
                                            {
                                                model: Airline,
                                                as: 'airline',
                                            },
                                            {
                                                model: SeatClass,
                                                as: 'seatClasses',
                                                through: {
                                                    attributes: []
                                                },
                                                where: {
                                                    type: orderExists.orderDetails[0].seatType
                                                },
                                                include: [
                                                    {
                                                        model: Benefit,
                                                        as: 'benefits',
                                                        through: {
                                                            attributes: []
                                                        },
                                                    }
                                                ],
                                            }
                                        ],
                                    }
                                ],
                            },
                        ],
                    },
                    {
                        model: OrderContact,
                        as: 'orderContact',
                    },
                    {
                        model: Passenger,
                        as: 'passengers',
                    },
                ],
                order: [
                    ['orderDetails', 'id', 'ASC'],
                ]
            });
            const orderTransformed = ShowOrderTransformer(order);

            return apiResponse(status.OK, 'OK', 'Order retrieved successfully.', { order: orderTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
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

                flights.some(flight => {
                    if (moment(flight.date).format('YYYY-MM-DD') < moment().format('YYYY-MM-DD')) {
                        throw apiBadRequestResponse('Flight is already expired');
                    }

                    if (moment(flight.std).format('YYYY-MM-DD HH:mm:ss') < moment().format('YYYY-MM-DD HH:mm:ss')) {
                        throw apiBadRequestResponse('Flight is already expired');
                    }
                });

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
                    status: 'PENDING',
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
                            type: passenger.type,
                            number: passenger.number,
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
                order: [
                    ['orderDetails', 'id', 'ASC'],
                ]
            });
            const orderTransformed = CreateOrderTransformer(order);

            return apiResponse(status.OK, 'OK', 'Order created successfully', { order: orderTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    checkOrder: async (req) => {
        try {
            const { email, code } = req.body;

            const orderExists = await Order.findOne({
                where: {
                    code,
                },
                include: [
                    {
                        model: User,
                        as: 'user',
                        where: {
                            email,
                        }
                    },
                    {
                        model: OrderDetail,
                        as: 'orderDetails',
                    }
                ]
            });
            if (!orderExists) {
                throw apiNotFoundResponse('Order not found');
            }

            const order = await Order.findOne({
                where: {
                    code,
                },
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
                                        model: Airplane,
                                        as: 'airplane',
                                        subQuery: false,
                                        include: [
                                            {
                                                model: Airline,
                                                as: 'airline',
                                            },
                                            {
                                                model: SeatClass,
                                                as: 'seatClasses',
                                                through: {
                                                    attributes: []
                                                },
                                                where: {
                                                    type: orderExists.orderDetails[0].seatType
                                                },
                                                include: [
                                                    {
                                                        model: Benefit,
                                                        as: 'benefits',
                                                        through: {
                                                            attributes: []
                                                        },
                                                    }
                                                ],
                                            }
                                        ],
                                    }
                                ],
                            },
                        ],
                    },
                    {
                        model: OrderContact,
                        as: 'orderContact',
                    },
                    {
                        model: Passenger,
                        as: 'passengers',
                    },
                    {
                        model: User,
                        as: 'user',
                        where: {
                            email,
                        }
                    }
                ],
                order: [
                    ['orderDetails', 'id', 'ASC'],
                ]
            });
            const orderTransformed = ShowOrderTransformer(order);

            return apiResponse(status.OK, 'OK', 'Order found', { order: orderTransformed });
        } catch (e) {
            throw apiResponse(e.code || status.INTERNAL_SERVER_ERROR, e.status || 'INTERNAL_SERVER_ERROR', e.message);
        }
    },
    acceptOrder: async (req) => {
      try {
        const { id: orderId } = req.params;

        const order = await Order.findByPk(orderId);

        if (!order) {
          throw apiNotFoundResponse("Order not found.");
        }

        if (order.status == "COMPLETED") {
          throw apiResponse(
            status.BAD_REQUEST,
            "BAD_REQUEST",
            "status of this order is already COMPLETED"
          );
        }

        order.status = "COMPLETED";

        await order.save();

        return apiResponse(status.OK, "OK", "Payment APPROVED by admin");
      } catch (error) {
        throw apiResponse(
          error.code || status.INTERNAL_SERVER_ERROR,
          error.status || "INTERNAL_SERVER_ERROR",
          error.message || null
        );
      }
    },
    userOrderHistory: async (req) => {
      try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const search = req.query.search ? req.query.search.toUpperCase() : "";
        const offset = (page - 1) * limit;
        const rows = await Order.count({
          where: {
            [Op.or]: [{ code: { [Op.like]: `%${search}%` } }],
          },
        });
        const pages = Math.ceil(rows / limit);
        const { id: userId } = req.user;

        const user = await User.findByPk(userId);
        if(!user){
          throw apiNotFoundResponse("User not Found");
        }

        const orders = await Order.findAll({
          where: {
            userId,
            [Op.or]: [{ code: { [Op.like]: `%${search}%` } }],
          },
          include: [
            {
              model: OrderDetail,
              as: "orderDetails",
              include: [
                {
                  model: Flight,
                  as: "flight",
                  include: [
                    {
                      model: Airplane,
                      as: "airplane",
                      include: [
                        {
                          model: Airline,
                          as: "airline",
                          attributes: ["id", "name", "logo"],
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
          limit: limit,
          offset: offset,
          order: [
            ["id", "DESC"],
            ["orderDetails", "id", "ASC"],
          ],
        });

        const ordersTransformed = IndexOrderTransformer(orders);

        return apiResponse(status.OK, "OK", "Success to get user Orders History", {
          orders: ordersTransformed,
          pagination: { page, limit, offset, rows, pages }
        });

      } catch (error) {
        throw apiResponse(
          error.code || status.INTERNAL_SERVER_ERROR,
          error.status || "INTERNAL_SERVER_ERROR",
          error.message || null
        )
      }
    }
};
