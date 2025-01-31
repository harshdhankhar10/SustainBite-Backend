import mongoose from "mongoose";

const pickupSchema = mongoose.Schema({
    foodDonorId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    volunteerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    pickupTime : {
        type : Date,
        required : true
    },
    pickupLocation : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['Scheduled', 'InProgress', 'Completed'],
        default : 'Scheduled'
    },
    foodType : {
        type : String,
        required : true
    }






}, { timestamps: true });


const Pickup = mongoose.model("Pickup", pickupSchema);

export default Pickup;