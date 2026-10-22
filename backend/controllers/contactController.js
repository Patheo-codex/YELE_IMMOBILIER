const ContactMessage = require("../models/contactMessageModel");

async function listContactMessages(req, res, next) {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    return res.json(messages);
  } catch (error) {
    return next(error);
  }
}

async function createContactMessage(req, res, next) {
  try {
    const { name, email, phone, subject, message } = req.body || {};

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "Nom, email, objet et message sont obligatoires.",
      });
    }

    const createdMessage = await ContactMessage.create({
      name: String(name).trim(),
      email: String(email).trim(),
      phone: String(phone || "").trim(),
      subject: String(subject).trim(),
      message: String(message).trim(),
    });

    return res.status(201).json(createdMessage);
  } catch (error) {
    return next(error);
  }
}

async function markContactMessageRead(req, res, next) {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { read: true },
      { new: true }
    );
    if (!message) {
      return res.status(404).json({ message: "Message client introuvable." });
    }

    return res.json(message);
  } catch (error) {
    return next(error);
  }
}

async function deleteContactMessage(req, res, next) {
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: "Message client introuvable." });
    }

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listContactMessages,
  createContactMessage,
  markContactMessageRead,
  deleteContactMessage,
};
