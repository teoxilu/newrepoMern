require('dotenv').config();
const nodemailer = require('nodemailer');
const renderInvoice = require('../services/renderInvoice')
const generatePdf = require('../services/generatePDF');

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465, // or 465 for SSL
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.MAILER_EMAIL,
        pass: process.env.MAILER_PASSWORD
    },
    // tls: {
    //     rejectUnauthorized: false
    // }
});

const sendPaymentConfirmationEmail = async (email, orderInfo) => {
    try {
        console.log('OrderInfo:', orderInfo); // Add this line to log the orderInfo object
        const pdfStream = await renderInvoice(orderInfo);
        
        
        const pdfBuffer = await new Promise((resolve, reject) => {
            const chunks = [];
            pdfStream.on('data', chunk => chunks.push(chunk));
            pdfStream.on('end', () => resolve(Buffer.concat(chunks)));
            pdfStream.on('error', reject);
        });
        // const pdfContent = renderInvoice(orderInfo);
        // const pdfBuffer = await generatePdf(pdfContent);

        let info = await transporter.sendMail({
            from: '"Your Company" <your_email@example.com>',
            to: email,
            subject: 'Order Confirmation',
            text: `Your order has been confirmed.`,
            html: `<b>Your order has been confirmed.</b>`,
            attachments: [
                {
                    filename: 'Invoice.pdf',
                    content: pdfBuffer,
                    encoding: 'application/pdf'
                }
            ]
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

module.exports = { sendPaymentConfirmationEmail };
