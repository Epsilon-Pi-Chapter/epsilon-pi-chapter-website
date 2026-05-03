#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "script.js");
const OUT = path.join(ROOT, "data", "lineage-data-entry.csv");

const source = fs.readFileSync(SRC, "utf8");
const startIdx = source.indexOf("const lineageData = {");
if (startIdx === -1) {
  console.error("Could not find lineageData declaration in script.js");
  process.exit(1);
}
const objStart = source.indexOf("{", startIdx);

let depth = 0;
let endIdx = -1;
let inStr = null;
let escape = false;
for (let i = objStart; i < source.length; i++) {
  const c = source[i];
  if (escape) { escape = false; continue; }
  if (inStr) {
    if (c === "\\") { escape = true; continue; }
    if (c === inStr) inStr = null;
    continue;
  }
  if (c === '"' || c === "'" || c === "`") { inStr = c; continue; }
  if (c === "{") depth++;
  else if (c === "}") {
    depth--;
    if (depth === 0) { endIdx = i; break; }
  }
}
if (endIdx === -1) {
  console.error("Could not locate end of lineageData object");
  process.exit(1);
}

const objSource = source.slice(objStart, endIdx + 1);
const lineageData = vm.runInNewContext("(" + objSource + ")");

function csvEscape(value) {
  if (value === undefined || value === null) return "";
  const s = String(value);
  if (s === "") return "";
  if (/[",\r\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

const seasonOrder = Object.keys(lineageData);

const header = ["Line", "Position", "LineName", "FullName", "Major", "Minor", "Hometown", "LinkedIn"];
const rows = [header];

let total = 0;
for (const season of seasonOrder) {
  const line = lineageData[season];
  for (const m of line.members) {
    rows.push([
      season,
      m.position || "",
      m.lineName || "",
      m.fullName || "",
      m.major || "",
      m.minor || "",
      m.hometown || "",
      m.linkedIn || "",
    ]);
    total++;
  }
}

const csv = rows.map((r) => r.map(csvEscape).join(",")).join("\r\n") + "\r\n";
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, csv, "utf8");
console.log(`Wrote ${total} member rows across ${seasonOrder.length} lines to ${path.relative(ROOT, OUT)}`);
