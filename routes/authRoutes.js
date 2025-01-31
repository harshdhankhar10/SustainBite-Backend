import express from 'express';
const router = express.Router();

import {login, register, updateProfile,resetPassword } from '../controllers/userController.js';
import { requireSignin, isAdmin, isDonar, isHelpSeeker, isNgo, isVolunteer } from '../middleware/authMiddleware.js';

router.post('/register', register);
router.post('/login', login);
router.put('/update-profile', requireSignin, updateProfile);
router.put('/reset-password/:token', resetPassword);


router.get('/user-auth', requireSignin, (req, res) => {
    res.status(200).send({ ok: true, message: "User Authentication Successful" });
});

router.get('/admin-auth', requireSignin, isAdmin, (req, res) => {
    res.status(200).json({ ok: true, message: "Admin Authentication Successful" });
});

router.get('/donar-auth', requireSignin, isDonar, (req, res) => {
    res.status(200).json({ ok: true, message: "Donar Authentication Successful" });
});

router.get('/help-seeker-auth', requireSignin, isHelpSeeker, (req, res) => {
    res.status(200).json({ ok: true, message: "Help Seeker Authentication Successful" });
})

router.get('/ngo-auth', requireSignin, isNgo, (req, res) => {
    res.status(200).json({ ok: true, message: "NGO Authentication Successful" });
})

router.get('/volunteer-auth', requireSignin, isVolunteer, (req, res) => {
    res.status(200).json({ ok: true, message: "Volunteer Authentication Successful" });
})






export default router;