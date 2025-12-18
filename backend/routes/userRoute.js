import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
  logout,
} from "../controllers/userController.js";
import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/profile", isAuthenticated, getUserProfile);
router.put("/profile", isAuthenticated, updateUserProfile);
router.delete("/profile", isAuthenticated, deleteUserProfile);
router.get("/logout", logout);

export default router;
