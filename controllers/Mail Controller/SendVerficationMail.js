import { sendMail } from "../../utils/mailHelper.js";
import jwt from "jsonwebtoken";

export const SendVerificationMail = async (email) => {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
    const verificationLink = `${process.env.FRONTEND_URL}/verify-email/${token}`;
    
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden;">
            <div style="background-color: #22C55E; padding: 20px; text-align: center; color: #ffffff; font-size: 24px; font-weight: bold;">
                SustainBite
            </div>
            <div style="padding: 20px; text-align: center;">
                <h2 style="color: #333;">Verify Your Email Address</h2>
                <p style="color: #555; font-size: 16px;">You're almost there! Click the button below to verify your email and activate your account.</p>
                <a href="${verificationLink}" style="display: inline-block; padding: 12px 24px; background-color: #22C55E; color: #ffffff; text-decoration: none; font-size: 18px; border-radius: 5px; margin-top: 20px;">Verify Email</a>
                <p style="color: #777; font-size: 14px; margin-top: 20px;">If the button above does not work, copy and paste the following link into your browser:</p>
                <p style="word-wrap: break-word; color: #22C55E; font-size: 14px;">${verificationLink}</p>
            </div>
            <div style="background-color: #f8f8f8; padding: 10px; text-align: center; font-size: 12px; color: #888;">
                &copy; ${new Date().getFullYear()} SustainBite. All rights reserved.
            </div>
        </div>
    `;

    const mailOptions = {
        to: email,
        subject: 'Verify Your Email | SustainBite',
        html: htmlContent,
    };
    
    try {
        await sendMail(mailOptions);
        return res.status(200).json({message: "Verification Email Sent", success: true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal Server Error", success: false});
    }
};
