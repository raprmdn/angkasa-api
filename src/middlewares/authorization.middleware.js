const { StatusCodes: status } = require('http-status-codes');
const { apiForbiddenResponse } = require('../utils/apiResponse.utils');

module.exports = {
    hasRole: (roles = []) => {
        if (typeof roles === 'string') roles = [roles];

        return [
            (req, res, next) => {
                if (!roles.includes(req.user.role) && roles.length) {
                    return res.status(status.FORBIDDEN).json(apiForbiddenResponse('You do not have permission to access this resource'));
                }

                next();
            }
        ]
    }
};
