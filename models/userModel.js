import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    password : {
        type: String,
        required: true
    }, 
    role : {
        type : String,
        enum : ['DONAR', 'NGO', 'HELP_SEEKER', 'VOLUNTEER', 'ADMIN'],
    },
    phoneNumber : {
        type: Number,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    profilePicture : {
        type: String,
        default: ''
    },
    organizationName : {
        type: String,
        default: ''
    },
    isVerified : {
        type: Boolean,
        default: false
    },
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User;