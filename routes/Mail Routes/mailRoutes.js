import express from 'express';
const router = express.Router();


// Send Verification Email
import {SendVerificationMail} from "../../controllers/Mail Controller/SendVerficationMail.js";

router.post("/send-verification-mail", SendVerificationMail);


export default router;