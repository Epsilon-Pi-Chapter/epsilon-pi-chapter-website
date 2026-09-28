const { hasValidSession, json } = require("../_lib/http");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed." });
  return json(res, 200, { authenticated: hasValidSession(req) });
};
