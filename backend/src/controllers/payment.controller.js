import { Booking } from "../models/booking.model.js";
import { Payment } from "../models/payment.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";



const initiatePayment = asyncHandlar(async(req,res)=>{
    try {
        const { bookingId, paymentMethod, transactionId } = req.body;

        if (!bookingId || !paymentMethod || !transactionId) {
            return res.status(400).json({ success: false, message: "Missing required payment details." });
        }


        const booking = await Booking.findById(bookingId)

        if(!booking){
            throw new ApiError(404, `booking not found`)
        }

        const amount = booking.totalPrice

        // Create payment record
        const payment = await Payment.create({
            bookingId,
            amount,
            paymentMethod,
            transactionId,
            paymentStatus: "Pending",
        });

        res.status(201).json(
            new ApiResponse(201, payment, "Payment initiated successfully")
          );
          
    } catch (error) {
        console.log(`error while initiating Payment`, error);
        
    }
})



const updatePaymentStatus = asyncHandlar(async (req, res, next) => {
    try {
        const { paymentId } = req.body;

        // if (!paymentId || !["Pending", "Paid", "Failed"].includes(status)) {
        //     return next(new ApiError(400, "Invalid payment status or missing payment ID"));
        // }

        const payment = await Payment.findByIdAndUpdate(
            paymentId,
            { paymentStatus: "Paid" },
            { new: true }
        );

        if (!payment) {
            return next(new ApiError(404, "Payment not found"));
        }

        // Update Booking Model's `paymentStatus`
        await Booking.findByIdAndUpdate(payment.bookingId, { paymentStatus:"Paid" });

        res.status(200).json(new ApiResponse(200, payment, `Payment status updated`));
    } catch (error) {
        console.log("Error while updating payment status", error);
    }
});


export {
    initiatePayment,
    updatePaymentStatus
}