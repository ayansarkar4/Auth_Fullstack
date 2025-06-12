import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Access token is missing");
  }
  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  const user = await User.findById(decoded._id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }
  req.user = user;
  next();
});
export default authMiddleware;
