import { Router } from "express";
import { getTotalRevenue,getRevenuePerMonth,getRevenuePerMovie } from "../controllers/revenue.controller.js";



const router = Router()


router.route("/total-revenue").get(getTotalRevenue)
router.route("/revenue-per-movie").get(getRevenuePerMovie)
router.route("/revenue-per-month").get(getRevenuePerMonth)


export default router