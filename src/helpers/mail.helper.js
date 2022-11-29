const ejs = require('ejs');
const path = require('path');
const { sendEmail } = require('../config/nodemailer.config');

module.exports = {
    SendEmailVerificationOTP: async (data) => {
        const emailVerificationEJS = await ejs.renderFile(path.join(__dirname, '../templates/email-verification.ejs'), { data });
        await sendEmail(data.email, 'Email Verification', emailVerificationEJS)
    },
};
