const moment = require('moment');

module.exports = {
    UserTransform: (user) => ({
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role?.name,
        provider: user.provider,
        avatar: user.avatar,
        emailVerifiedAt: user.emailVerifiedAt ? moment(user.emailVerifiedAt).format('YYYY-MM-DD HH:mm:ss') : null,
        createdAt: moment(user.createdAt).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(user.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
    })
};
