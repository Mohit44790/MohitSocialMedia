import express from "express";
import {
  createStory,
  getAllStories,
  getUserStory,
} from "../controllers/storyController.js";
import multer from "multer";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // Configure multer to use memory storage

router.post("/upload", isAuthenticated, upload.single("image"), createStory);
router.get("/allStory", isAuthenticated, getAllStories);
router.get("/userStory/all", isAuthenticated, getUserStory);

export default router;
