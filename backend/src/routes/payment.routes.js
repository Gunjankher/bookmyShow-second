import { Router } from "express";
import { initiatePayment, updatePaymentStatus } from "../controllers/payment.controller.js";

const router = Router()

router.route("/initiate").post(initiatePayment)
router.route("/update").put(updatePaymentStatus)


export default router