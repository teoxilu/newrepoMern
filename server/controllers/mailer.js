require('dotenv').config();
const nodemailer = require('nodemailer');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or 465 for SSL
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    },
});

const sendPaymentConfirmationEmail = async (email, orderInfo) => {
    try {
        let info = await transporter.sendMail({
            from: '"Your Company" <your_email@example.com>',
            to: email,
            subject: 'Order Confirmation',
            text: `Your order has been confirmed.`,
            html: `<div><b>Your order has been confirmed.</b></div><br><br> ${orderInfo}`
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendPaymentConfirmationEmail };
