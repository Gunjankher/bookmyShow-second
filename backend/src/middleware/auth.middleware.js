import { ApiError } from "../utilis/ApiError.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { Admin } from "../models/admin.model.js"; // Import the Admin model

export const verifyJWT = asyncHandlar(async (req, _, next) => {
  try {
    // Check for the token in cookies or Authorization header
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "").trim();
    console.log("Token found:", token);

    if (!token) {
      throw new ApiError(401, "Unauthorized Request: No token provided");
    }

    // Verify the token and decode
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log("Decoded Token:", decodedToken); // Debugging the token contents

    // Check for user authentication
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
    if (decodedToken.role === "user" && user) {
      req.user = user;  // Attach user data to the request object
      return next();
    }

    // Check for admin authentication
    const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken");
    if (decodedToken.role === "admin" && admin) {
      req.admin = admin;  // Attach admin data to the request object
      return next();
    }

    // If neither user nor admin is found or role doesn't match, throw an error
    throw new ApiError(401, "Invalid Access Token or Role Mismatch");

  } catch (error) {
    // Handle specific token expiration errors
    if (error.name === "TokenExpiredError") {
      throw new ApiError(401, "Token expired. Please log in again.");
    }
    // Handle general errors (invalid token, etc.)
    throw new ApiError(401, error.message || "Invalid Access Token");
  }
});
