module.exports = {
    UserTransform: (user) => ({
        id: user.id,
        fullname: user.fullname,
        username: user.username,
        email: user.email,
        role: user.role?.name,
        provider: user.provider,
        avatar: user.avatar,
        emailVerifiedAt: user.emailVerifiedAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    })
};
