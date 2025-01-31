import mongoose from "mongoose";

const foodDonationSchema = mongoose.Schema({
    donarId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    foodType : {
        type: String,
        required: true
    },
    weight : {
        type: Number,
        required: true
    },
    expiryDate : {
        type: Date,
        required: true
    },
    pickupLocation : {
        type: String,
        required: true
    },
    donationStatus : {
        type: String,
        enum : ['AVAILABLE', 'CLAIMED', 'PICKED_UP', 'DELIVERED'],
    },
    notes : {
        type: String,
        default: ''
    },
    foodImages : [
        {
            type: String
        }
    ]




}, { timestamps: true });

const FoodDonation = mongoose.model("FoodDonation", foodDonationSchema);

export default FoodDonation;