import express, { Router } from "express";

// Routes
import authRoutes from "./auth.routes";
import userRoutes from "./user.routes";
import messageRoutes from "./message.routes";

// Middlewares
import { authMiddleware } from "../middlewares/auth";

const router = express.Router();

/**
 * Registering authentication routes
 */
router.use("/auth", authRoutes);

/**
 * Registering protected routes
 */
type RoutesMapper = {
  key: string;
  router: Router;
};

router.use(authMiddleware());

const protectedRoutes: RoutesMapper[] = [
  { key: "user", router: userRoutes },
  { key: "message", router: messageRoutes },
];

protectedRoutes.forEach((route) => {
  router.use(`/protected/${route.key}`, route.router);
});

export default router;
