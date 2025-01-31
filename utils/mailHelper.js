import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

export const sendMail = async (mailOptions) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const finalMailOptions = {
            from: process.env.EMAIL_USER,
            to: mailOptions.to,
            subject: mailOptions.subject,
            html: mailOptions.htmlContent,  
        };

        let info = await transporter.sendMail(finalMailOptions);
        return info;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};