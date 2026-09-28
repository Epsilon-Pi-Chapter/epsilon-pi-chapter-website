const { json } = require("./_lib/http");
const { config, listContent } = require("./_lib/supabase");

module.exports = async function handler(req, res) {
  if (req.method !== "GET") return json(res, 405, { error: "Method not allowed." });
  if (!config().configured) return json(res, 200, { configured: false, events: [], iceColdTuesdays: [], galleryImages: [] });
  try {
    const content = await listContent();
    res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
    return json(res, 200, { configured: true, ...content });
  } catch (error) {
    return json(res, 500, { error: "Content is temporarily unavailable." });
  }
};
