import {asyncHandlar} from '../utilis/asyncHandlar.js'
import {ApiResponse} from '../utilis/ApiResponse.js'
import {ApiError} from '../utilis/ApiError.js'
import { Theater } from '../models/theater.model.js'
import mongoose from 'mongoose'





const createTheater = asyncHandlar(async(req,res)=>{
    try {
        
const {name,location,capacity,facilities,screens} = req.body


if([name,location,capacity,facilities,screens].some((field)=> field === 0)){
throw new ApiError(404, "all fields are required")
}


// if(!req.admin?._id){
// throw new ApiError(404,`admin authentication is required`)
// }




const theater = await Theater.create({
    name,
    location,
    capacity,
    facilities,
    screens,
    owner:req.admin?._id
})


const createdTheater = await Theater.findById(theater._id)


if(!createdTheater){
    throw new ApiError(404,`can not find the theater`)
}


return res
.status(200)
.json(new ApiResponse(201,theater,`theater created Sucessfully`))


    } catch (error) {
        console.error(`error creating the theater`,error)
    }
})



const updateTheater = asyncHandlar(async(req,res)=>{

try {
    const {name,location,capacity,facilities,screens} = req.body
    const {theaterId} = req.params

    if([name,location,capacity,facilities,screens].some((field)=> field === 0)){
        throw new ApiError(404, "all fields are required")
        }



        const theater = await Theater.findById(theaterId)


        if(!theater){
            throw new ApiError(400, `can not find the theater`)
        }


        const updateTheater = await Theater.findByIdAndUpdate(
            theaterId,
            {
                $set:{
                    name,
                    location,
                    capacity,
                    facilities,
                    screens
                }
            },
        {new:true}
        )


if(!updateTheater){
    throw new ApiError(`can not update`)
}

return res
.status(200)
.json(new ApiResponse(
    400,
    updateTheater,
    `therater updated Sucessfully`
))


} catch (error) {
    console.error(`can not update thater`, error)
}

})

const deleteTheater = asyncHandlar(async(req,res)=>{
    try {
        
        const {theaterId} = req.params

        const theater = await Theater.findById(theaterId)

        if(theater.owner?._id.toString() !== req.admin?._id.toString() ){
            throw new ApiError(401,`cannot delete theater cuz you are not the owner`)
        }


        await Theater.findByIdAndDelete(theaterId)
        
return res
.status(200)
.json(new ApiResponse(200,`theater deleted SucessFully`))

    } catch (error) {
        console.error(`can not delete theater`,error)
    }
})


const getAllTheaters = asyncHandlar(async (req, res) => {
    try {
      const theaters = await Theater.find();
  
      if (!theaters || theaters.length === 0) {
        throw new ApiError(404, 'No theaters found');
      }
  
      return res
        .status(200)
        .json(new ApiResponse(200, 'Theaters fetched successfully', theaters));
    } catch (error) {
      console.error('Error fetching theaters:', error);
      throw new ApiError(500, 'Unable to fetch theaters');
    }
  });

  

  const getTheaterById = asyncHandlar(async (req, res) => {
    try {
      const { theaterId } = req.params;
  
      const theater = await Theater.findById(theaterId);
  
      if (!theater) {
        throw new ApiError(404, `Theater with ID ${theaterId} not found`);
      }
  
      return res
        .status(200)
        .json(new ApiResponse(200, 'Theater fetched successfully', theater));
    } catch (error) {
      console.error('Error fetching theater by ID:', error);
      throw new ApiError(500, 'Unable to fetch theater details');
    }
  });
  



  const assignMovieScreen = asyncHandlar(async(req,res)=>{
    try {
        
        const { theaterId, screenId, movieId } = req.body;

        if (!theaterId || !screenId || !movieId) {
            throw new ApiError(400, "Theater ID, Screen ID, and Movie ID are required");
        }

        // Find the theater
        const theater = await Theater.findById(theaterId);
        if (!theater) {
            throw new ApiError(404, "Theater not found");
        }

        // Find the screen inside the theater
        const screen = theater.screens.id(screenId);
        if (!screen) {
            throw new ApiError(404, "Screen not found in the theater");
        }

        // Assign the movie to the screen
        screen.movie = movieId;
        await theater.save();

        const updatedTheater = await Theater.findById(theaterId)
        .populate({
            path: "screens.movie", 
            model: "Movie" // Explicitly define the model
          })
          .exec();

          console.log(`updated Theater`,updatedTheater);
          

        return res.status(200).json(new ApiResponse(200, updatedTheater, "Movie assigned to screen successfully"));

    } catch (error) {
        console.log(`error while assigning the movie`, error);
        
    }
  })

  const removeMovieFromScreen = asyncHandlar(async (req, res) => {
    try {
        const { theaterId, screenId } = req.body;

        if (!theaterId || !screenId) {
            throw new ApiError(400, "Theater ID and Screen ID are required");
        }

        // Find the theater
        const theater = await Theater.findById(theaterId);
        if (!theater) {
            throw new ApiError(404, "Theater not found");
        }

        // Find the screen inside the theater
        const screen = theater.screens.id(screenId);
        if (!screen) {
            throw new ApiError(404, "Screen not found in the theater");
        }

        // Remove the movie from the screen
        screen.movie = null;
        await theater.save();

        
        const updatedTheater = await Theater.findById(theaterId)
        .populate({
            path: "screens.movie", 
            model: "Movie" // Explicitly define the model
          })
          .exec();

        return res.status(200).json(new ApiResponse(200, updatedTheater, "Movie removed from screen successfully"));

    } catch (error) {
        console.error("Error removing movie:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});

const getTheatersByMovie = asyncHandlar(async (req, res) => {
    try {
        const { movieId } = req.params;

        if (!movieId) {
            throw new ApiError(400, "Movie ID is required");
        }

        if (!movieId || !mongoose.Types.ObjectId.isValid(movieId)) {
            throw new ApiError(400, "Valid Movie ID is required");
        }

        const theaters = await Theater.find({ "screens.movie": movieId });

        if (!theaters || theaters.length === 0) {
            throw new ApiError(404, "No theaters found for this movie");
        }

        return res
            .status(200)
            .json(new ApiResponse(200, "Theaters fetched successfully", theaters));
    } catch (error) {
        console.error("Error fetching theaters by movie ID:", error);
        throw new ApiError(500, "Unable to fetch theater details");
    }
});


export{
    createTheater,
    updateTheater,
    deleteTheater,
    getAllTheaters,
    getTheaterById,
    assignMovieScreen,
    removeMovieFromScreen,
    getTheatersByMovie
}