const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'E-Ticket Angkasa API Documentation',
        description: 'API Documentation for Angkasa Final Project.',
        version: '1.0.0',
        contact: {
            email: 'angkasa@email.com',
        }
    },
    servers: [
        {
            url: 'http://localhost:5000/api',
            description: 'Development server'
        },
        {
            url: 'https://angkasa-api-staging.km3ggwp.com/api',
            description: 'Staging server'
        },
    ],
    tags: [
        {
            name: 'Authentication',
            description: 'Everything about Authentication',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'User',
            description: 'Everything about User',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Role',
            description: 'Everything about Role',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Airport',
            description: 'Everything about Airport',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Airline',
            description: 'Everything about Airline',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Benefit',
            description: 'Everything about Benefit',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Airplane',
            description: 'Everything about Airplane',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Flight',
            description: 'Everything about Flight',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Seat Class',
            description: 'Everything about Seat Class',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Notification',
            description: 'Everything about Notification',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
        {
            name: 'Order',
            description: 'Everything about Order',
            externalDocs: {
                description: 'Find out more',
                url: '#'
            }
        },
    ],
    basePath: '/api'
};

const options = {
    swaggerDefinition,
    apis: ['./swaggers/*.yaml']
};

module.exports = options;
