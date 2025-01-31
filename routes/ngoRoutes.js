import express from 'express';
const router = express.Router();

import {getAllNgos, getNgoById, getNgoDetails, registerNewNgo, removeNgo, updateNgoDetails, verifyNgo} from "../controllers/ngoController.js";
import {requireSignin, isNgo} from "../middleware/authMiddleware.js";

router.post("/register", requireSignin, isNgo, registerNewNgo);
router.get("/all", requireSignin, isNgo, getAllNgos);
router.get("/info/:id", requireSignin, isNgo, getNgoDetails);
router.get("/details/:id", requireSignin, isNgo, getNgoById);
router.put("/update/:id", requireSignin, isNgo, updateNgoDetails);
router.delete("/remove/:id", requireSignin, isNgo, removeNgo);
router.put("/verify/:id", requireSignin, isNgo, verifyNgo);



export default router;