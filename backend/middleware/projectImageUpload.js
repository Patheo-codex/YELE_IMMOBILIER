const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter(_req, file, callback) {
    if (!file.mimetype.startsWith("image/")) {
      return callback(new Error("Le fichier sélectionné doit être une image."));
    }
    return callback(null, true);
  },
});

module.exports = upload;