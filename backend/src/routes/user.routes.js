import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { loginUser } from "../controllers/user.controller.js";
import { loginValidation, signupValidation } from "../middlewares/validation.middlewares.js";

const router = Router()

router.route("/register").post(signupValidation,registerUser);
router.route("/login").post(loginValidation,loginUser);
export default router;

