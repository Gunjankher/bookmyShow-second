import { ApiError } from "../utilis/ApiError.js";
import { asyncHandlar } from "../utilis/asyncHandlar.js";
import jwt from "jsonwebtoken";
import { Admin } from "../models/admin.model.js"; // Import the Admin model

export const adminVerifyJWT = asyncHandlar(async (req,res, next) => {
  try {
    const token =
      req.cookies?.adminAccessToken || req.header("Authorization")?.replace("Bearer ", "").trim();

    console.log("Token found:", token);
    console.log("Cookies in request:", req.cookies);


    if (!token) {
      throw new ApiError(401, "Unauthorized Request");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // console.log("Decoded Token for admin:", decodedToken); // 🔥 This will show the role

    const admin = await Admin.findById(decodedToken?._id).select("-password -refreshToken");

    if (decodedToken.role !== "admin") {
      throw new ApiError(403, "Forbidden: Not an admin");
    }

    if (!admin) {
      throw new ApiError(401, "Admin Not Found");
    }

    req.admin = admin; // Attach the admin object to the request
    next();

  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Access Token");
  }
});
