const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const sessionCookieName = "yele_admin_session";
const sessionDurationMs = 8 * 60 * 60 * 1000;

function cookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.COOKIE_SAME_SITE || (process.env.NODE_ENV === "production" ? "none" : "strict"),
    maxAge: sessionDurationMs,
    path: "/",
  };
}

function isAuthConfigured() {
  return Boolean(
    process.env.ADMIN_USERNAME &&
      process.env.ADMIN_PASSWORD_HASH &&
      process.env.JWT_SECRET &&
      process.env.JWT_SECRET.length >= 32
  );
}

async function login(req, res) {
  if (!isAuthConfigured()) {
    return res.status(503).json({ message: "L’authentification administrateur n’est pas configurée." });
  }

  const { username, password } = req.body || {};
  const passwordMatches = typeof password === "string" &&
    await bcrypt.compare(password, process.env.ADMIN_PASSWORD_HASH);
  const usernameMatches = typeof username === "string" &&
    username.toLowerCase() === process.env.ADMIN_USERNAME.toLowerCase();

  if (!usernameMatches || !passwordMatches) {
    return res.status(401).json({ message: "Identifiants incorrects." });
  }

  const token = jwt.sign(
    { sub: process.env.ADMIN_USERNAME, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: "8h", issuer: "yele-immobilier" }
  );

  res.cookie(sessionCookieName, token, cookieOptions());
  return res.json({ user: { username: process.env.ADMIN_USERNAME } });
}

function getSession(req, res) {
  return res.json({ user: { username: req.admin.username } });
}

function logout(_req, res) {
  res.clearCookie(sessionCookieName, { ...cookieOptions(), maxAge: undefined });
  return res.status(204).end();
}

module.exports = { login, getSession, logout, sessionCookieName, isAuthConfigured };