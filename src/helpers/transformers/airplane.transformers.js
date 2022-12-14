const transform = (airplane) => {
    return {
        id: airplane.id,
        type: airplane.type || null,
        airplaneCode: airplane.airplaneCode || null,
        seat: airplane.seat || null,
        airline: airplane.airline,
        seatClasses: airplane.seatClasses.map((seatClass) => {
            return {
                type: seatClass.type || null,
                seat: seatClass.AirplaneSeatClass.seat || null,
                benefits: seatClass.benefits.map((benefit) => {
                    return {
                        name: benefit.name || null,
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
