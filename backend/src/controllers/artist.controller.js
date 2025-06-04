import { Artist} from "../models/artist.model.js";
import { ApiError } from "../utilis/ApiError.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";
import { uploadOnCloudinary } from "../utilis/cloudinary.js";



// ✅ Create Artist
export const createArtist = asyncHandlar(async (req, res) => {
    const { name, occupation, born, description } = req.body;

    const avatarLocalPath = req.files?.avatar?.[0]?.path;

     if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar Image is required");
      }

      const avatar = await uploadOnCloudinary(avatarLocalPath);

    //    if (!avatar) {
    //       throw new ApiError(400, "Avatar Image is Must required");
    //     }

    const newArtist = await Artist.create({ name, occupation, born, avatar:avatar?.url, description });

    console.log(`newartst`,newArtist);
    

    res.status(201).json(new ApiResponse(201, newArtist, "Artist created successfully"));
});



// ✅ Get All Artists
export const getAllArtists = asyncHandlar(async (req, res, next) => {
    const artists = await Artist.find();
    res.status(200).json(new ApiResponse(200, artists, "All artists fetched"));
});

// ✅ Get Artist by ID
export const getArtistById = async (req, res, next) => {
    try {
      const { id } = req.params;

      
  
      if (!id) {
        return res.status(400).json({ message: "Artist ID is missing" });
      }
  
      const artist = await Artist.findById(id);
  
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
  
      res.status(200).json(new ApiResponse(200, artist, "Artist get successfully"));
    } catch (error) {
      next(error);
    }
  };
  

// ✅ Update Artist
export const updateArtist = asyncHandlar(async (req, res, next) => {
    const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedArtist) return next(new ApiError(404, "Artist not found"));

    res.status(200).json(new ApiResponse(200, updatedArtist, "Artist updated successfully"));
});

// ✅ Delete Artist
export const deleteArtist = asyncHandlar(async (req, res, next) => {
    const deletedArtist = await Artist.findByIdAndDelete(req.params.id);
    if (!deletedArtist) return next(new ApiError(404, "Artist not found"));

    res.status(200).json(new ApiResponse(200, deletedArtist, "Artist deleted successfully"));
});