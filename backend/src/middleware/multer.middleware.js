 import multer from "multer";
import fs from "fs";
import path from "path";

const tempDir = path.join("public", "temp");

// Ensure the folder exists
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true }); // recursive in case parent dirs don't exist
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, tempDir);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
