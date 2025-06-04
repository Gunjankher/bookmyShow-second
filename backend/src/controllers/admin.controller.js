import { asyncHandlar } from "../utilis/asyncHandlar.js";
import { ApiError } from "../utilis/ApiError.js";
import { Admin } from "../models/admin.model.js";
import { uploadOnCloudinary } from "../utilis/cloudinary.js";
import { ApiResponse } from "../utilis/ApiResponse.js";
import jwt from "jsonwebtoken";
import { json } from "express";
import mongoose from "mongoose";

const generateAccessTokenAndRefeshToken = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const accessToken = admin.generateAccessToken();
    const refreshToken = admin.generateRefreshToken();
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      401,
      "Something went Wrong while Generating Access and Refesh Token ",
    );
  }
};

const registerAdmin = asyncHandlar(async (req, res) => {
  const { fullName, email, username, password } = req.body;
  console.log("email", email);

  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  const existedAdmin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (existedAdmin) {
    throw new ApiError(409, "Admin with email or username already exists");
  }

  const avatarLocalPath = req.files?.avatar?.[0].path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar Image is required");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!avatar) {
    throw new ApiError(400, "Avatar Image is Must required");
  }

  const admin = await Admin.create({
    fullName,
    password,
    email,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    username: username.toLowerCase(),
    role:'admin'
  });

  const createdAdmin = await Admin.findById(admin._id).select("-password");

  if (!createdAdmin) {
    throw new ApiError(500, "Something Went wrong while registering the Admin");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, createdAdmin, "Admin Registered Successfully"));
});

const loginAdmin = asyncHandlar(async (req, res) => {
  const { email, username, password } = req.body;
  if (!(username || email)) {
    throw new ApiError(400, "username or email is required.");
  }

  const admin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await admin.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Password is invalid ");
  }

  const { accessToken, refreshToken } = await generateAccessTokenAndRefeshToken(
    admin._id,
  );

  const loggedInAdmin = await Admin.findById(admin._id).select(
    "-password -refreshToken",
  );

  if (loggedInAdmin) {
    console.log(`Admin logged in`);
  }

  // console.log(`accessToken`,accessToken);
  // console.log(`refreshToken`,refreshToken);
  

  const options = {
    httpOnly: true,
    secure: true,
    sameSite:'None'
  };

  return res
    .status(200)
    .cookie("adminAccessToken", accessToken, options)
    .cookie("adminRefreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },

        "Admin Logged in Successfully",
      ),
    );
});

const logoutAdmin = asyncHandlar(async (req, res) => {

  // console.log(`req.admin`,req?.admin);
  
  await Admin.findByIdAndUpdate(
    req.admin?._id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    },
  );

  const options = {
    httpOnly: true,
    secure: true,
    sameSite:"None"
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(
      new ApiResponse(
        200,
        {
          
        },

        "Admin Logged out Successfully",
      ),
    );
});

const refreshAccessToken = asyncHandlar(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized Request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
    );

    const admin = await Admin.findById(decodedToken?._id);

    if (!admin) {
      throw new ApiError(401, "Invalid refresh Token");
    }

    if (incomingRefreshToken !== admin?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired or used ");
    }

    const options = {
      httpOnly: true,
      secure: true,
    };

    const { accessToken, newRefreshToken } =
      await generateAccessTokenAndRefeshToken(admin._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },

          "Access Token Refreshed",
        ),
      );
  } catch (error) {
    throw new ApiError(401, error.message || "Invalid Refresh Token");
  }
});

const changeAdminPassword = asyncHandlar(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const admin = await Admin.findById(req.admin?._id);

  const isPasswordCorrect = await admin.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid old password");
  }

  admin.password = newPassword;

  await admin.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password Changed Successfully"));
});

const getCurrentAdmin = asyncHandlar(async (req, res, next) => {
  if (!req.admin) {
    return next(new ApiError(401, "Admin not authenticated"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, req.admin, "Current Admin fetched Successfully"));
});

const updateAdminDetails = asyncHandlar(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError("Fullname and Email are required");
  }

  const admin = await Admin.findByIdAndUpdate(
    req.admin?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },

    {
      new: true,
    },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Account details updated successfully"));
});


const updateAdminAvatar = asyncHandlar(async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const admin = await Admin.findByIdAndUpdate(
    req.admin?._id,
    {
      avatar: avatar.url,
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Avatar image updated successfully"));
});

const updateAdminCoverImage = asyncHandlar(async (req, res) => {
  const coverImageLocalPath = req.file?.path;

  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }

  //TODO: delete old image - assignment

  const coverImage = await uploadOnCloudinary(coverImageLocalPath);

  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading on avatar");
  }

  const admin = await Admin.findByIdAndUpdate(
    req.admin?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, admin, "Cover image updated successfully"));
});

export {
    registerAdmin,
    loginAdmin,
    logoutAdmin,
    refreshAccessToken,
    changeAdminPassword,
    getCurrentAdmin,
    updateAdminAvatar,
    updateAdminCoverImage,
    updateAdminDetails,
  };
  
