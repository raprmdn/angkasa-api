const transform = (airplane) => {
    return {
        id: airplane.id,
        type: airplane.type,
        planeCode: airplane.planeCode,
        seat: airplane.seat,
        airline: airplane.airline,
        seatClasses: airplane.seatClasses.map((seatClass) => {
            return {
                type: seatClass.type,
                seat: seatClass.AirplaneSeatClass.seat,
                benefits: seatClass.benefits.map((benefit) => {
                    return {
                        name: benefit.name,
                        icon: benefit.icon,
                    };
                }),
            };
        }),
    };
};

module.exports = {
    AirplaneResponse: (airplane) => transform(airplane),
};
