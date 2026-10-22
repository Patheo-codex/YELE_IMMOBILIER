const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Le titre est obligatoire."],
      trim: true,
      maxlength: [120, "Le titre ne peut pas dépasser 120 caractères."],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [3000, "La description ne peut pas dépasser 3000 caractères."],
    },
    price: {
      type: Number,
      required: [true, "Le prix est obligatoire."],
      min: [0, "Le prix doit être positif ou nul."],
    },
    city: {
      type: String,
      required: [true, "La ville est obligatoire."],
      trim: true,
    },
    type: {
      type: String,
      enum: ["Maison", "Appartement", "Villa", "Terrain", "Bureau", "Autre"],
      default: "Autre",
    },
    operation: {
      type: String,
      enum: ["Vente", "Location"],
      default: "Vente",
    },
    image: {
      type: String,
      trim: true,
      default: "",
    },
    owner: {
      type: String,
      trim: true,
      maxlength: [120, "Le nom du propriétaire ne peut pas dépasser 120 caractères."],
      default: "",
    },
    status: {
      type: String,
      enum: ["Disponible", "Indisponible"],
      default: "Disponible",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Property", propertySchema);