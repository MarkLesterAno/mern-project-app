import nodemailer from 'nodemailer';
import config from '../../config';

export default class EmailHelper {
    transporter: any;
    constructor() {
        // Create a Nodemailer transporter
        this.transporter = nodemailer.createTransport({
            // Configuration for your email service provider
            service: config.MAILER_SERVICE,
            auth: {
                user: config.MAILER_EMAIL,
                pass: config.MAILER_PASSWORD
            }
        });
    }

    // Method to send an email
    async sendEmail(options: any) {
        try {

            // Send mail with defined transport object
            const info = await this.transporter.sendMail(options);

            console.log('Message sent: %s', info.messageId);
            return info.messageId;
        } catch (error) {
            console.error('Error sending email:', error);
            throw error;
        }
    }
}