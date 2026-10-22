require("dotenv").config();

const cors = require("cors");
const cookieParser = require("cookie-parser");
const express = require("express");
const mongoose = require("mongoose");
const apiRoutes = require("./routes/apiRoutes");

const app = express();
app.set("trust proxy", 1);
const port = process.env.PORT || 5000;
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error("Origine non autorisée."));
  },
  credentials: true,
}));
app.use(express.json({ limit: "6mb" }));
app.use(cookieParser());
app.use(apiRoutes);

app.use((error, _req, res, _next) => {
  if (error.code === "LIMIT_FILE_SIZE") {
    return res.status(400).json({ message: "La photo doit faire moins de 5 Mo." });
  }

  if (error.name === "MulterError" || error.message === "Le fichier sélectionné doit être une image.") {
    return res.status(400).json({ message: error.message });
  }

  if (error.name === "ValidationError") {
    return res.status(400).json({ message: error.message });
  }

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Identifiant de bien invalide." });
  }

  console.error(error);
  return res.status(500).json({ message: "Une erreur interne est survenue." });
});

const mongoUri = process.env.MONGODB_URI || process.env.DATABASE_URL;

mongoose
  .connect(mongoUri)
  .then(() => {
    app.listen(port, () => {
      console.log(`Serveur YELE Immobilier démarré sur le port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Impossible de se connecter à MongoDB :", error.message);
    process.exitCode = 1;
  });