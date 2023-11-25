import express from "express";

// Controllers
import { createMessageController } from "../controllers/message/createMessage.controller";
import { readAllMessagesController } from "../controllers/message/readAllMessages.controller";

// Middlewares
import { validateBody, validateQuery } from "../middlewares/validate";
import { authMiddleware } from "../middlewares/auth";

// Schemas
import {
  createMessageSchema,
  readAllMessagesQuerySchema,
} from "../schema/message";

const router = express.Router();

/**
 * Create Message
 */
router.post("/", validateBody(createMessageSchema), createMessageController);

/**
 * Read All Messages
 */
router.get(
  "/",
  validateQuery(readAllMessagesQuerySchema),
  readAllMessagesController
);

export default router;
