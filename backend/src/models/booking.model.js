import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    show: {
        type: Schema.Types.ObjectId,
        ref: "Show",
        required: true
    },

    seats: [ // Store seats directly from the Show model
        {
            row: String,
            number: Number,
            // category: String,
            status: { type: String, default: "Booked" }
        }
    ],

    
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
    createdAt: { type: Date, default: Date.now }
});

export const Booking = mongoose.model("Booking", bookingSchema);
