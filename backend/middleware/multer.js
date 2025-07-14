import multer from "multer";
import { existsSync, mkdirSync } from "fs";
import { join } from "path";

// ensure the uploads folder exists
const uploadDir = join(process.cwd(), "uploads");
if (!existsSync(uploadDir)) {
  mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  // tell Multer where to put the file
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  // give it a unique, valid filename
  filename(req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// export the configured instance
const upload = multer({ storage });
export default upload;
