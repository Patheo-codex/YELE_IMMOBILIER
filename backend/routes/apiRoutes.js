const express = require("express");
const apiController = require("../controllers/apiController");
const authController = require("../controllers/authController");
const propertyController = require("../controllers/propertyController");
const contactController = require("../controllers/contactController");
const uploadController = require("../controllers/uploadController");
const loginLimiter = require("../middleware/loginLimiter");
const requireAdmin = require("../middleware/requireAdmin");
const projectImageUpload = require("../middleware/projectImageUpload");
const requireTrustedOrigin = require("../middleware/requireTrustedOrigin");
const contactLimiter = require("../middleware/contactLimiter");

const router = express.Router();

router.get("/", apiController.getHome);
router.get("/service", apiController.getService);
router.post("/api/auth/login", requireTrustedOrigin, loginLimiter, authController.login);
router.get("/api/auth/session", requireAdmin, authController.getSession);
router.post("/api/auth/logout", requireTrustedOrigin, requireAdmin, authController.logout);
router.get("/api/properties", propertyController.listProperties);
router.get("/api/properties/:id", propertyController.getProperty);
router.post("/api/properties", requireTrustedOrigin, requireAdmin, propertyController.createProperty);
router.put("/api/properties/:id", requireTrustedOrigin, requireAdmin, propertyController.updateProperty);
router.delete("/api/properties/:id", requireTrustedOrigin, requireAdmin, propertyController.deleteProperty);
router.post("/api/uploads/project-image", requireTrustedOrigin, requireAdmin, projectImageUpload.single("image"), uploadController.uploadProjectImage);
router.get("/api/contact-messages", requireAdmin, contactController.listContactMessages);
router.put("/api/contact-messages/:id/read", requireTrustedOrigin, requireAdmin, contactController.markContactMessageRead);
router.delete("/api/contact-messages/:id", requireTrustedOrigin, requireAdmin, contactController.deleteContactMessage);
router.post("/api/contact", requireTrustedOrigin, contactLimiter, contactController.createContactMessage);

module.exports = router;
