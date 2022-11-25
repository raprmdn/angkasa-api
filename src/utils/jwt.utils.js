const jwt = require("jsonwebtoken");

module.exports = {
  generateAccessToken: (user) => {
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "20m",
    });
  },
  verifyAccessToken: (token) =>
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET_KEY),
};
