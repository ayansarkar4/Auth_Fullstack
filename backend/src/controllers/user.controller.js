import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const registerUser = asyncHandler(async (req, res) => {
  // 1 .get user details from frontend
  const { fullName, email, password } = req.body;

  console.log("i  want request.body", req.body);
  if (!req.body) {
    throw new ApiError(400, "Request body is missing");
  }

  // 2 .validate user details
  // if (fullName === "" || email === "" || password === "" || username === "") {
  //   throw new ApiError(400, "All fields are required");
  // }
  //another process here
  if ([email, password, fullName].some((fleld) => fleld?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }
  if (!email.includes("@")) {
    throw new ApiError(400, "Invalid email address");
  }

  // 3 .check if user already exists
  const existedUser = await User.findOne({
    $or: [{ email }, { fullName }],
  });

  if (existedUser) {
    throw new ApiError(409, "User already exists");
  }

  // 6 .create user object - create entry in db
  const user = await User.create({
    fullName: fullName,
    email: email.toLowerCase() || "",

    password,
  });

  // 7 .remove password and refreshtoken from user object
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  // 8 .check if user is created
  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  // 9 .send response
  return res
    .status(201)
    .json(new ApiResponse(201, createdUser, "User created successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  console.log("email", email);

  if (!email) {
    throw new ApiError(400, " email is required");
  }

  // Convert email to lowercase for consistency
  const user = await User.findOne({
    $or: [{ email: email?.toLowerCase() }],
  });

  console.log("User found in DB:", user);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  console.log("Password valid:", isPasswordValid);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = { httpOnly: true, secure: true };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "User logged in successfully"
      )
    );
});

export { registerUser, loginUser };
