const cloudinary = require("cloudinary").v2;

function uploadProjectImage(req, res, next) {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return res.status(503).json({ message: "Cloudinary n’est pas configuré sur le serveur." });
  }

  if (!req.file) {
    return res.status(400).json({ message: "Sélectionnez une image à envoyer." });
  }

  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "yele-immobilier/properties",
      resource_type: "image",
      allowed_formats: ["jpg", "jpeg", "png", "webp", "avif"],
    },
    (error, result) => {
      if (error) return next(error);
      return res.status(201).json({ image: result.secure_url });
    }
  );

  uploadStream.end(req.file.buffer);
}

module.exports = { uploadProjectImage };