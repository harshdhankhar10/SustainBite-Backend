import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const dbConnect = async ()=>{
    try {
        const dbConnect = await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error.message);
        process.exit(1);
    }
}


export default dbConnect 