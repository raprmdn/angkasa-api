const bcrypt = require('bcrypt');

module.exports = {
    /**
     * @returns {number}
     * @description This function is used to generate a random number 6 digits long
     */
    generateRandomOTP: () => Math.floor(100000 + Math.random() * 900000),
    hashOTP: async (otp) => await bcrypt.hash(otp.toString(), 10),
    verifyOTP: async (otp, hashedOTP) => await bcrypt.compare(otp.toString(), hashedOTP)
};
