const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadsDir = path.resolve(__dirname, "../uploads");
fs.mkdirSync(uploadsDir, { recursive: true });
console.log("multer uploadsDir:", uploadsDir);

// Allow only image files
const fileFilter = (req, file, cb) => {
  console.log("multer file arrived:", {
    fieldname: file.fieldname,
    originalname: file.originalname,
    mimetype: file.mimetype,
  });

  if (file.mimetype && file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },

  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const uniqueName = Date.now() + extension;

    cb(null, uniqueName);
  },
});

const uploadImage = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
}).single("image");

module.exports = (req, res, next) => {
  console.log("➡ Upload middleware started");

  uploadImage(req, res, (err) => {
    console.log("⬅ Multer callback reached");

    if (err instanceof multer.MulterError) {
      console.log("Multer Error:", err);
      return res.status(400).json({ error: err.message });
    }

    if (err) {
      console.log("Other Error:", err);
      return res.status(400).json({ error: err.message || "Upload failed" });
    }

    console.log("Uploaded File:", req.file);
    next();
  });
};