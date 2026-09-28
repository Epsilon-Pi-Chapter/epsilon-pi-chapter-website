const crypto = require("crypto");
const { json, parseBody, requireAdmin } = require("../_lib/http");
const { config, supabaseFetch } = require("../_lib/supabase");

function cleanFileName(name) {
  const extension = String(name || "").split(".").pop().toLowerCase().replace(/[^a-z0-9]/g, "") || "jpg";
  const base = String(name || "upload").replace(/\.[^.]+$/, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "upload";
  return `${base.slice(0, 70)}-${crypto.randomUUID()}.${extension}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") return json(res, 405, { error: "Method not allowed." });
  if (!requireAdmin(req, res)) return;
  try {
    const { fileName, contentType, folder = "uploads" } = parseBody(req);
    const extension = String(fileName || "").split(".").pop().toLowerCase();
    const allowedExtensions = new Set(["jpg", "jpeg", "png", "webp", "gif", "avif"]);
    if (!String(contentType || "").startsWith("image/") || !allowedExtensions.has(extension)) {
      return json(res, 400, { error: "Only JPG, PNG, WebP, GIF, and AVIF images can be uploaded." });
    }
    const safeFolder = String(folder).toLowerCase().replace(/[^a-z0-9/-]+/g, "-").replace(/^\/+|\/+$/g, "") || "uploads";
    const path = `${safeFolder}/${new Date().getFullYear()}/${cleanFileName(fileName)}`;
    const { bucket, url } = config();
    const result = await supabaseFetch(`/storage/v1/object/upload/sign/${bucket}/${path.split("/").map(encodeURIComponent).join("/")}`, {
      method: "POST",
      body: JSON.stringify({ upsert: false }),
    });
    const signedPath = result.url || result.signedURL || result.signedUrl;
    if (!signedPath) throw new Error("Supabase did not return a signed upload URL.");
    const uploadUrl = signedPath?.startsWith("http") ? signedPath : `${url}/storage/v1${signedPath}`;
    return json(res, 200, { path, uploadUrl, token: result.token || "" });
  } catch (error) {
    return json(res, error.status || 500, { error: error.message || "The upload could not be prepared." });
  }
};
