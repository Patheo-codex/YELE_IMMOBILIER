const serviceModel = require("../models/serviceModel");

function getHome(_req, res) {
  res.json({
    message: "Bienvenue sur l'API YELE Immobilier",
    endpoints: ["/", "/service"],
  });
}

function getService(_req, res) {
  res.json(serviceModel.getService());
}

module.exports = { getHome, getService };
