const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require('../utils/apiResponse.utils');

module.exports = {
    swaggerAccess: (req, res, next) => {
        if (process.env.NODE_ENV !== 'production') next();
        else res.status(status.FORBIDDEN).json(
            apiResponse(status.FORBIDDEN, 'FORBIDDEN', 'Documentation is not available in production environment.')
        );
    }
};
