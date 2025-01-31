import express from 'express';
const router = express.Router();

import {assignVolunteer, getPickupDetails, getPickupList, getPickupListForVolunteer, schedulePickup, updatePickupStatus} from "../controllers/pickupController.js";
import {requireSignin, isVolunteer} from "../middleware/authMiddleware.js";

router.get('/pickups', requireSignin, getPickupList);
router.get('/pickups/:id', requireSignin, isVolunteer, getPickupDetails);
router.post('/pickups/:id/assign', requireSignin, isVolunteer, assignVolunteer);
router.post('/pickups/:id/schedule', requireSignin, isVolunteer, schedulePickup);
router.put('/pickups/:id/status', requireSignin,isVolunteer,  updatePickupStatus);
router.get('/volunteer/pickups', requireSignin, isVolunteer, getPickupListForVolunteer);


export default router;