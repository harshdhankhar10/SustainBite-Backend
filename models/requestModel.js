import mongoose from 'mongoose';


const requestSchema = mongoose.Schema({
    requesterId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : 'User'
    },
    foodType : {
        type : String,
        required : true
    },
    quantity : {
        type : Number,
        required : true
    },
    expiryDate : {
        type : Date,
        required : true
    },
    location : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ['Pending', 'Accepted', 'Rejected'],
        default : 'Pending'
    }




}, { timestamps: true });


const Request = mongoose.model('Request', requestSchema);

export default Request;