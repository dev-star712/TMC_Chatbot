import express from "express";
import path from "path";
import multer from "multer";
import { upload } from "../controllers/fileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "backend/uploads/");
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const extension = path.extname(file.originalname);
    const fileName = `${timestamp}${extension}`;
    cb(null, fileName);
  },
});

const uploadStorage = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 },
});

router.route("/uploads").post(protect, uploadStorage.single("file"), upload);

export default router;
