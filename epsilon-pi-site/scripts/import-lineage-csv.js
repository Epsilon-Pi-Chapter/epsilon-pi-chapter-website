#!/usr/bin/env node
/**
 * Import a filled-in lineage CSV back into script.js.
 *
 * Match key: (Line, Position). For each matched member, overwrite:
 *   fullName, lineName, major, minor, hometown, linkedIn
 *
 * Usage:
 *   node scripts/import-lineage-csv.js <csv-path>
 *   (defaults to data/lineage-data-entry.csv if no arg given)
 */
const fs = require("fs");
const path = require("path");

const csvArg = process.argv[2] || path.join(__dirname, "..", "data", "lineage-data-entry.csv");
const scriptPath = path.join(__dirname, "..", "script.js");

function parseCSV(text) {
  const rows = [];
  let row = [];
  let cur = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"') {
        if (text[i + 1] === '"') { cur += '"'; i += 1; }
        else inQuotes = false;
      } else cur += ch;
    } else {
      if (ch === '"') inQuotes = true;
      else if (ch === ",") { row.push(cur); cur = ""; }
      else if (ch === "\n") { row.push(cur); rows.push(row); row = []; cur = ""; }
      else if (ch === "\r") { /* skip */ }
      else cur += ch;
    }
  }
  if (cur.length || row.length) { row.push(cur); rows.push(row); }
  return rows;
}

function jsStr(v) {
  return String(v).replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

const csvRaw = fs.readFileSync(csvArg, "utf8");
const rows = parseCSV(csvRaw).filter((r) => r.length > 1 && r.some((c) => c !== ""));
const header = rows.shift();
const idx = Object.fromEntries(header.map((h, i) => [h.trim(), i]));
const required = ["Line", "Position", "LineName", "FullName", "Major", "Minor", "Hometown", "LinkedIn"];
for (const k of required) if (!(k in idx)) { console.error("Missing column:", k); process.exit(1); }

// Build lookup keyed by `${Line}\u0000${Position}`
const csvMap = new Map();
for (const r of rows) {
  const key = `${r[idx.Line]}\u0000${r[idx.Position]}`;
  csvMap.set(key, {
    fullName: r[idx.FullName] || "",
    lineName: r[idx.LineName] || "",
    major:    r[idx.Major]    || "",
    minor:    r[idx.Minor]    || "",
    hometown: r[idx.Hometown] || "",
    linkedIn: r[idx.LinkedIn] || "",
  });
}

let src = fs.readFileSync(scriptPath, "utf8");

// Walk script.js and update each member line. Track current term via header
// regex `"Spring YYYY": {`.
const lines = src.split("\n");
let currentTerm = null;
let updated = 0;
let unmatched = 0;
const memberLineRe = /^(\s*\{\s*position:\s*")([^"]+)("\s*,\s*fullName:\s*")([^"]*)("\s*,\s*lineName:\s*")([^"]*)("\s*,\s*photo:\s*")([^"]*)("\s*,\s*major:\s*")([^"]*)("\s*,\s*minor:\s*")([^"]*)("\s*,\s*hometown:\s*")([^"]*)("\s*,\s*linkedIn:\s*")([^"]*)("\s*\}\s*,?\s*)$/;
const termHeaderRe = /^\s*"(Spring \d{4}|Fall \d{4})":\s*\{\s*$/;

for (let i = 0; i < lines.length; i += 1) {
  const line = lines[i];
  const th = line.match(termHeaderRe);
  if (th) { currentTerm = th[1]; continue; }
  const m = line.match(memberLineRe);
  if (!m || !currentTerm) continue;
  const position = m[2];
  const photo = m[8]; // preserve photo as-is
  const key = `${currentTerm}\u0000${position}`;
  const csv = csvMap.get(key);
  if (!csv) {
    unmatched += 1;
    continue;
  }
  lines[i] =
    m[1] + position +
    m[3] + jsStr(csv.fullName) +
    m[5] + jsStr(csv.lineName) +
    m[7] + photo +
    m[9] + jsStr(csv.major) +
    m[11] + jsStr(csv.minor) +
    m[13] + jsStr(csv.hometown) +
    m[15] + jsStr(csv.linkedIn) +
    m[17];
  updated += 1;
}

fs.writeFileSync(scriptPath, lines.join("\n"));
console.log(`Updated ${updated} member entries from ${path.relative(process.cwd(), csvArg)}.`);
if (unmatched) console.log(`Skipped ${unmatched} member lines with no matching CSV row.`);
