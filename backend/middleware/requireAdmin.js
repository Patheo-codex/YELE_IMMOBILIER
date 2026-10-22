const jwt = require("jsonwebtoken");
const { sessionCookieName, isAuthConfigured } = require("../controllers/authController");

function requireAdmin(req, res, next) {
  if (!isAuthConfigured()) {
    return res.status(503).json({ message: "L’authentification administrateur n’est pas configurée." });
  }

  const token = req.cookies[sessionCookieName];
  if (!token) {
    return res.status(401).json({ message: "Authentification requise." });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET, {
      issuer: "yele-immobilier",
    });

    if (payload.role !== "admin" || payload.sub !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ message: "Session administrateur invalide." });
    }

    req.admin = { username: payload.sub };
    return next();
  } catch (_error) {
    return res.status(401).json({ message: "Session expirée ou invalide." });
  }
}

module.exports = requireAdmin;