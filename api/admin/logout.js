const { clearSessionCookie, json } = require("../_lib/http");

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  clearSessionCookie(res);
  return json(res, 200, { ok: true });
};
