import asyncHandler from "../utils/asyncHandler.js";
import Joi from "joi";
import ApiError from "../utils/ApiError.js";

const signupValidation = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    fullName: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const{error} = schema.validate(req.body)
    if (error) {
        throw new ApiError(400, error.details[0].message);
    }
    next();
});
const loginValidation = asyncHandler(async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(100).required(),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    throw new ApiError(400, error.details[0].message);
  }
  next();
});
export { signupValidation, loginValidation };
