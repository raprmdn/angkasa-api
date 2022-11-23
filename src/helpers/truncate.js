const { Users } = require("../models");

module.exports = {
  Users: async () => {
    await Users.destroy({ truncate: true, restartIdentity: true });
  },
};
