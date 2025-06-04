import { Booking } from "../models/booking.model.js";
import { Show } from "../models/show.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";




const createBooking = asyncHandlar(async(req,res,next)=>{

    const {user,showId,selectedSeats} = req.body

    // find the show 


    console.log("Raw selectedSeats:", req.body.selectedSeats);
    console.log("Type of selectedSeats:", typeof req.body.selectedSeats);
    console.log("Is selectedSeats an array?", Array.isArray(req.body.selectedSeats));


    const show = await Show.findById(showId)
    if(!show){
        new ApiError(404, "show not found")
    }


    // check if seats are available


    console.log(`selected seats array`,Array.isArray(selectedSeats)); // Should print true


    const bookedSeats = []
    
    for (const seat of selectedSeats) {
        const availableSeat = show.seats.find(
            s => s.row === seat.row && s.number === seat.number && s.status === "Available"
        );

        if (!availableSeat) {
            return next(new ApiError(400, `Seat ${seat.row}${seat.number} is not available`));
        }

        // Mark seat as booked
        availableSeat.status = "Booked";
        bookedSeats.push(availableSeat);
    }

    // save updated show with booked seats 

    await show.save()

    // calculate total price 

    const totalPrice = bookedSeats.reduce((sum,seat)=> sum+seat.price,0)


    // create new booking 


    const booking = await Booking.create({
        user,
        show:showId,
        seats:bookedSeats,
        totalPrice,
        paymentStatus:'Pending'
    })

    return res
    .status(200)
    .json(new ApiResponse(200, booking, "Booking completed"));

})



const getAllBookings = asyncHandlar(async(req,res)=>{
    try {
        
        const bookings = await Booking.find().populate("user", "name email").populate({
            path:"show",
            populate:{path:'movie', select:"title"}
        })

        if (!bookings || bookings.length === 0) {
            return next(new ApiError(400, "No bookings found"));
        }

        const filteredBookings = bookings.map(booking => ({
            ...booking.toObject(),
            seats: booking.seats.filter(seat => seat.status === "Booked")
        }));
        
        res.status(200).json(new ApiResponse(200, bookings, "All bookings fetched"));

    } catch (error) {
        console.log(`error while getting `);
        
    }
})


const getBookingById = asyncHandlar(async(req,res)=>{


    try {
        const { id } = req.params;
        const booking = await Booking.findById(id)
            .populate("user", "name email")
            .populate({
                path: "show",
                populate: { path: "movie", select: "title" }
            });

        if (!booking) {
            return next(new ApiError(404, "Booking not found"));
        }

        res.status(200).json(new ApiResponse(200, booking, "Booking details fetched", ));
    } catch (error) {
        next(error);
    }
})



const cancelBooking = asyncHandlar(async(req,res)=>{
    try {
        
        const {id} = req.params

        const booking = await Booking.findById(id)
        if(!booking){
            throw new ApiError(404, "Booking not Found")
        }


        // find the releted Show 

        const show = await Show.findById(booking.show)

        if(!show){
            throw new ApiError(404,"Releted Show not found")
        }


         // Mark seats as available again
         booking.seats.forEach(bookedSeat => {
            const seatIndex = show.seats.findIndex(
                seat => seat.row === bookedSeat.row && seat.number === bookedSeat.number
            );
            if (seatIndex !== -1) show.seats[seatIndex].status = "Available";
        });

        await show.save();

        // Delete booking
        await Booking.findByIdAndDelete(id);

        res.status(200).json(new ApiResponse(200,`Booking canceled SucessFully`))
        

    } catch (error) {
        console.log(`error while canceling the booking `, error);
        
    }
})


const getBookingsByUserId = async (req, res, next) => {
    try {
      const { userId } = req.params;
  
      const bookings = await Booking.find({ user: userId })
        .populate("user", "name email")
        .populate({
          path: "show",
          populate: { path: "movie", select: "title" }
        });
  
      if (!bookings || bookings.length === 0) {
        return next(new ApiError(404, "No bookings found for this user"));
      }
  
      res
        .status(200)
        .json(new ApiResponse(200, bookings, "Bookings fetched successfully"));
    } catch (error) {
      next(error);
    }
  };
  


export {
    createBooking,
    getAllBookings,
    getBookingById,
    cancelBooking,
    getBookingsByUserId

}