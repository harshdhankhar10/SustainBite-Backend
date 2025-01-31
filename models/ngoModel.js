import mongoose from "mongoose";

const ngoSchema = mongoose.Schema({
    userId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    name : {
        type: String,
        required: true
    },
    contactPerson : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    phone : {
        type: Number,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    donationCapacity : {
        type: Number,
        required: true
    },
    isVerified : {
        type: Boolean,
        default: false
    },




}, { timestamps: true });


const Ngo = mongoose.model("Ngo", ngoSchema);

export default Ngo;