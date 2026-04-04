const officerContainer = document.getElementById("officer-list");
const lineageContainer = document.getElementById("lineage-list");

const officersData = [
  { role: "President", name: "Kaion N. Hamilton, III", photo: "assets/portraits/kaion-hamilton-iii.png" },
  { role: "Vice-President", name: "Jahkari N. Taylor", photo: "" },
  { role: "Corresponding Secretary", name: "Jaylen L. Johnson", photo: "assets/portraits/jaylen-johnson.png" },
  { role: "Recording Secretary", name: "Malcolm J. Warren", photo: "assets/portraits/malcolm-warren.png" },
  { role: "Treasurer", name: "Xavier J. Spindle", photo: "" },
  { role: "Chapter Dean", name: "Jordan A. Cain", photo: "" },
  { role: "Historian", name: "Jerome Sutton, III", photo: "assets/portraits/jerome-sutton-iii.png" },
  { role: "Associate Editor of the Sphinx", name: "Keshun Nelson", photo: "assets/portraits/keshun-nelson.png" },
  { role: "Parliamentarian", name: "Khamani Battiste", photo: "assets/portraits/khamani-battiste.png" },
  { role: "Sergeant-At-Arms", name: "Allan J. White", photo: "" },
  { role: "Chapter Advisor", name: "Dr. Leon Rousen", photo: "assets/portraits/leon-rousen.png" },
];

// State outline assets: place one image per state in assets/states/ (e.g. va.png, md.png).
// Use transparent background + gold border for best look; or we'll use your outline as-is.
const STATE_OUTLINE_PATH = {
  VA: "assets/states/va.png", MD: "assets/states/md.png", MARYLAND: "assets/states/md.png", PA: "assets/states/pa.png", AL: "assets/states/al.png", GA: "assets/states/ga.png", NC: "assets/states/nc.png",
  NY: "assets/states/ny.png", NEWYORK: "assets/states/ny.png",
  IL: "assets/states/il.png", ILLINOIS: "assets/states/il.png",
  WI: "assets/states/wi.png", WISCONSIN: "assets/states/wi.png",
  CA: "assets/states/ca.png", CALIFORNIA: "assets/states/ca.png",
  NJ: "assets/states/nj.png", NEWJERSEY: "assets/states/nj.png",
  MI: "assets/states/mi.png", MICHIGAN: "assets/states/mi.png",
  DC: "assets/states/dc.png", DISTRICTOFCOLUMBIA: "assets/states/dc.png",
  MA: "assets/states/ma.png", MASSACHUSETTS: "assets/states/ma.png",
  TX: "assets/states/tx.png", TEXAS: "assets/states/tx.png",
  SC: "assets/states/sc.png", SOUTHCAROLINA: "assets/states/sc.png",
};

// The phi: place your gold phi image at assets/hand-sign.png
const HAND_SIGN_PATH = "assets/hand-sign.png";

// City position on state (x%, y%) — approximate; adjust so the phi sits on the city.
// Keys: "City Name" or normalized (lowercase, no extra spaces). Fallback: state default or center.
const CITY_POSITION = {
  VA: { "portsmouth": [90, 88], "hampton": [84, 86], "chester": [74, 66], "fredricksburg": [70, 32], "fredericksburg": [70, 32], "chesapeake": [87, 91], "richmond": [62, 55], "halifax county": [62, 45], "halifax": [62, 45], "woodbridge": [75, 35], "prince george": [72, 70], "spotsylvania": [68, 42], "manassas": [68, 28], "newport news": [88, 82], "petersburg": [68, 58], "danville": [55, 45], default: [65, 65] },
  MD: { "prince george's county": [40, 58], "pg county": [40, 58], "fort washington": [52, 72], "baltimore": [62, 42], default: [50, 50] },
  MARYLAND: { "baltimore": [62, 42], default: [50, 50] },
  PA: { "philadelphia": [78, 75], default: [50, 50] },
  AL: { "huntsville": [55, 25], default: [50, 50] },
  GA: { "atlanta": [48, 38], default: [50, 50] },
  NC: { "williamston": [72, 55], default: [50, 50] },
  NY: { "mount vernon": [72, 45], "brooklyn": [78, 55], default: [50, 50] },
  NEWYORK: { "mount vernon": [72, 45], default: [50, 50] },
  IL: { "chicago": [72, 38], default: [50, 50] },
  ILLINOIS: { "chicago": [72, 38], default: [50, 50] },
  WI: { "milwaukee": [68, 48], default: [50, 50] },
  WISCONSIN: { "milwaukee": [68, 48], default: [50, 50] },
  CA: { "carson": [48, 78], default: [50, 50] },
  CALIFORNIA: { "carson": [48, 78], default: [50, 50] },
  NJ: { "neptune": [55, 45], "paterson": [72, 42], default: [50, 50] },
  NEWJERSEY: { "neptune": [55, 45], default: [50, 50] },
  MI: { "detroit": [72, 35], default: [50, 50] },
  MICHIGAN: { "detroit": [72, 35], default: [50, 50] },
  DC: { "washington": [50, 50], default: [50, 50] },
  MA: { "boston": [72, 40], default: [50, 50] },
  MASSACHUSETTS: { "boston": [72, 40], default: [50, 50] },
  TX: { "dallas": [45, 38], default: [50, 50] },
  TEXAS: { "dallas": [45, 38], default: [50, 50] },
  SC: { "chester": [52, 30], default: [50, 50] },
  SOUTHCAROLINA: { "chester": [52, 30], default: [50, 50] },
};

const STORAGE_KEY = "rap-sheet-position-overrides";

function getPositionOverrides() {
  try {
    const s = sessionStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
}

function setPositionOverride(state, cityKey, x, y) {
  const overrides = getPositionOverrides();
  if (!overrides[state]) overrides[state] = {};
  overrides[state][cityKey] = [Math.round(x), Math.round(y)];
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(overrides));
}

const CROP_STORAGE_KEY = "rap-sheet-crop-overrides";
const DEFAULT_CROP = { x: 50, y: 35 };

function getCropOverrides() {
  try {
    const s = sessionStorage.getItem(CROP_STORAGE_KEY);
    return s ? JSON.parse(s) : {};
  } catch {
    return {};
  }
}

function setCropOverride(fullName, xPercent, yPercent) {
  const overrides = getCropOverrides();
  overrides[fullName] = { x: Math.round(xPercent), y: Math.round(yPercent) };
  sessionStorage.setItem(CROP_STORAGE_KEY, JSON.stringify(overrides));
}

function getCropValue(fullName) {
  const overrides = getCropOverrides();
  const v = overrides[fullName];
  if (v == null) return DEFAULT_CROP;
  if (typeof v === "number") return { x: 50, y: v };
  return { x: v.x != null ? v.x : 50, y: v.y != null ? v.y : 35 };
}

function parseHometown(hometown) {
  if (!hometown || !hometown.trim()) return { state: null, cityKey: "" };
  const parts = hometown.split(",").map((p) => p.trim());
  const state = parts.length >= 2 ? parts[parts.length - 1].toUpperCase().replace(/\s+/g, "") : null;
  const city = parts.length >= 2 ? parts.slice(0, -1).join(", ") : hometown;
  const cityKey = city.toLowerCase().replace(/\s+/g, " ").trim();
  return { state, cityKey };
}

function getMajorMinorDisplay(member) {
  let major = member.major || "—";
  let minor = member.minor || "";
  let minorLabel = "Minor";
  if (!member.minor && member.major) {
    const lower = member.major.toLowerCase();
    if (lower.includes("with a focus in ")) {
      const idx = lower.indexOf("with a focus in ");
      major = member.major.substring(0, idx).trim();
      minor = member.major.substring(idx + "with a focus in ".length).trim();
      minorLabel = "Focus";
    } else if (lower.includes("with a focus on ")) {
      const idx = lower.indexOf("with a focus on ");
      major = member.major.substring(0, idx).trim();
      minor = member.major.substring(idx + "with a focus on ".length).trim();
      minorLabel = "Focus";
    }
  }
  return { major, minor, minorLabel };
}

const LINKEDIN_LOGO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 24" width="100" height="24" aria-hidden="true"><text x="0" y="18" font-family="-apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif" font-size="18" fill="currentColor"><tspan font-weight="400">Linked</tspan><tspan font-weight="700">In</tspan></text></svg>';

function getCityPosition(state, cityKey) {
  const overrides = getPositionOverrides();
  if (overrides[state] && (overrides[state][cityKey] != null || overrides[state][cityKey.replace(/'/g, "")] != null)) {
    const pos = overrides[state][cityKey] ?? overrides[state][cityKey.replace(/'/g, "")];
    if (Array.isArray(pos)) return pos;
  }
  const stateData = CITY_POSITION[state];
  if (!stateData) return [50, 50];
  const pos = stateData[cityKey] || stateData[cityKey.replace(/'/g, "")] || stateData.default;
  return pos || [50, 50];
}

const lineageData = {
  "Spring 2025": {
    lineName: "The 10 Conditions of the New Age aka Project X",
    members: [
      { position: "1/Ace", fullName: "Keshun Nelson", lineName: "Prime Proton", photo: "", major: "Chemistry with a focus in Pre-Med", minor: "", hometown: "Milwaukee, WI", linkedIn: "" },
      { position: "2/Deuce", fullName: "Jahkari Taylor", lineName: "V.I.Pharoah", photo: "", major: "Political Science", minor: "", hometown: "Chesapeake, VA", linkedIn: "" },
      { position: "3/Tre", fullName: "Allan White", lineName: "Nocturnal Beast", photo: "", major: "Sociology", minor: "", hometown: "Mount Vernon, NY", linkedIn: "" },
      { position: "4/H4ardcore", fullName: "Jerome Sutton III", lineName: "Steady Heart", photo: "assets/portraits/jerome-sutton-iii.png", major: "Sociology", minor: "Criminal Justice", hometown: "Chesapeake, VA", linkedIn: "" },
      { position: "5/Live 5ive", fullName: "Jahkael Parker", lineName: "The Illusion", photo: "", major: "Business Management", minor: "", hometown: "Richmond, VA", linkedIn: "" },
      { position: "6/Slick 6ix", fullName: "Jaylen Johnson", lineName: "Perfect Peace", photo: "assets/portraits/jaylen-johnson.png", major: "Exercise Science with a focus in Kinesiotherapy", minor: "", hometown: "Fort Washington, MD", linkedIn: "" },
      { position: "7/Jewel", fullName: "Zachary Roberts II", lineName: "MuPhasa", photo: "", major: "Management Information Systems", minor: "", hometown: "Carson, CA", linkedIn: "" },
      { position: "8/8ight Ball", fullName: "Khamani Battiste", lineName: "Caesar", photo: "", major: "Construction Management", minor: "", hometown: "Chicago, IL", linkedIn: "" },
      { position: "9/Notorious 9ine", fullName: "Adam Palmer", lineName: "Lazarus", photo: "", major: "Accounting", minor: "", hometown: "Halifax County, VA", linkedIn: "" },
      { position: "10/Dime - Tail", fullName: "Xavier Spindle", lineName: "The Epilogue", photo: "", major: "Business Entrepreneurship", minor: "", hometown: "Richmond, VA", linkedIn: "" },
    ],
  },
  "Spring 2023": {
    lineName: "New World Order aka Always Follow Suit",
    noHeadshots: true,
    members: [
      { position: "1/Ace", fullName: "Aaron Fisher Jr", lineName: "Lord Frieza", photo: "", major: "Business Finance", minor: "", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/aaron-fisher-jr-15a2a0248" },
      { position: "2/Deuce", fullName: "Lauryce Derose", lineName: "Critical Condition", photo: "", major: "Sociology", minor: "Criminal Justice", hometown: "Chicago, IL", linkedIn: "https://www.linkedin.com/in/lauryce-derose-66424027b" },
      { position: "3/Tre", fullName: "Taavon Mitchell Jr", lineName: "Pharoahgamo", photo: "", major: "Computer Science with a focus in Cybersecurity", minor: "", hometown: "Baltimore, MD", linkedIn: "https://www.linkedin.com/in/taavon-mitchell-jr-85ba23243" },
      { position: "4/H4ardcore", fullName: "Alexander Soler", lineName: "Phlash", photo: "", major: "Social Work", minor: "", hometown: "Paterson, NJ", linkedIn: "https://www.linkedin.com/in/alexander-soler3" },
      { position: "5/Live 5ive", fullName: "Christopher Martin", lineName: "Kakarot", photo: "", major: "Exercise Science", minor: "", hometown: "Manassas, VA", linkedIn: "https://www.linkedin.com/in/chris-martin-a63640259" },
      { position: "6/Slick 6ix", fullName: "Marquice Brown-Thomas", lineName: "Son of Anarchy", photo: "", major: "Interdisciplinary Studies", minor: "", hometown: "Washington, DC", linkedIn: "https://www.linkedin.com/in/maurquice-brown-thomas-051844244" },
      { position: "7/Jewel", fullName: "Madijan Kabba", lineName: "Blood Diamond", photo: "", major: "Biology", minor: "", hometown: "Boston, MA", linkedIn: "https://www.linkedin.com/in/madijan-kabba-25a099332" },
      { position: "8/8Ball", fullName: "Braxton Bates", lineName: "Kamikaze", photo: "", major: "Computer Science with a focus in Cybersecurity", minor: "", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/braxton-bates777" },
      { position: "9/Notorious 9ine", fullName: "Jordan D Moody", lineName: "Gorilla Grodd", photo: "", major: "History Education", minor: "", hometown: "Newport News, VA", linkedIn: "https://www.linkedin.com/in/jdmoody02" },
      { position: "10/Dime", fullName: "Nicolas Halorday", lineName: "Kratos", photo: "", major: "Sociology", minor: "", hometown: "Dallas, TX", linkedIn: "https://www.linkedin.com/in/nicoloas-halorday-0b5590186" },
      { position: "11/Fly E11even", fullName: "Joseph Kemp III", lineName: "Phina11y Phamous", photo: "", major: "Exercise Science", minor: "", hometown: "Petersburg, VA", linkedIn: "" },
      { position: "12/Dozen", fullName: "Carson Small", lineName: "Michael Myers", photo: "", major: "Information Technology", minor: "", hometown: "Brooklyn, NY", linkedIn: "https://www.linkedin.com/in/carson-small-9543661b5" },
      { position: "13/Tail", fullName: "Jacquez Motley", lineName: "Phinal SacrifICE", photo: "", major: "Psychology", minor: "", hometown: "Danville, VA", linkedIn: "https://www.linkedin.com/in/jacquez-motley-1b899b259" },
    ],
  },
  "Spring 2022": {
    lineName: "The 7 Revolutionaries of War",
    noHeadshots: true,
    members: [
      { position: "1/Ace", fullName: "McKinley Lowery III", lineName: "Basquiat", photo: "", major: "Business", minor: "", hometown: "Detroit, MI", linkedIn: "https://www.linkedin.com/in/mckinleyloweryiii" },
      { position: "2/Deuce", fullName: "Malik Cunningham", lineName: "Winter Soldier", photo: "", major: "Information Technology", minor: "", hometown: "Baltimore, MD", linkedIn: "https://www.linkedin.com/in/malik-cunningham-b4792b228" },
      { position: "3/Tre", fullName: "Tyreese Davis", lineName: "Koman", photo: "", major: "Early Childhood<br>Development", minor: "", hometown: "Chester, SC", linkedIn: "" },
      { position: "4/H4ardcore", fullName: "Christian Palmer", lineName: "Split", photo: "", major: "Mass Communications", minor: "", hometown: "Halifax, VA", linkedIn: "" },
      { position: "5/5ive", fullName: "Brian Peede Jr", lineName: "Rocky Balboa", photo: "", major: "Music Education", minor: "", hometown: "Hampton, VA", linkedIn: "https://www.linkedin.com/in/mr-brian-peede-585bab231" },
      { position: "6/6ix", fullName: "Shy'Keem Hussey", lineName: "Static Shock", photo: "", major: "Sociology", minor: "Criminal Justice", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/shykeem-hussey-21a296232" },
      { position: "7/Jewel - Tail", fullName: "Christopher Price Jr", lineName: "Thanos", photo: "", major: "Business Marketing", minor: "", hometown: "Chicago, IL", linkedIn: "https://www.linkedin.com/in/christopher-price-jr-6a41ba314" },
    ],
  },
  "Spring 2024": {
    lineName: "12 Degrees Below Zero aka Sons of the New World aka Skii Club",
    noHeadshots: true,
    members: [
      { position: "1/Ace", fullName: "Jahmire Westbrook", lineName: "Vantage Po1nt", photo: "", major: "Accounting", minor: "", hometown: "Neptune, NJ", linkedIn: "https://www.linkedin.com/in/jahmire-westbrook" },
      { position: "2/Deuce", fullName: "Narenzo Fleors", lineName: "unPhased Marksman", photo: "", major: "Political Science", minor: "Business Finance", hometown: "Detroit, MI", linkedIn: "https://www.linkedin.com/in/narenzofleors" },
      { position: "3/Tre", fullName: "Malcolm Warren", lineName: "Golden Glove", photo: "", major: "Computer Science", minor: "", hometown: "Richmond, VA", linkedIn: "https://www.linkedin.com/in/malcwarren404" },
      { position: "4/H4ardcore", fullName: "Jamari Jones", lineName: "Frozone\" aka \"Virgil", photo: "", major: "Business Entrepreneurship", minor: "", hometown: "Richmond, VA", linkedIn: "https://www.linkedin.com/in/jamari-jones-4a2991288" },
      { position: "5/Live 5ive", fullName: "Jaden Johnson", lineName: "Psychotic\" aka \"Knucklehead", photo: "", major: "Computer Science and Mathematics", minor: "", hometown: "Richmond, VA", linkedIn: "https://www.linkedin.com/in/jaden-johnson-nsu" },
      { position: "6/Slick 6ix", fullName: "Tre Greaux", lineName: "Venom", photo: "", major: "Political Science", minor: "", hometown: "Atlanta, GA", linkedIn: "https://www.linkedin.com/in/tre-greaux-90a1a9277" },
      { position: "7/Jewel", fullName: "Jordan Cain", lineName: "Prince of Peace", photo: "", major: "Psychology", minor: "", hometown: "Woodbridge, VA", linkedIn: "https://www.linkedin.com/in/jordan-cain-615b762a8" },
      { position: "8/8Ball", fullName: "Ellis Robertson", lineName: "Phoenix", photo: "", major: "Mass Communications", minor: "", hometown: "Detroit, MI", linkedIn: "https://www.linkedin.com/in/ellis-robertson-b2b855256" },
      { position: "9/Notorious 9ine", fullName: "Kaion Hamilton III", lineName: "John Wick", photo: "", major: "Business Marketing", minor: "", hometown: "Prince George, VA", linkedIn: "https://www.linkedin.com/in/kaion-hamilton-b677b6308" },
      { position: "10/Dime", fullName: "Darien Britt", lineName: "H1gh N0te", photo: "", major: "Music Education with a focus in Voice", minor: "", hometown: "Portsmouth, VA", linkedIn: "https://www.linkedin.com/in/darien-britt-a43289203" },
      { position: "11/Fly E11even", fullName: "Chase Greene", lineName: "JUGGANAUT", photo: "", major: "Business Management", minor: "", hometown: "Spotsylvania, VA", linkedIn: "https://www.linkedin.com/in/chase-greene-831920270" },
      { position: "12/Dozen - Tail", fullName: "Elijah Smith", lineName: "Goliath", photo: "", major: "Business Marketing", minor: "", hometown: "Richmond, VA", linkedIn: "https://www.linkedin.com/in/ets1" },
    ],
  },
  "Spring 2026": {
    lineName: "The 11 Virtues of P.E.A.C.E. aka DedicationBoyz aka 26 Jumpstreet",
    linePictures: [
      "assets/line-photos/spring-2026-1.png",
      "assets/line-photos/spring-2026-2.png",
      "assets/line-photos/spring-2026-3.png",
      "assets/line-photos/spring-2026-4.png",
    ],
    members: [
      { position: "1/Ace", fullName: "Adarius Johnson", lineName: "K1ll Switch", photo: "assets/portraits/adarius-johnson.png", major: "Exercise Science with a focus in Kinesiotherapy", minor: "", hometown: "Portsmouth, VA", linkedIn: "https://www.linkedin.com/in/adarius-johnson-456868383" },
      { position: "2/Deuce", fullName: "Justin Claiborne", lineName: "Flu Game", photo: "assets/portraits/justin-claiborne.png", major: "Computer Science with a focus in Cybersecurity", minor: "", hometown: "Hampton, VA", linkedIn: "https://www.linkedin.com/in/justin-claiborne" },
      { position: "3/Tre", fullName: "Brandon Richardson", lineName: "Tariq St. Patrick", photo: "assets/portraits/brandon-richardson.png", major: "Business Management", minor: "Psychology", hometown: "Chester, VA", linkedIn: "" },
      { position: "4/H4ardcore", fullName: "Dylan Bryant", lineName: "Spike Lee", photo: "assets/portraits/dylan-bryant.png", major: "Graphic Design with a focus in Fine Arts", minor: "", hometown: "Prince George's County, MD", linkedIn: "" },
      { position: "5/Live 5ive", fullName: "Ian Thomas", lineName: "Ares", photo: "assets/portraits/ian-thomas.png", major: "Interdisciplinary Studies with a focus in Criminal Justice and Business Marketing", minor: "", hometown: "Fredricksburg, VA", linkedIn: "https://www.linkedin.com/in/ian-thomas-09186b330" },
      { position: "6/Slick 6ix", fullName: "Simeon Butler", lineName: "Pain Killer", photo: "assets/portraits/simeon-butler.png", major: "Mass Communications", minor: "Business", hometown: "Huntsville, AL", linkedIn: "" },
      { position: "7/Jewel", fullName: "Kyree Williams", lineName: "Eagle Eye", photo: "assets/portraits/kyree-williams.png", major: "Psychology", minor: "Business", hometown: "Philadelphia, PA", linkedIn: "https://www.linkedin.com/in/kyree-williams-390870383/" },
      { position: "8/8Ball", fullName: "Jaleel Drummond", lineName: "Creed", photo: "assets/portraits/jaleel-drummond.png", major: "Social Work", minor: "", hometown: "Philadelphia, PA", linkedIn: "" },
      { position: "9/Notorios 9ine", fullName: "Nyles Ferguson", lineName: "Mister Terrific", photo: "assets/portraits/nyles-ferguson.png", major: "Political Science", minor: "", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/nyles-ferguson-45b254321/" },
      { position: "10/Dime", fullName: "Brett Andrews Jr", lineName: "Man of Steel", photo: "assets/portraits/brett-andrews-jr.png", major: "Double Major in Computer Engineering Technology and Electronics Engineering Technology", minor: "", hometown: "Atlanta, GA", linkedIn: "https://www.linkedin.com/in/brett-andrews-norfolk-state" },
      { position: "11/Fly E11even - Tail", fullName: "Joseph Hargett", lineName: "Hail Mary", photo: "assets/portraits/joseph-hargett.png", major: "Business Marketing", minor: "", hometown: "Williamston, NC", linkedIn: "https://www.linkedin.com/in/joseph-hargett/" },
    ],
  },
};

function getInitials(name) {
  return name
    .replace(/[.,]/g, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function getPhotoMarkup(name, photo, altLabel, crop, size) {
  const s = size ?? 44;
  const c = crop || getCropValue(name);
  const x = typeof c === "object" ? c.x : 50;
  const y = typeof c === "object" ? c.y : c;
  if (photo) {
    return `<img class="person-photo" src="${photo}" alt="${altLabel}" width="${s}" height="${s}" loading="lazy" decoding="async" style="object-position: ${x}% ${y}%;" />`;
  }
  return `<div class="person-photo" aria-hidden="true">${getInitials(name)}</div>`;
}

function getOfficerPhotoMarkup(name, photo, altLabel) {
  if (photo) {
    return `<img class="officer-photo-img" src="${photo}" alt="${altLabel}" width="300" height="400" loading="lazy" decoding="async" />`;
  }
  return `<div class="officer-photo-placeholder" aria-hidden="true">${getInitials(name)}</div>`;
}

function renderOfficers() {
  const markup = officersData
    .map(
      (officer) => `
        <article class="officer-card">
          <div class="officer-photo-wrap">
            ${getOfficerPhotoMarkup(officer.name, officer.photo, `${officer.name} headshot`)}
          </div>
          <div class="officer-info">
            <p class="officer-role">${officer.role}</p>
            <h3 class="officer-name">${officer.name}</h3>
          </div>
        </article>
      `,
    )
    .join("");

  officerContainer.innerHTML = markup;
}

const LINEAGE_EXCLUDED = new Set(["Spring 2012", "Spring 2020"]);

function buildLineageTerms() {
  const terms = [];
  for (let year = 2026; year >= 2007; year -= 1) {
    if (year === 2007) {
      terms.push({ season: "Fall", year });
      break;
    }
    const springKey = `Spring ${year}`;
    if (!LINEAGE_EXCLUDED.has(springKey)) terms.push({ season: "Spring", year });
  }
  return terms;
}

function buildLineageItem(termKey, details) {
  const item = document.createElement("article");
  item.className = "lineage-item";

  if (details) {
    const noPhotos = !!details.noHeadshots;
    const memberClass = noPhotos ? "lineage-member lineage-member-no-photo" : "lineage-member";
    const roster = details.members
      .map((member, idx) => {
        const [num, positionName] = member.position.includes("/") ? member.position.split("/", 2) : [member.position, ""];
        const photoHtml = noPhotos ? "" : getPhotoMarkup(member.fullName, member.photo, `${member.fullName} headshot`, null, 100);

        let bodyHtml;
        let statePath = null;
        if (noPhotos) {
          const { state, cityKey } = parseHometown(member.hometown);
          statePath = state && STATE_OUTLINE_PATH[state] ? STATE_OUTLINE_PATH[state] : null;
          const [hx, hy] = statePath ? getCityPosition(state, cityKey) : [50, 50];
          const editPosBtn = "";
          const stateMapHtml = statePath
            ? `<div class="lineage-member-state-wrap" data-state="${state}" data-city-key="${cityKey || ""}">
                 <div class="lineage-member-state-map">
                   <img class="lineage-member-state" src="${statePath}" alt="" role="presentation" />
                   <img class="lineage-member-phi" src="${HAND_SIGN_PATH}" alt="" style="left:${hx}%;top:${hy}%;transform:translate(-50%,-50%);" role="presentation" />
                 </div>
                 ${editPosBtn}
               </div>`
            : "";
          const { major, minor, minorLabel } = getMajorMinorDisplay(member);
          const linkedInHtml = member.linkedIn
            ? `<a href="${member.linkedIn}" class="lineage-member-linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile">${LINKEDIN_LOGO_SVG}</a>`
            : `<span class="lineage-member-linkedin lineage-member-linkedin-placeholder" aria-hidden="true">${LINKEDIN_LOGO_SVG}</span>`;
          bodyHtml = `
              <div class="lineage-member-col lineage-member-col-identity">
                <span class="lineage-position-num">#${num}</span>
                <span class="lineage-position-name">${positionName}</span>
                <span class="lineage-full-name">${member.fullName}</span>
                <span class="lineage-line-name">"${member.lineName}"</span>
              </div>
              <div class="lineage-member-col lineage-member-col-details">
                <dl class="lineage-member-details">
                  <dt>Major</dt><dd>${major}</dd>
                  ${minor ? `<dt>${minorLabel}</dt><dd>${minor}</dd>` : ""}
                  <dt>Hometown</dt><dd>${member.hometown || "—"}</dd>
                </dl>
              </div>
              <div class="lineage-member-col lineage-member-col-state">${stateMapHtml || ""}</div>
              <div class="lineage-member-col lineage-member-col-blank">${linkedInHtml}</div>`;
        } else {
          bodyHtml = `
              <div class="lineage-member-meta">
                <span class="lineage-position-num">#${num}</span>
                <span class="lineage-position-name">${positionName}</span>
                <span class="lineage-full-name">${member.fullName}</span>
                <span class="lineage-line-name">"${member.lineName}"</span>
              </div>`;
        }

        const roleAttrs = noPhotos ? "" : ' tabindex="0" role="button"';
        const noStateClass = noPhotos && !statePath ? " lineage-member-no-state" : "";
        const fullNameAttr = noPhotos ? ` data-full-name="${member.fullName.replace(/"/g, "&quot;")}"` : "";
        return `
            <li class="${memberClass}${noStateClass}" data-term="${termKey}" data-member-index="${idx}"${fullNameAttr}${roleAttrs}>
              ${photoHtml}
              ${bodyHtml}
            </li>
          `;
      })
      .join("");

    let linePicsHtml = "";
    if (details.linePictures && details.linePictures.length) {
      linePicsHtml = `
      <div class="lineage-line-pictures">
        <h4>Line Pictures</h4>
        <div class="lineage-line-pictures-track">
          ${details.linePictures.map((src, i) => `<img src="${src}" alt="${termKey} line photo ${i + 1}" width="600" height="400" loading="lazy" decoding="async" class="lineage-line-pic" data-lightbox-src="${src}" tabindex="0" role="button" />`).join("")}
        </div>
      </div>`;
    }
    item.innerHTML = `
      <h3>${termKey}</h3>
      <p>${details.lineName}</p>
      ${linePicsHtml}
      <ul class="lineage-roster">${roster}</ul>
    `;
  } else {
    item.innerHTML = `
      <h3>${termKey}</h3>
      <p>TBD</p>
    `;
  }

  return item;
}

let currentLineageTerm = "Spring 2026";

function populateLineageMenu() {
  const terms = buildLineageTerms();
  const track = document.getElementById("lineage-term-track");
  track.innerHTML = terms
    .map((t) => {
      const termKey = `${t.season} ${t.year}`;
      return `<button type="button" class="lineage-term-btn" role="tab" data-term="${termKey}" aria-selected="false">${termKey}</button>`;
    })
    .join("");
}

function setActiveLineageTerm(termKey) {
  currentLineageTerm = termKey;
  document.querySelectorAll(".lineage-term-btn").forEach((btn) => {
    btn.setAttribute("aria-selected", btn.dataset.term === termKey ? "true" : "false");
  });
}

function showLineageTerm(termKey) {
  const details = lineageData[termKey];
  lineageContainer.replaceChildren(buildLineageItem(termKey, details));
  setActiveLineageTerm(termKey);
}

function renderLineage() {
  const terms = buildLineageTerms();
  populateLineageMenu();

  const initialTerm = terms[0] ? `${terms[0].season} ${terms[0].year}` : "Spring 2026";
  showLineageTerm(initialTerm);

  document.getElementById("lineage-term-track").addEventListener("click", (e) => {
    const btn = e.target.closest(".lineage-term-btn");
    if (btn) showLineageTerm(btn.dataset.term);
  });

  lineageContainer.addEventListener("click", (e) => {
    const img = e.target.closest(".lineage-line-pic");
    if (img && img.dataset.lightboxSrc) openLinePicLightbox(img.dataset.lightboxSrc, img.alt);
  });

  lineageContainer.addEventListener("keydown", (e) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const img = e.target.closest(".lineage-line-pic");
    if (img && img.dataset.lightboxSrc) {
      e.preventDefault();
      openLinePicLightbox(img.dataset.lightboxSrc, img.alt);
    }
  });
}

function openLinePicLightbox(src, alt) {
  const lightbox = document.getElementById("line-pic-lightbox");
  const lightboxImg = lightbox.querySelector(".line-pic-lightbox-img");
  lightboxImg.src = src;
  lightboxImg.alt = alt || "Enlarged line photo";
  lightbox.showModal();
}

function closeLinePicLightbox() {
  document.getElementById("line-pic-lightbox").close();
}

document.getElementById("line-pic-lightbox")?.addEventListener("click", (e) => {
  if (e.target.id === "line-pic-lightbox") closeLinePicLightbox();
});
document.querySelector(".line-pic-lightbox-close")?.addEventListener("click", closeLinePicLightbox);
document.getElementById("line-pic-lightbox")?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLinePicLightbox();
});

renderOfficers();
renderLineage();

// Rap sheet modal
function openRapSheet(termKey, memberIndex) {
  const details = lineageData[termKey];
  if (!details || !details.members[memberIndex]) return;
  const member = details.members[memberIndex];
  const [num, moniker] = member.position.includes("/") ? member.position.split("/", 2) : [member.position, ""];

  const modal = document.getElementById("rap-sheet-modal");
  modal.querySelector(".rap-sheet-position-num").textContent = `#${num}`;
  modal.querySelector(".rap-sheet-moniker").textContent = moniker;
  modal.querySelector(".rap-sheet-name").textContent = member.fullName;
  modal.querySelector(".rap-sheet-line-name").textContent = `"${member.lineName}"`;

  let displayMajor = member.major || "—";
  let displayMinor = member.minor || "—";
  const minorLabel = modal.querySelector(".rap-sheet-minor-label");
  if (!member.minor && member.major) {
    const lower = member.major.toLowerCase();
    if (lower.includes("with a focus in ")) {
      const idx = lower.indexOf("with a focus in ");
      displayMajor = member.major.substring(0, idx).trim();
      displayMinor = member.major.substring(idx + "with a focus in ".length).trim();
      minorLabel.textContent = "Focus";
    } else if (lower.includes("with a focus on ")) {
      const idx = lower.indexOf("with a focus on ");
      displayMajor = member.major.substring(0, idx).trim();
      displayMinor = member.major.substring(idx + "with a focus on ".length).trim();
      minorLabel.textContent = "Focus";
    } else {
      minorLabel.textContent = "Minor";
    }
  } else {
    minorLabel.textContent = "Minor";
  }
  modal.querySelector(".rap-sheet-major").textContent = displayMajor;
  modal.querySelector(".rap-sheet-minor").textContent = displayMinor;
  modal.querySelector(".rap-sheet-hometown").textContent = member.hometown || "—";
  const linkedInEl = modal.querySelector(".rap-sheet-linkedin");
  if (member.linkedIn) {
    linkedInEl.innerHTML = `<a href="${member.linkedIn}" target="_blank" rel="noopener noreferrer">View Profile</a>`;
  } else {
    linkedInEl.textContent = "—";
  }
  const photoWrap = modal.querySelector(".rap-sheet-photo-wrap");
  const crop = getCropValue(member.fullName);
  photoWrap.innerHTML = member.photo
    ? `<img src="${member.photo}" alt="${member.fullName} headshot" class="rap-sheet-photo" width="120" height="120" loading="eager" decoding="async" style="object-position: ${crop.x}% ${crop.y}%;" />`
    : `<div class="rap-sheet-photo rap-sheet-photo-placeholder">${getInitials(member.fullName)}</div>`;
  photoWrap.dataset.cropMember = member.fullName;

  const { state, cityKey } = parseHometown(member.hometown);
  const mapWrap = modal.querySelector(".rap-sheet-map-wrap");
  const stateContainer = modal.querySelector(".rap-sheet-state-container");
  const stateImg = modal.querySelector(".rap-sheet-state");
  const handSign = modal.querySelector(".rap-sheet-hand-sign");
  if (state && STATE_OUTLINE_PATH[state]) {
    mapWrap.hidden = false;
    stateContainer.dataset.state = state;
    stateContainer.dataset.cityKey = cityKey;
    stateImg.src = STATE_OUTLINE_PATH[state];
    stateImg.alt = "";
    const [x, y] = getCityPosition(state, cityKey);
    handSign.style.left = `${x}%`;
    handSign.style.top = `${y}%`;
    handSign.style.transform = "translate(-50%, -50%)";
    handSign.src = HAND_SIGN_PATH;
    const editPosBtn = modal.querySelector(".rap-sheet-edit-pos");
    const posDisplay = modal.querySelector(".rap-sheet-pos-display");
    const disableEditPos = termKey === "Spring 2022" || termKey === "Spring 2025" || termKey === "Spring 2026";
    if (editPosBtn) {
      editPosBtn.hidden = disableEditPos;
      editPosBtn.setAttribute("aria-pressed", "false");
    }
    stateContainer.classList.remove("rap-sheet-edit-mode");
    if (posDisplay) {
      posDisplay.textContent = `${member.hometown} → ${x}, ${y}`;
    }
  } else {
    mapWrap.hidden = true;
  }

  const editCropBtn = modal.querySelector(".rap-sheet-edit-crop");
  const cropSliderWrap = modal.querySelector(".rap-sheet-crop-slider-wrap");
  const cropSliderX = modal.querySelector("#rap-sheet-crop-slider-x");
  const cropSliderY = modal.querySelector("#rap-sheet-crop-slider-y");
  const cropEditor = modal.querySelector(".rap-sheet-crop-editor");
  cropEditor.hidden = !member.photo;
  editCropBtn.setAttribute("aria-pressed", "false");
  cropSliderWrap.hidden = true;
  cropSliderX.value = crop.x;
  cropSliderY.value = crop.y;

  modal.showModal();
}

function closeRapSheet() {
  document.getElementById("rap-sheet-modal").close();
}

document.getElementById("rap-sheet-modal").querySelector(".rap-sheet-close").addEventListener("click", closeRapSheet);
document.getElementById("rap-sheet-modal").addEventListener("click", (e) => {
  if (e.target.id === "rap-sheet-modal") closeRapSheet();
});
document.getElementById("rap-sheet-modal").addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeRapSheet();
});

const stateContainer = document.querySelector(".rap-sheet-state-container");
const editPosBtn = document.querySelector(".rap-sheet-edit-pos");
const posDisplay = document.querySelector(".rap-sheet-pos-display");
const copyPosBtn = document.querySelector(".rap-sheet-copy-pos");

editPosBtn.addEventListener("click", () => {
  const pressed = editPosBtn.getAttribute("aria-pressed") === "true";
  const next = !pressed;
  editPosBtn.setAttribute("aria-pressed", String(next));
  stateContainer.classList.toggle("rap-sheet-edit-mode", next);
  if (next) posDisplay.textContent = "Click on the map where the phi should go.";
});

stateContainer.addEventListener("click", (e) => {
  if (editPosBtn.getAttribute("aria-pressed") !== "true") return;
  e.stopPropagation();
  const rect = stateContainer.getBoundingClientRect();
  const x = ((e.clientX - rect.left) / rect.width) * 100;
  const y = ((e.clientY - rect.top) / rect.height) * 100;
  const state = stateContainer.dataset.state;
  const cityKey = stateContainer.dataset.cityKey || "default";
  if (!state) return;
  setPositionOverride(state, cityKey, x, y);
  const phi = stateContainer.querySelector(".rap-sheet-hand-sign");
  phi.style.left = `${Math.round(x)}%`;
  phi.style.top = `${Math.round(y)}%`;
  posDisplay.textContent = `${state} / ${cityKey} → ${Math.round(x)}, ${Math.round(y)} (position saved)`;
  editPosBtn.setAttribute("aria-pressed", "false");
  stateContainer.classList.remove("rap-sheet-edit-mode");
});

copyPosBtn.addEventListener("click", () => {
  const overrides = getPositionOverrides();
  const merged = {};
  for (const st of Object.keys(CITY_POSITION)) {
    merged[st] = { ...CITY_POSITION[st] };
  }
  for (const st of Object.keys(overrides)) {
    if (!merged[st]) merged[st] = { default: [50, 50] };
    for (const city of Object.keys(overrides[st])) {
      merged[st][city] = overrides[st][city];
    }
  }
  const json = JSON.stringify(merged, null, 2);
  const code = `const CITY_POSITION = ${json};`;
  navigator.clipboard.writeText(code).then(
    () => { posDisplay.textContent = "CITY_POSITION copied to clipboard. Paste into script.js."; },
    () => { posDisplay.textContent = "Copy failed. Use browser console."; }
  );
});

const editCropBtn = document.querySelector(".rap-sheet-edit-crop");
const cropSliderWrap = document.querySelector(".rap-sheet-crop-slider-wrap");
const cropSliderX = document.querySelector("#rap-sheet-crop-slider-x");
const cropSliderY = document.querySelector("#rap-sheet-crop-slider-y");
const copyCropBtn = document.querySelector(".rap-sheet-copy-crop");
const photoWrapEl = document.querySelector(".rap-sheet-photo-wrap");

function applyCropFromSliders() {
  if (!cropSliderX || !cropSliderY) return;
  const x = parseInt(cropSliderX.value, 10);
  const y = parseInt(cropSliderY.value, 10);
  const member = photoWrapEl.dataset.cropMember;
  if (!member) return;
  setCropOverride(member, x, y);
  const img = photoWrapEl.querySelector("img.rap-sheet-photo");
  if (img) img.style.setProperty("object-position", `${x}% ${y}%`);
  showLineageTerm(currentLineageTerm);
}

editCropBtn.addEventListener("click", () => {
  const pressed = editCropBtn.getAttribute("aria-pressed") === "true";
  const next = !pressed;
  editCropBtn.setAttribute("aria-pressed", String(next));
  cropSliderWrap.hidden = !next;
});

if (cropSliderX) cropSliderX.addEventListener("input", applyCropFromSliders);
if (cropSliderY) cropSliderY.addEventListener("input", applyCropFromSliders);

copyCropBtn.addEventListener("click", () => {
  const overrides = getCropOverrides();
  const entries = Object.entries(overrides)
    .map(([name, v]) => {
      const x = typeof v === "object" && v.x != null ? v.x : 50;
      const y = typeof v === "object" && v.y != null ? v.y : (typeof v === "number" ? v : 35);
      return `  { fullName: "${name}", cropX: ${x}, cropY: ${y} }`;
    })
    .join(",\n");
  const code = `// Add cropX and cropY to each member in lineageData.\n[${entries}]`;
  navigator.clipboard.writeText(code);
});

document.getElementById("lineage-list").addEventListener("click", (e) => {
  const editBtn = e.target.closest(".lineage-member-edit-pos");
  if (editBtn) {
    const wrap = editBtn.closest(".lineage-member-state-wrap");
    if (wrap) {
      e.stopPropagation();
      const pressed = editBtn.getAttribute("aria-pressed") === "true";
      const next = !pressed;
      editBtn.setAttribute("aria-pressed", String(next));
      wrap.classList.toggle("lineage-member-state-edit-mode", next);
    }
    return;
  }
  const stateWrap = e.target.closest(".lineage-member-state-wrap");
  if (stateWrap && stateWrap.classList.contains("lineage-member-state-edit-mode")) {
    const editPosBtn = stateWrap.querySelector(".lineage-member-edit-pos");
    const stateMap = stateWrap.querySelector(".lineage-member-state-map");
    if (editPosBtn && stateMap && e.target !== editPosBtn && !editPosBtn.contains(e.target)) {
      e.preventDefault();
      e.stopPropagation();
      const rect = stateMap.getBoundingClientRect();
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      const state = stateWrap.dataset.state;
      const cityKey = stateWrap.dataset.cityKey || "default";
      if (state) {
        setPositionOverride(state, cityKey, x, y);
        const phi = stateWrap.querySelector(".lineage-member-phi");
        if (phi) {
          phi.style.left = `${x}%`;
          phi.style.top = `${y}%`;
        }
        editPosBtn.setAttribute("aria-pressed", "false");
        stateWrap.classList.remove("lineage-member-state-edit-mode");
      }
    }
    return;
  }
  const member = e.target.closest(".lineage-member");
  if (!member) return;
  if (member.classList.contains("lineage-member-no-photo")) return;
  const termKey = member.dataset.term;
  const idx = parseInt(member.dataset.memberIndex, 10);
  if (termKey != null && !isNaN(idx)) openRapSheet(termKey, idx);
});
document.getElementById("lineage-list").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  const member = e.target.closest(".lineage-member");
  if (!member) return;
  if (member.classList.contains("lineage-member-no-photo")) return;
  e.preventDefault();
  const termKey = member.dataset.term;
  const idx = parseInt(member.dataset.memberIndex, 10);
  if (termKey != null && !isNaN(idx)) openRapSheet(termKey, idx);
});

// Tab switching: show only the active panel
const tabLinks = document.querySelectorAll('.main-nav [role="tab"]');
const panels = document.querySelectorAll('[data-tab-panel]');

function showTab(tabId) {
  tabLinks.forEach((link) => {
    const isActive = link.dataset.tab === tabId;
    link.setAttribute('aria-selected', isActive);
  });
  panels.forEach((panel) => {
    const isTarget = panel.dataset.tabPanel === tabId;
    panel.setAttribute('aria-hidden', !isTarget);
    panel.classList.toggle('active', isTarget);
  });
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    showTab(link.dataset.tab);
  });
});

showTab('home');
