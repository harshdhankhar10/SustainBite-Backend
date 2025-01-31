import mongoose from "mongoose";

const deliverySchema = mongoose.Schema({
    pickupId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'Pickup'
    },
    deliveryStatus : {
        type : String,
        enum : ['Scheduled', 'InProgress', 'Completed'],
        default : 'Scheduled'
    },
    deliveryLocation : {
        type : String,
        required : true
    },
    deliveryTime : {
        type : Date,
        required : true
    },
    deliveryProof : {
        type : String,
        default : null
    }





}, { timestamps: true });


const Delivery  = mongoose.model("Delivery", deliverySchema);

export default Delivery;