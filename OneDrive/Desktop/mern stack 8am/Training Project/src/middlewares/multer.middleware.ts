import multer from "multer";
import fs from "fs";
import path from "path";
import { Request } from "express";
import AppError from "../utils/appError.utils";

const uploader = () => {
  const folder = "uploads/";
  const fileSize = 5 * 1024 * 1024; // 5MB max file size

  const allowed_exts = [".png", ".jpg", ".jpeg", ".webp", ".svg", ".pdf"];

  const allowed_mime_types = [
    "image/png",
    "image/jpeg",
    "image/webp",
    "image/svg+xml",
    "application/pdf",
  ];

  //* Create upload folder if it does not exist
  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder, { recursive: true });
  }

  //* Multer disk storage
  const storage = multer.diskStorage({
    destination: (req: Request, file: Express.Multer.File, callback) => {
      callback(null, folder);
    },

    filename: (req: Request, file: Express.Multer.File, callback) => {
      const filename = Date.now() + "_" + file.originalname;

      callback(null, filename);
    },
  });

  //* File filter
  const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    //* Check file extension
    if (!allowed_exts.includes(path.extname(file.originalname).toLowerCase())) {
      cb(
        new AppError(
          `Only ${allowed_exts.join(", ")} file types are allowed`,
          400,
        ),
      );
      return;
    }

    //* Check MIME type
    if (!allowed_mime_types.includes(file.mimetype)) {
      cb(
        new AppError(
          "Invalid file type. Only image & PDF files are allowed",
          400,
        ),
      );
      return;
    }
    cb(null, true);
  };

  //* Multer upload instance
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
      fileSize: fileSize,
    },
  });
  return upload;
};

export default uploader;
