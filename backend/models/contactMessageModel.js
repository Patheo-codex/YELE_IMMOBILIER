const mongoose = require("mongoose");

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Le nom est obligatoire."],
      trim: true,
      maxlength: [120, "Le nom ne peut pas dépasser 120 caractères."],
    },
    email: {
      type: String,
      required: [true, "L’email est obligatoire."],
      trim: true,
      maxlength: [200, "L’email ne peut pas dépasser 200 caractères."],
    },
    phone: {
      type: String,
      trim: true,
      default: "",
      maxlength: [50, "Le téléphone ne peut pas dépasser 50 caractères."],
    },
    subject: {
      type: String,
      required: [true, "L’objet est obligatoire."],
      trim: true,
      maxlength: [200, "L’objet ne peut pas dépasser 200 caractères."],
    },
    message: {
      type: String,
      required: [true, "Le message est obligatoire."],
      trim: true,
      maxlength: [5000, "Le message ne peut pas dépasser 5000 caractères."],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ContactMessage", contactMessageSchema);
