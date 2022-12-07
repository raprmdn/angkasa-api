const transform = (airport) => {
    return {
        id: airport.id,
        name: airport.name,
        country: airport.country,
        region: airport.region,
        municipality: airport.municipality,
        iata: airport.iata,
        type: airport.type,
    };
}

module.exports = {
    AirportResponse: (airport) => transform(airport),
    AirportCollectionResponse: (airports) => airports.map((airport) => transform(airport)),
};
