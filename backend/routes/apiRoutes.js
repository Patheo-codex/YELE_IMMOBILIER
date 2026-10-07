const express = require("express");
const apiController = require("../controllers/apiController");

const router = express.Router();

router.get("/", apiController.getHome);
router.get("/service", apiController.getService);

module.exports = router;
