const Property = require("../models/propertyModel");

async function listProperties(req, res, next) {
  try {
    const filters = {};

    for (const field of ["city", "type", "operation", "status"]) {
      if (req.query[field]) {
        filters[field] = req.query[field];
      }
    }

    const properties = await Property.find(filters).sort({ createdAt: -1 });
    return res.json(properties);
  } catch (error) {
    return next(error);
  }
}

async function getProperty(req, res, next) {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Bien immobilier introuvable." });
    }

    return res.json(property);
  } catch (error) {
    return next(error);
  }
}

async function createProperty(req, res, next) {
  try {
    const property = await Property.create(req.body);
    return res.status(201).json(property);
  } catch (error) {
    return next(error);
  }
}

async function updateProperty(req, res, next) {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!property) {
      return res.status(404).json({ message: "Bien immobilier introuvable." });
    }

    return res.json(property);
  } catch (error) {
    return next(error);
  }
}

async function deleteProperty(req, res, next) {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ message: "Bien immobilier introuvable." });
    }

    return res.status(204).end();
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  listProperties,
  getProperty,
  createProperty,
  updateProperty,
  deleteProperty,
};