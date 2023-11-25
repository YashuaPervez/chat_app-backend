import express from "express";

// Controllers
import { signupController } from "../controllers/auth/signup.controller";
import { loginController } from "../controllers/auth/login.controller";
import { logoutController } from "../controllers/auth/logout.controller";

// Middlewares
import { validateBody } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";

// Schemas
import { signupSchema, loginSchema } from "../schema/user";

const router = express.Router();

/**
 * Signup
 */
router.post("/signup", validateBody(signupSchema), signupController);

/**
 * Login
 */
router.post("/login", validateBody(loginSchema), loginController);

/**
 * Login
 */
router.post("/logout", authMiddleware(), logoutController);

export default router;
