import express from 'express';
const router = express.Router();

import { scheduleDelivery, getDeliveryDetails, updateDeliveryStatus } from '../controllers/deliveryController.js';
import {requireSignin} from "../middleware/authMiddleware.js";

router.post("/schedule", requireSignin, scheduleDelivery);
router.get("/info/:id", requireSignin, getDeliveryDetails);
router.put("/update/:id", requireSignin, updateDeliveryStatus);



export default router;