import sharp from "sharp";
import cloudinary from "../utilis/cloudinary.js";
import { User } from "../models/user.js";
import { Story } from "../models/Story.js";

// Upload a new story
export const createStory = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    if (!image) return res.status(400).json({ message: "Image required" });

    const optimaizedImageBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    const fileUri = `data:image/jpeg;base64,${optimaizedImageBuffer.toString(
      "base64"
    )}`;
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Story.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });
    const user = await User.findById(authorId);
    if (user) {
      user.storys.push(story._id);
      await user.save();
    }
    await story.populate({ path: "author", select: "-password" });
    return res.status(201).json({
      message: "New Story created",
      post,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// Get all stories

export const getAllStories = async (req, res) => {
  try {
    const storys = await Story.find()
      .sort({ timestamp: -1 })
      .populate({ path: "author", select: "username profilePicture" });

    return res.status(200).json({ storys, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching stories", error: error.message });
  }
};

// Get stories of a specific user
export const getUserStory = async (req, res) => {
  try {
    const authorId = req.id;
    const storys = await Story.find({ author: authorId })
      .sort({ timestamp: -1 })
      .populate({
        path: "author",
        select: "username profilePicture",
      });

    return res.status(200).json({ storys, success: true });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Error fetching user stories", error: error.message });
  }
};
