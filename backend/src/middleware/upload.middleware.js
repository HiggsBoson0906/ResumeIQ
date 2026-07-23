const multer = require("multer");

// Store file in memory
const storage = multer.memoryStorage();

// Allow only PDF files
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed"), false);
  }
};

// Configure multer
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;
