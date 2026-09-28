const { json, parseBody, safeEqual, setSessionCookie } = require("../_lib/http");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  const expectedPassword = process.env.UNDERGRAD_PORTAL_PASSWORD || "";
  const sessionSecret = process.env.CMS_SESSION_SECRET || "";
  if (!expectedPassword || !sessionSecret) return json(res, 503, { error: "The portal has not been configured yet." });
  const { password } = parseBody(req);
  if (!safeEqual(password, expectedPassword)) return json(res, 401, { error: "That password was not accepted." });
  setSessionCookie(res);
  return json(res, 200, { ok: true });
};
