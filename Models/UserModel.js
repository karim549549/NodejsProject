import mongoose from "mongoose";
import  Magic  from "../Utils/MagicStrings.js";

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        unique: false,
        trim: true
    },
    lastname: {
        type: String,
        unique: false,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        required: true
    },
    password: {
        type: String,
        unique: false,
        trim: true,
        required: true
    },
    role:{
        type: String,
        enum: [Magic.USER, Magic.ADMIN],
        default: Magic.USER
    },
    verifiedEmail: {
        type: Boolean,
        default: false
    }
}, { timestamps: true }); 

const User = mongoose.model('User', UserSchema);

export default User;

