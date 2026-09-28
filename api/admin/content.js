const { json, parseBody, requireAdmin } = require("../_lib/http");
const { config, createRecord, deleteRecord, listContent, supabaseFetch, updateRecord } = require("../_lib/supabase");

module.exports = async function handler(req, res) {
  if (!requireAdmin(req, res)) return;
  try {
    if (req.method === "GET") return json(res, 200, await listContent({ includeUnpublished: true }));
    const body = parseBody(req);
    if (req.method === "POST") return json(res, 201, { item: (await createRecord(body.resource, body.data))[0] });
    if (req.method === "PUT") return json(res, 200, { item: (await updateRecord(body.resource, body.id, body.data))[0] });
    if (req.method === "DELETE") {
      const item = (await deleteRecord(body.resource, body.id))[0];
      if (body.resource === "galleryImages" && item?.storage_path && !item.storage_path.startsWith("/") && !/^https?:\/\//i.test(item.storage_path)) {
        await supabaseFetch(`/storage/v1/object/${config().bucket}`, {
          method: "DELETE",
          body: JSON.stringify({ prefixes: [item.storage_path] }),
        });
      }
      return json(res, 200, { item });
    }
    return json(res, 405, { error: "Method not allowed." });
  } catch (error) {
    return json(res, error.status || 500, { error: error.message || "The content change could not be saved." });
  }
};
