const allowedOrigins = new Set(
  (process.env.CORS_ORIGINS || "http://localhost:5173,http://localhost:5174")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

function requireTrustedOrigin(req, res, next) {
  const origin = req.get("Origin");
  if (!origin && process.env.NODE_ENV === "production") {
    return res.status(403).json({ message: "L’origine de la requête est requise." });
  }

  if (origin && !allowedOrigins.has(origin)) {
    return res.status(403).json({ message: "Origine de requête non autorisée." });
  }

  return next();
}

module.exports = requireTrustedOrigin;