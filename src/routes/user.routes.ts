import express from "express";

// Controllers
import { meController } from "../controllers/user/me.controller";
import { getUserListController } from "../controllers/user/getUserList.controller";

// Middlewares
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

/**
 * Me
 */
router.get("/me", meController);

/**
 * Get User List
 */
router.get("/", getUserListController);

export default router;
