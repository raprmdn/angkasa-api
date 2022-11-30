const nodemailer = require('nodemailer');
const { StatusCodes: status } = require('http-status-codes');
const { apiResponse } = require("../utils/apiResponse.utils");
const OAuth2Client = require('./oauth.config');

OAuth2Client.google.setCredentials({ refresh_token: process.env.GOOGLE_REFRESH_TOKEN });

module.exports = {
    sendEmail: async (to, subject, template) => {
        try {
            const accessToken = await OAuth2Client.google.getAccessToken().catch((e) => {
                console.error(`Error while getting access token: ${e.message}`);
                throw apiResponse(
                    e.code || status.INTERNAL_SERVER_ERROR,
                    e.response?.statusText || "INTERNAL_SERVER_ERROR",
                    e.message
                )
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: process.env.GOOGLE_EMAIL,
                    clientId: process.env.GOOGLE_CLIENT_ID,
                    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                    refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
                    accessToken: accessToken
                }
            });

            console.info(`Attempting send email to ${to} with subject Angkasa - ${subject} . . .`);
            await transporter.sendMail({
                to,
                subject: `Angkasa - ${subject}`,
                html: template,
                priority: 'high'
            }, (err, info) => {
                if (err) {
                    console.error(`Error while sending email: ${err.message}`);
                    throw apiResponse(status.INTERNAL_SERVER_ERROR, "INTERNAL_SERVER_ERROR", err.message);
                }
                console.info(`Successfully sent email to ${to} with subject Angkasa - ${subject}`);
                console.info(`Email sent: ${info.response}`);
            });
        } catch (e) {
            throw e;
        }
    }
};
