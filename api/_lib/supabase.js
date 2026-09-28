const TABLES = {
  events: "events",
  iceColdTuesdays: "ice_cold_tuesdays",
  galleryImages: "gallery_images",
};

const RESOURCE_FIELDS = {
  events: [
    "title", "event_date", "start_time", "end_time", "location", "description", "category",
    "flyer_path", "recap", "recap_flyer_path", "published",
  ],
  iceColdTuesdays: ["entry_date", "title", "caption", "instagram_url", "thumbnail_path", "published"],
  galleryImages: ["storage_path", "title", "caption", "category", "event_date", "event_id", "sort_order", "published"],
};

function config() {
  const url = String(process.env.SUPABASE_URL || "").replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || "";
  return { url, key, bucket: process.env.SUPABASE_MEDIA_BUCKET || "chapter-media", configured: Boolean(url && key) };
}

async function supabaseFetch(path, options = {}) {
  const { url, key, configured } = config();
  if (!configured) throw new Error("Supabase environment variables are not configured.");
  const response = await fetch(`${url}${path}`, {
    ...options,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });
  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;
  if (!response.ok) {
    const error = new Error(payload?.message || payload?.error || `Supabase request failed (${response.status}).`);
    error.status = response.status;
    throw error;
  }
  return payload;
}

function publicMediaUrl(path) {
  if (!path) return "";
  if (path.startsWith("/")) return path;
  if (/^https?:\/\//i.test(path)) return path;
  const { url, bucket } = config();
  return `${url}/storage/v1/object/public/${bucket}/${path.split("/").map(encodeURIComponent).join("/")}`;
}

function selectFields(resource, input) {
  const allowed = RESOURCE_FIELDS[resource];
  if (!allowed) throw new Error("Unsupported content type.");
  return allowed.reduce((result, field) => {
    if (Object.prototype.hasOwnProperty.call(input, field)) result[field] = input[field] === "" ? null : input[field];
    return result;
  }, {});
}

async function listContent({ includeUnpublished = false } = {}) {
  const publicationFilter = includeUnpublished ? "" : "&published=eq.true";
  const [events, iceColdTuesdays, galleryImages] = await Promise.all([
    supabaseFetch(`/rest/v1/events?select=*&order=event_date.asc,start_time.asc${publicationFilter}`),
    supabaseFetch(`/rest/v1/ice_cold_tuesdays?select=*&order=entry_date.desc${publicationFilter}`),
    supabaseFetch(`/rest/v1/gallery_images?select=*&order=sort_order.asc,created_at.desc${publicationFilter}`),
  ]);

  const decoratedGallery = galleryImages.map((image) => ({ ...image, url: publicMediaUrl(image.storage_path) }));
  const imagesByEvent = decoratedGallery.reduce((map, image) => {
    if (image.event_id) (map[image.event_id] ||= []).push(image);
    return map;
  }, {});

  return {
    events: events.map((event) => ({
      ...event,
      flyer_url: publicMediaUrl(event.flyer_path),
      recap_flyer_url: publicMediaUrl(event.recap_flyer_path),
      related_images: imagesByEvent[event.id] || [],
    })),
    iceColdTuesdays: iceColdTuesdays.map((entry) => ({ ...entry, thumbnail_url: publicMediaUrl(entry.thumbnail_path) })),
    galleryImages: decoratedGallery,
  };
}

async function createRecord(resource, input) {
  const table = TABLES[resource];
  if (!table) throw new Error("Unsupported content type.");
  return supabaseFetch(`/rest/v1/${table}`, {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(selectFields(resource, input)),
  });
}

async function updateRecord(resource, id, input) {
  const table = TABLES[resource];
  if (!table || !id) throw new Error("A valid content item is required.");
  return supabaseFetch(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "PATCH",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(selectFields(resource, input)),
  });
}

async function deleteRecord(resource, id) {
  const table = TABLES[resource];
  if (!table || !id) throw new Error("A valid content item is required.");
  return supabaseFetch(`/rest/v1/${table}?id=eq.${encodeURIComponent(id)}`, {
    method: "DELETE",
    headers: { Prefer: "return=representation" },
  });
}

module.exports = { config, createRecord, deleteRecord, listContent, publicMediaUrl, supabaseFetch, updateRecord };
