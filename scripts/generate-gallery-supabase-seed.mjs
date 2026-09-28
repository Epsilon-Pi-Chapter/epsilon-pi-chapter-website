import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(scriptDir, "..");
const manifestPath = path.join(repoRoot, "data", "gallery-media.js");
const outputPath = path.join(repoRoot, "supabase", "migrations", "002_seed_existing_gallery.sql");
const source = fs.readFileSync(manifestPath, "utf8").trim();
const json = source.replace(/^window\.EPI_GALLERY_MEDIA\s*=\s*/, "").replace(/;\s*$/, "");
const items = JSON.parse(json);

const categoryMap = {
  Service: "Service",
  Campus: "Campus Event",
  Brotherhood: "Brotherhood",
  Homecoming: "Homecoming",
};

const sqlValue = (value) => value == null || value === "" ? "null" : `'${String(value).replace(/'/g, "''")}'`;
const rows = items.map((item, index) => {
  const storagePath = `/${String(item.src).replace(/^\/+/, "")}`;
  const category = categoryMap[item.badge] || "Other";
  return `  (${sqlValue(storagePath)}, ${sqlValue(item.title)}, ${sqlValue(item.caption)}, ${sqlValue(category)}, ${index}, true)`;
});

const sql = `-- Generated from data/gallery-media.js by scripts/generate-gallery-supabase-seed.mjs.\n` +
  `insert into public.gallery_images (storage_path, title, caption, category, sort_order, published)\nvalues\n` +
  `${rows.join(",\n")}\n` +
  `on conflict (storage_path) do nothing;\n`;

fs.writeFileSync(outputPath, sql, "utf8");
console.log(`Generated ${outputPath} with ${items.length} gallery rows.`);
