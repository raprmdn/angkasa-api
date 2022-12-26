const ejs = require('ejs');
const path = require('path');
const { sendEmail } = require('../config/nodemailer.config');

module.exports = {
    SendEmailVerificationOTP: async (data) => {
        const emailVerificationEJS = await ejs.renderFile(path.join(__dirname, '../templates/email-verification.ejs'), { data });
        await sendEmail(data.email, 'Email Verification', emailVerificationEJS)
    },
    SendResetPasswordOTP: async (data) => {
        const resetPasswordEJS = await ejs.renderFile(path.join(__dirname, '../templates/reset-password.ejs'), { data });
        await sendEmail(data.email, 'Reset Password', resetPasswordEJS)
    },
    SendInvoice: async (data) => {
        const invoiceEJS = await ejs.renderFile(path.join(__dirname, '../templates/invoice.ejs'), { data });
        await sendEmail(data.user.email, `Invoice #${data.code}`, invoiceEJS)
    }
};
