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
};

const portApiTransform = (props) => {
    return {
        id: props.id || null,
        name: props.name || null,
        country: props.country?.name || null,
        region: props.region?.name || null,
        municipality: props.municipality || null,
        iata: props.iata || null,
        type: props.type || null,
    };
};

module.exports = {
    AirportResponse: (airport) => transform(airport),
    AirportCollectionResponse: (airports) => airports.map((airport) => transform(airport)),
    /**
     * Transform airport data for API response from [port-api.com](https://port-api.com/port/suggest/:partial) .
     *
     * With this transform, the API response will be consistent with the API response from our own API.
     *
     * For more information, see [here](https://port-api.com/docs#/Port/Suggest_Port_port_suggest__partial__get).
     *
     * @param airports
     * @returns {*}
     * @description Transform airport data returned from API
     */
    AirportApiCollectionResponse: (airports) => airports.map((airport) => portApiTransform(airport.properties)),
};
