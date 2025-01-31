import express from 'express';
const router = express.Router();


import {getNotifications, markNotificationAsRead} from "../controllers/notificationController.js";
import {requireSignin} from "../middleware/authMiddleware.js";

router.get('/notifications', requireSignin, getNotifications);
router.put('/notifications/:id', requireSignin, markNotificationAsRead);


export default router;