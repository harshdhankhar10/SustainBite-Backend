import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import dbConnect from "./config/db.js";

app.use(express.json());
app.use(cors());

dbConnect();

// Routes
import authRoutes from './routes/authRoutes.js';
import deliveryRoutes from './routes/deliveryRoutes.js';
import foodDonationRoutes from "./routes/foodDonationRoutes.js";
import ngoRoutes from "./routes/ngoRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";

import sendMail from './routes/Mail Routes/mailRoutes.js';




app.use('/api/v1/mail', sendMail);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/delivery', deliveryRoutes);
app.use('/api/v1/fooddonation', foodDonationRoutes);
app.use('/api/v1/ngo', ngoRoutes);
app.use('/api/v1/notification', notificationRoutes);
app.use('/api/v1/pickup', pickupRoutes);


app.get("/", (req, res) => {
    res.send("Server is ready");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});