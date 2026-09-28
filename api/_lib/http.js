const crypto = require("crypto");

const SESSION_COOKIE = "epi_undergrad_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function json(res, status, payload) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  if (!res.hasHeader("Cache-Control")) res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(payload));
}

function parseBody(req) {
  if (!req.body) return {};
  if (typeof req.body === "object") return req.body;
  try {
    return JSON.parse(req.body);
  } catch {
    return {};
  }
}

function safeEqual(left, right) {
  const leftBuffer = Buffer.from(String(left || ""));
  const rightBuffer = Buffer.from(String(right || ""));
  if (leftBuffer.length !== rightBuffer.length) return false;
  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

function sessionSecret() {
  return process.env.CMS_SESSION_SECRET || "";
}

function signSession(expiresAt) {
  return crypto.createHmac("sha256", sessionSecret()).update(String(expiresAt)).digest("base64url");
}

function createSessionToken() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  return `${expiresAt}.${signSession(expiresAt)}`;
}

function parseCookies(req) {
  return String(req.headers.cookie || "")
    .split(";")
    .map((part) => part.trim().split("="))
    .reduce((cookies, [key, ...value]) => {
      if (key) cookies[key] = decodeURIComponent(value.join("="));
      return cookies;
    }, {});
}

function hasValidSession(req) {
  if (!sessionSecret()) return false;
  const token = parseCookies(req)[SESSION_COOKIE];
  if (!token) return false;
  const [expiresAt, signature] = token.split(".");
  if (!expiresAt || !signature || Number(expiresAt) <= Math.floor(Date.now() / 1000)) return false;
  return safeEqual(signature, signSession(expiresAt));
}

function setSessionCookie(res) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader(
    "Set-Cookie",
    `${SESSION_COOKIE}=${encodeURIComponent(createSessionToken())}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${SESSION_TTL_SECONDS}${secure}`
  );
}

function clearSessionCookie(res) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === "production" ? "; Secure" : "";
  res.setHeader("Set-Cookie", `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${secure}`);
}

function requireAdmin(req, res) {
  if (hasValidSession(req)) return true;
  json(res, 401, { error: "Your portal session has expired. Please sign in again." });
  return false;
}

module.exports = {
  clearSessionCookie,
  hasValidSession,
  json,
  parseBody,
  requireAdmin,
  safeEqual,
  setSessionCookie,
};
