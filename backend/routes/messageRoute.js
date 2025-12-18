import express from "express";
import {
  sendMessage,
  getAllMessages,
  deleteMessage,
  updateMessage,
} from "../controllers/messageController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/send", isAuthenticated, sendMessage);
router.get("/getall", isAuthenticated, getAllMessages);
router.delete("/delete/:id", isAuthenticated, deleteMessage);
router.put("/update/:id", isAuthenticated, updateMessage);

export default router;
