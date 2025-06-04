import {asyncHandlar} from '../utilis/asyncHandlar.js'
import {ApiResponse} from '../utilis/ApiResponse.js'
import {ApiError} from '../utilis/ApiError.js'
import { Theater } from '../models/theater.model.js'
import { Show } from '../models/show.model.js'
import mongoose from 'mongoose'






const ObjectId = mongoose.Types.ObjectId;





const createShow = asyncHandlar(async (req, res) => {
    try {
        const { screenName, movie, startTime, endTime, theaterId } = req.body;

        const theater = await Theater.findById(theaterId);
        if (!theater) throw new ApiError(404, 'Theater not found');

        // Validate screen name
        const screen = theater.screens.find(s => s.name === screenName);
        if (!screen) throw new ApiError(400, 'Invalid screen name');


        const totalSeats = screen.totalSeats; 
        if (!totalSeats || totalSeats <= 0) throw new ApiError(400, 'Invalid totalSeats for this screen');


        // // Validate format
        // if (screen.format !== format) {
        //     throw new ApiError(400, `Invalid format! This screen supports ${screen.format}`);
        // }

        // Convert movie ID to ObjectId
        const movieObjectId = new mongoose.Types.ObjectId(movie);

    

        const baseTicketPrice = 200; 
        const seats = [];
        const rows = ["A", "B", "C", "D", "E"]; // Example row labels
        let seatCount = 0;

        for (let row of rows) {
            for (let num = 1; num <= Math.ceil(totalSeats / rows.length); num++) {
                if (seatCount >= totalSeats) break; // Stop when reaching totalSeats
                
                // Determine Seat Category
                let category;
                let price = baseTicketPrice; // Start with base price
        
                if (seatCount < totalSeats * 0.3) {
                    category = "Platinum";
                    price += 100; // Extra charge for Platinum
                } else if (seatCount < totalSeats * 0.7) {
                    category = "Gold";
                    price += 50;  // Extra charge for Gold
                } else {
                    category = "Silver"; // No extra charge
                }
        
                seats.push({
                    row,
                    number: num,
                    category,
                    price, // Assign the calculated price dynamically
                    status: "Available"
                });
        
                seatCount++;
            }
        }
        

        // Create Show
        const newShow = await Show.create({
            theater: theaterId,
            screenName,
            movie: movieObjectId,  // ✅ Ensure it's an ObjectId
            startTime,
            endTime,
            // ticketPrice,
            seats
        });

        // Populate data dynamically using aggregation
        const populatedShow = await Show.aggregate([
            { $match: { _id: newShow._id } },
            {
                $lookup: {
                    from: "theaters",
                    localField: "theater",
                    foreignField: "_id",
                    as: "theater",
                },
            },
            { $unwind: "$theater" },
            {
                $lookup: {
                    from: "movies",
                    localField: "movie",
                    foreignField: "_id",
                    as: "movie",
                },
            },
            { $unwind: "$movie" },
            {
                $project: {
                    _id: 1,
                    screenName: 1,
                    startTime: 1,
                    endTime: 1,
                    format: 1,
                    // ticketPrice: 1,
                    availableSeats: 1,
                    totalSeats: 1,
                    createdAt: 1,
                    "theater._id": 1,
                    "theater.name": 1,
                    "theater.location": 1,
                    "theater.capacity": 1,
                    "theater.facilities": 1,
                    "movie._id": 1,
                    "movie.title": 1,
                    "movie.genre": 1,
                    "movie.duration": 1,
                },
            },
        ]);

        // Check if aggregation returned data
        if (!populatedShow.length) {
            return res.status(404).json(new ApiResponse(404, [], "Show not found after aggregation"));
        }

        console.log(`Theater ID:`, theaterId);
        console.log(`Populated Show:`, populatedShow[0]);

        return res.status(200).json(new ApiResponse(200, populatedShow, "Show details retrieved"));

    } catch (error) {
        console.error("Error creating show:", error);
        return res.status(500).json(new ApiError(500, "Error creating show"));
    }
});


 const testAggregation = async (req, res) => {
  try {
    const { id } = req.params; // Get the show ID from URL params
    if (!id) {
      return res.status(400).json({ message: "Show ID is required" });
    }

    const populatedShow = await Show.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } }, // Matching the show ID
      {
        $lookup: {
          from: "theaters", // Collection name
          localField: "theater",
          foreignField: "_id",
          as: "theater",
        },
      },
      { $unwind: "$theater" }, // Flatten the theater array into an object
      {
        $lookup: {
          from: "movies", // Collection name
          localField: "movie",
          foreignField: "_id",
          as: "movie",
        },
      },
      { $unwind: "$movie" }, // Flatten the movie array into an object
      {
        $project: {
          _id: 1,
          screenName: 1,
          startTime: 1,
          endTime: 1,
          format: 1,
          ticketPrice: 1,
          availableSeats: 1,
          totalSeats: 1,
          createdAt: 1,
          "theater._id": 1,
          "theater.name": 1,
          "theater.location": 1,
          "theater.capacity": 1,
          "theater.facilities": 1,
          "movie._id": 1,
          "movie.title": 1,
          "movie.genre": 1,
        },
      },

      {
        $merge: { into: "populated_shows", whenMatched: "merge", whenNotMatched: "insert" }
    }

    ]);

    console.log("Aggregation Result:", populatedShow); // Log for debugging
    console.log(`json stringify`,JSON.stringify(populatedShow, null, 2));


    if (populatedShow.length === 0) {
      return res.status(404).json({ message: "No show found" });
    }

    return res.status(200).json(populatedShow);
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ error: "Aggregation failed" });
  }
};





const getAllShows = asyncHandlar(async (req, res) => {
    try {
        const shows = await Show.find()
            .populate("theater", "name location capacity facilities")
            .populate("movie", "title genre duration");

            // console.log(`shows are here`,shows);
            

        if (!shows || shows.length === 0) {
            throw new ApiError(404, "No shows found");
        }

        return res
            .status(200)
            .json(new ApiResponse(200,shows,"Shows fetched successfully",));
    } catch (error) {
        console.error("Error fetching shows:", error);
        throw new ApiError(500, "Unable to fetch shows");
    }
});





const getShowById = asyncHandlar(async (req, res) => {
    try {
        const { showId } = req.params;

        const show = await Show.findById(showId);

        if (!show) {
            throw new ApiError(404, `Show with ID ${showId} not found`);
        }

        return res
            .status(200)
            .json(new ApiResponse(200, show, 'Show fetched successfully', ));
    } catch (error) {
        console.error('Error fetching show by ID:', error);
        throw new ApiError(500, 'Unable to fetch show details');
    }
});

const deleteShow = asyncHandlar(async (req, res) => {
    try {
        const { showId } = req.params;

        const show = await Show.findById(showId);

        // if (show.owner?._id.toString() !== req.admin?._id.toString()) {
        //     throw new ApiError(401, `Cannot delete show because you are not the owner`);
        // }

        await Show.findByIdAndDelete(showId);

        return res
            .status(200)
            .json(new ApiResponse(200, `Show deleted successfully`));
    } catch (error) {
        console.error(`Cannot delete show`, error);
    }
});


const getShowsByTheatre = asyncHandlar(async (req, res) => {
    try {
        const { theatreId } = req.params;
        if (!isValidObjectId(theatreId)) {
            throw new ApiError(400, "Invalid theatre ID");
        }

        const shows = await Show.find({ theater: theatreId })
            // .populate("theater", "name location capacity facilities")
            // .populate("movie", "title genre duration");

        if (!shows || shows.length === 0) {
            throw new ApiError(404, "No shows found for this theatre");
        }

        return res.status(200).json(new ApiResponse(200, shows, "Shows fetched successfully"));
    } catch (error) {
        console.error("Error fetching shows by theatre:", error);
        throw new ApiError(500, "Unable to fetch shows");
    }
});


const getShows = asyncHandlar(async (req, res) => {
    const { page = 1, limit = 10, format, startTime, minPrice, maxPrice, availableSeats, genre } = req.query;

    const pipeline = [];

    // 🔹 Filter by Format (2D, 3D, IMAX)
    if (format) {
        pipeline.push({ $match: { format } });
    }

    if(genre){
        pipeline.push({$match:{genre}})
    }

    // 🔹 Filter by Show Start Time (Upcoming Shows or a Specific Time)
    if (startTime) {
        pipeline.push({ $match: { startTime: { $gte: new Date(startTime) } } });
    }

    // 🔹 Filter by Ticket Price Range
    if (minPrice && maxPrice) {
        pipeline.push({
            $match: { ticketPrice: { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) } }
        });
    }

    // 🔹 Filter by Available Seats
    if (availableSeats === "true") {
        pipeline.push({
            $match: {
                "seats.status": "Available" // Ensure your schema supports this
            }
        });
    }

    // 🔹 Lookup to get Movie & Theater details
    pipeline.push(
        {
            $lookup: {
                from: "movies",
                localField: "movie",
                foreignField: "_id",
                as: "movieDetails"
            }
        },
        {
            $lookup: {
                from: "theaters",
                localField: "theater",
                foreignField: "_id",
                as: "theaterDetails"
            }
        },
        { $unwind: "$movieDetails" },
        { $unwind: "$theaterDetails" }
    );

    // 🔹 Sort by Start Time (Earliest shows first)
    pipeline.push({ $sort: { startTime: 1 } });

    // 🔹 Pagination
    const options = {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10)
    };

    // Execute aggregation with pagination
    const showAggregate = Show.aggregate(pipeline);
    const shows = await Show.aggregatePaginate(showAggregate, options);

    return res
        .status(200)
        .json(new ApiResponse(200, shows, "Shows fetched successfully"));
});


const getShowDetails = asyncHandlar(async (req, res) => {
    const { showId } = req.params;

    const show = await Show.findById(showId).populate("theater movie");

    if (!show) {
        throw new ApiError(404, "Show not found");
    }

    // Base Price Calculation
    const showTime = new Date(show.startTime);
    const dayOfWeek = showTime.getDay(); // 0 = Sunday, 6 = Saturday
    const hour = showTime.getHours();

    let basePrice = 200; // Default price

    // Weekend Pricing
    if (dayOfWeek === 0 || dayOfWeek === 6) {
        basePrice += 50;
    }

    // Peak Hours Pricing (6 PM - 10 PM)
    if (hour >= 18 && hour <= 22) {
        basePrice += 75;
    }

    // Update Seat Pricing Dynamically
    const updatedSeats = show.seats.map(seat => {
        let price = basePrice;
        if (seat.category === "Gold") price += 50;
        if (seat.category === "Platinum") price += 100;
        
        return { ...seat.toObject(), price };
    });

    res.status(200).json(new ApiResponse(200, { ...show.toObject(), seats: updatedSeats }, "Show details fetched successfully"));
});


const getShowByMovieId = asyncHandlar(async (req, res) => {
    try {
        const { movieId } = req.params;

        if (!movieId) {
            throw new ApiError(400, "Movie ID is required");
        }

        const show = await Show.findOne({ movie: movieId });

        if (!show) {
            throw new ApiError(404, `No show found for movie ID ${movieId}`);
        }

        return res
            .status(200)
            .json(new ApiResponse(200, show, 'Show fetched successfully'));
    } catch (error) {
        console.error('Error fetching show by movie ID:', error);
        throw new ApiError(500, 'Unable to fetch show details');
    }
});




export {
    createShow,
    testAggregation,
    getAllShows,
    getShowById,
    deleteShow,
    getShows,
    getShowDetails,
    getShowByMovieId
}


// {
//     "theaterId": "6798ad659141a1b5374df58a",
//     "screenName": "Screen Alpha",
//     "movie": "6793608f049051cec23b15b9",
//     "startTime": "2024-10-10T14:00:00.000Z",
//     "endTime": "2024-10-10T16:30:00.000Z",
//     "format": "IMAX",
//     "ticketPrice": 250
// }



// const getTheaterAndMovieDetails = async (req, res) => {
//     const { id: showId } = req.params;
//     if (!showId) {
//       return res.status(400).json(new ApiError(400, "Show ID is required"));
//     }
  
//     try {
//       const show = await Show.aggregate([
//         {
//           $match: {
//             _id: new mongoose.Types.ObjectId(showId),
//           },
//         },
//         {
//           $lookup: {
//             from: "theaters",
//             localField: "theater",
//             foreignField: "_id",
//             as: "theater",
//           },
//         },
//         { $unwind: "$theater" }, // Unwind the theater array
//         {
//           $lookup: {
//             from: "movies",
//             localField: "movie",
//             foreignField: "_id",
//             as: "movie",
//           },
//         },
//         { $unwind: "$movie" }, // Unwind the movie array
//         {
//           $project: {
//             _id: 1,
//             theater: 1,
//             movie: 1,
//             screenName: 1,
//             startTime: 1,
//             endTime: 1,
//             format: 1,
//             ticketPrice: 1,
//             availableSeats: 1,
//             totalSeats: 1,
//             createdAt: 1,
//           },
//         },
//       ]);
  
//       if (!show.length) {
//         return res.status(404).json(new ApiError(404, "Show not found"));
//       }
  
//       return res
//         .status(200)
//         .json(
//           new ApiResponse(200, show[0], "Theater and movie fetched successfully")
//         );
//     } catch (error) {
//       console.error("Error fetching show details:", error);
//       return res
//         .status(500)
//         .json(new ApiError(500, "Internal server error", error.message));
//     }
//   };