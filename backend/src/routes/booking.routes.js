import { Router } from "express";
import { cancelBooking, createBooking, getAllBookings, getBookingById, getBookingsByUserId } from "../controllers/booking.controller.js";



const router = Router()

router.route("/").post(createBooking)
router.route('/').get(getAllBookings)
router.route("/:id").get(getBookingById)
router.route("/:id").delete(cancelBooking)
router.route('/user/:id').get(getBookingsByUserId)







export default router