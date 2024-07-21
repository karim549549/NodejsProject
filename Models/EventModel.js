import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    location: {
        type: String,
    },
    organizerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    bookings: [{
        status: {
            type: String,
        },
        userid: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        },
    }]
}, { timestamps: true });

export default mongoose.model("Event", eventSchema);


