import express from 'express';
const router = express.Router();

import {donateFood, getAllDonations, getDonationDetails, } from "../controllers/foodDonationController.js";
import {requireSignin, isDonar} from "../middleware/authMiddleware.js";

router.post("/donate", requireSignin, isDonar, donateFood);
router.get("/all", requireSignin, getAllDonations);
router.get("/info/:id", requireSignin, getDonationDetails);



export default router;