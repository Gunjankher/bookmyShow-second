import {asyncHandlar} from '../utilis/asyncHandlar.js'
import {ApiResponse} from '../utilis/ApiResponse.js'
import {ApiError} from '../utilis/ApiError.js'
import {User} from '../models/user.model.js'
import {Movie} from '../models/movie.model.js'
import { Admin } from '../models/admin.model.js'
import {deleteOnCloudinary, uploadOnCloudinary} from '../utilis/cloudinary.js'
import mongoose, { isValidObjectId } from 'mongoose'
import { Theater } from '../models/theater.model.js'





const createMovie = asyncHandlar(async(req,res)=>{

try {
    const {title,genre,formats,description,characters} = req.body
    
    // if([title,genre,description].some((field)=>field?.trim() ===0)){
    //     throw new ApiError(`All the fields are required`)
    // }

    const formattedFormats = Array.isArray(formats)
  ? formats
  : typeof formats === "string"
  ? formats.split(",").map(f => f.trim())
  : [];
    
    
console.log(`admin request`,req.admin);


    if(!req.admin?._id){
        throw new ApiError(`user is not authenticated`)
    }


    
    
    const trailerLocalPath = req.files?.trailer[0].path
    const posterLocalPath = req.files?.poster[0].path
    const coverPosterLocalPath = req.files?.coverPoster[0].path
    
    
    if(!trailerLocalPath){
        throw new ApiError(404`trailerLocalPath is required`)
    }
    
    if(!posterLocalPath){
        throw new ApiError(404,`posterLocalPath is required`)
    }
    
    if(!coverPosterLocalPath){
        throw new ApiError(404,`coverPosterLocalPath is required`)
    }
    

    console.log(`Files Recevied`,req.files);
    
    
    
    const trailer = await uploadOnCloudinary(trailerLocalPath)
    const poster = await uploadOnCloudinary(posterLocalPath)
    
    let coverPoster;
try {
  coverPoster = await uploadOnCloudinary(coverPosterLocalPath);
  console.log(`local cover poster`,coverPosterLocalPath);
  console.log(` cover poster`,coverPoster);
  
  if (!coverPoster) throw new Error("coverPoster upload returned null");
} catch (err) {
  throw new ApiError(404, `coverPoster failed to upload: ${err.message}`);
}
    
    
    if(!trailer){
        throw new ApiError(404, `trailer is failed to upload`)
    }
    if(!poster){
        throw new ApiError(404, `poster is failed to upload`)
    }
    if(!coverPoster){
        throw new ApiError(404, `coverPoster is failed to upload`)
    }
    
    
    const movie = await Movie.create({
        title,
        genre,
        formats :formattedFormats,
        description,
        characters,
        trailer:{
            url:trailer.url,
            public_id:trailer.public_id
        },
        poster:{
            url:poster.url,
            public_id:poster.public_id
        },
        coverPoster:{
            url:coverPoster.url,
            public_id:coverPoster.public_id
        },
        owner:req.admin?._id
    })
    
    
    const movieUploaded = await Movie.findById(movie?._id)
    .populate({
        path: "characters",
        populate: { path: "playedBy", select: "name occupation avatar" } // Populating artist details
    });
    
    
    if(!movieUploaded){
        throw new ApiError(404, `movie creating failed`)
    }
    
    console.log(`creating movie`,movie);
    

    return res
    .status(200)
    .json(new ApiResponse(200,movie,`movie created sucessfully`))
    
    
} catch (error) {
    console.error(`movie creation failed`, error)
}
})



const updateMovie = asyncHandlar(async(req,res)=>{

try {
   
    const {title,genre,formats,description,} = req.body

    const {movieId} = req.params
    
    // if([title,genre,formats,numofRatings,description].some((field)=>field?.trim() ===0)){
    //     throw new ApiError(`All the fields are required`)
    // }

    console.log("Files in request:", req.files);
console.log("Body in request:", req.body);

    if(!isValidObjectId(movieId)){
        throw new ApiError(400,`invalid objectId`)
    }


    const movie = await Movie.findById(movieId)

    if(!movie){
        throw new ApiError(404,`movie is not found`)
    }

if(!movie.owner){
    throw new ApiError(404,'moive owner information is missing')
}

if(movie?.owner?.toString() !== req.admin?._id.toString()){
    throw new ApiError(404 , `you cant update the movie cuz you are not the owner`)
}


const posterToDelete = movie.poster.public_id
const CoverPosterToDelete = movie.coverPoster?.public_id


const posterLocalPath = req.files?.poster[0]?.path
const coverPosterLocalPath = req.files?.coverPoster[0]?.path


console.log(`poster local path`, posterLocalPath);
console.log(`coverposter local path`, coverPosterLocalPath);


if(!posterLocalPath){
    throw new ApiError(404,`poster local path is required`)
}
if(!coverPosterLocalPath){
    throw new ApiError(404,`coverposter local path is required`)
}


const poster = await uploadOnCloudinary(posterLocalPath)
const coverPoster = await uploadOnCloudinary(coverPosterLocalPath)


const updateMovie = await Movie.findByIdAndUpdate(
    movieId,
    {
        $set:{
           title,
           genre,
           formats,
           description,
           poster:{
            url:poster.url,
            public_id:poster.public_id
        },
        coverPoster:{
            url:coverPoster.url,
            public_id:coverPoster.public_id
        },
        }
    }
)


const updatedMovie = await Movie.findById(movieId)



if(updatedMovie){
    await deleteOnCloudinary(posterToDelete)
    await deleteOnCloudinary(coverPosterLocalPath)
}


return res
.status(200)
.json(new ApiResponse(200, updatedMovie,`movie updated Sucessfully`))

} catch (error) {
    console.error(`error while updating movie`,error)
}

})



const deleteMovie = asyncHandlar(async(req,res)=>{

try {

const {movieId} = req.params
// console.log(`admin`,req.admin);



if (!isValidObjectId(movieId)) {
    throw new ApiError(400, "Invalid videoId");
}


const movie = await Movie.findById(movieId)


// console.log(`movie`, movie);


if(!movie){
    throw new ApiError(`can not find the movie`)
}

// console.log(`owner`,movie?.owner);
// console.log(`owner req`,req.admin);


// if(!movie.owner){
//     throw new ApiError(404,'moive owner information is missing')
// }

// if(movie?.owner?.toString() !== req.admin?._id.toString()){
//     throw new ApiError(404 , `you cant update the movie cuz you are not the owner`)
// }



const movieDeleted = await Movie.findByIdAndDelete(movie?._id)


if(!movieDeleted){
    throw new ApiError(`can not delete the movie`)
}


await deleteOnCloudinary(movie.poster?.public_id)
await deleteOnCloudinary(movie.coverPoster?.public_id)
await deleteOnCloudinary(movie.trailer?.public_id)


return res
.status(200)
.json(new ApiResponse (200, `video deleted Sucessfully`))


    
} catch (error) {
    console.error(`cannot delete movie`, error)
}


})


const getMovieById = asyncHandlar(async (req, res, next) => {
    try {
        const movie = await Movie.findById(req.params.id)
            .populate({
                path: "characters",
                populate: { path: "playedBy", select: "name occupation avatar" } // Populating artist details
            });

        if (!movie) {
            return next(new ApiError(404, "Movie not found"));
        }

        res.status(200).json(new ApiResponse(200, movie, "Movie fetched successfully"));
    } catch (error) {
        return next(new ApiError(500, "Error fetching movie"));
    }
});


const getAllMovies = asyncHandlar(async (req, res, next) => {
    const movies = await Movie.find()
        .populate({
            path: "characters",
            populate: { path: "playedBy", select: "name occupation avatar" }
        })
        .populate("owner", "name email");

    // if (!movies || movies.length === 0) {
    //     throw new ApiError(404, "No movies found");
    // }

    // console.log(`All movies`,movies);
    
    res.status(200).json(new ApiResponse(200, movies, "Movies fetched successfully"));
});



const assignMovieToTheaters = asyncHandlar(async (req, res) => {
    try {
        let { movieId, theaterIds } = req.body;

        console.log("Request Body:", req.body);
        console.log("Movie ID:", movieId);
console.log("Valid ID:", mongoose.Types.ObjectId.isValid(movieId));

        // if (!movieId || !theaterIds) {
        //     throw new ApiError(400, "Movie ID and Theater ID(s) are required");
        // }

        // Convert single theater ID to an array
        if (!Array.isArray(theaterIds)) {
            theaterIds = [theaterIds]; // Convert single theater ID into an array
        }

        // Check if the movie exists
        const movie = await Movie.findById(movieId);
        if (!movie) throw new ApiError(404, "Movie not found");



        // Check if all theaters exist
        const theaters = await Theater.find({ _id: { $in: theaterIds } });
        if (theaters.length !== theaterIds.length) {
            throw new ApiError(404, "One or more theaters not found");
        }

        // Add the movie to each theater's screens
        await Theater.updateMany(
            { _id: { $in: theaterIds } },
            { $push: { "screens.$[].movie": movieId } } // Adds the movie to all screens in each theater
        );

        // Update the movie document to include these theaters
        movie.theaters.push(...theaterIds);
        await movie.save();

        return res.status(200).json(new ApiResponse(200, movie, "Movie assigned to theaters successfully"));
    } catch (error) {
        console.error("Error assigning movie to theaters:", error);
        throw new ApiError(500, "Internal Server Error");
    }
});



export {
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieById,
    getAllMovies,
    assignMovieToTheaters,

    

}





