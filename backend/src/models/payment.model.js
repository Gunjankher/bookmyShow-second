import mongoose, { Schema } from "mongoose";


const paymentSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: "Booking", required: true },
    amount: { type: Number, required: true },
    paymentMethod: { type: String, enum: ["Card", "UPI", "Cash", "Bank"], required: true },
    transactionId: { type: String, unique: true },
    paymentStatus: { type: String, enum: ["Pending", "Paid", "Failed"], default: "Pending" },
}, {timestamps:true})


 export const Payment = mongoose.model("Payment",paymentSchema)