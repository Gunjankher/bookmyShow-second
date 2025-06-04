import { Booking } from "../models/booking.model.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";


 export const getTotalRevenue = asyncHandlar(async(req,res)=>{
    
    try {
        
        const result = await Booking.aggregate([
            {$group :{_id:null, totalRevenue :{$sum:"$totalPrice"}}}
        ])

        res
        .status(200)
        .json(new ApiResponse(200, result[0] || {totalRevenue :0}, 'total revenue fetched'))
    } catch (error) {
        console.log(`somrthing went wrong while getting total revenue`, error);
        
    }
})



export const getRevenuePerMovie = asyncHandlar(async(req,res)=>{
    try {
        
        const result = await Booking.aggregate([
            { 
                $group: { 
                    _id: "$show", 
                    revenue: { $sum: "$totalPrice" } 
                } 
            },
            { 
                $lookup: { 
                    from: "shows", // Match the actual collection name
                    localField: "_id", 
                    foreignField: "_id", 
                    as: "show"
                } 
            },
            { $unwind: "$show" },
            { 
                $lookup: { 
                    from: "movies", 
                    localField: "show.movie", // Assuming Show model has a movie field
                    foreignField: "_id", 
                    as: "movie"
                } 
            },
            { $unwind: "$movie" },
            { 
                $project: { 
                    _id: 0, 
                    movie: "$movie.title", 
                    revenue: 1 
                } 
            }
        ]);
        

        res.status(200).json(new ApiResponse(200, result, "Revenue per movie fetched"));

    } catch (error) {
        console.log(`get error in revenue`, error);
        
    }
})



export const getRevenuePerMonth = asyncHandlar(async (req, res, next) => {
    try {
        const result = await Booking.aggregate([
            { $group: { 
                _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } }, 
                revenue: { $sum: "$totalPrice" }
            }},
            { $sort: { "_id.year": 1, "_id.month": 1 } }
        ]);

        res.status(200).json(new ApiResponse(200, result, "Monthly revenue fetched"));
    } catch (error) {
        next(new ApiError(500, "Error fetching revenue per month"));
    }
});
