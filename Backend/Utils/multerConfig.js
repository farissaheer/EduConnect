// import multer from "multer";
// // import moduleName from '../../Frontend/public';

// const courseAdd = multer.diskStorage({
//   destination: (req, file, cd) => {
//     cd(null, "../Frontend/public/pictures");
//   },
//   filename: (req, file, cd) => {
//     const originalFileName = file.originalname;
//     const fileNameWithoutSpaces = originalFileName.replace(/\s/g, ""); // Remove all spaces
//     cd(null, fileNameWithoutSpaces);
//   },
// });

// export const courseUpload = multer({ storage: courseAdd });

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

export const imageUpload = multer({ storage: uploadImage });
