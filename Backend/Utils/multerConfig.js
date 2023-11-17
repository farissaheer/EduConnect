import multer from "multer";

const uploadImage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Frontend/public/Assets/images"); // Set the destination path
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const fileNameWithoutSpaces = originalFileName.replace(/\s/g, ""); // Remove all spaces
    cb(null, fileNameWithoutSpaces);
  },
});

const uploadVideo = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../Frontend/public/Assets/videos"); // Set the destination path
  },
  filename: (req, file, cb) => {
    const originalFileName = file.originalname;
    const fileNameWithoutSpaces = originalFileName.replace(/\s/g, ""); // Remove all spaces
    cb(null, fileNameWithoutSpaces);
  },
});

export const imageUpload = multer({ storage: uploadImage });
export const videoUpload = multer({ storage: uploadVideo });
