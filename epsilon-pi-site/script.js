const officerContainer = document.getElementById("officer-list");
const lineageContainer = document.getElementById("lineage-list");
const eventsCalendarGrid = document.getElementById("events-calendar-grid");
const eventsCalendarMonth = document.getElementById("events-calendar-month");
const eventsCalendarDetail = document.getElementById("events-calendar-detail");

// Officers: leave `email` blank to auto-derive firstname.middleinitial.lastname@spartans.nsu.edu
// Set `email: null` to skip (e.g. faculty advisor). Set `email: "custom@..."` to override.
// `linkedIn` is optional — leave blank to hide the LinkedIn icon.
const officersData = [
  { role: "Chapter President", name: "Jahkari N. Taylor", photo: "", email: "", linkedIn: "" },
  { role: "1st Vice President", name: "Nyles Ferguson", photo: "assets/portraits/nyles-ferguson.png", email: "", linkedIn: "" },
  { role: "2nd Vice President", name: "Khamani Battiste", photo: "assets/portraits/khamani-battiste.png", email: "", linkedIn: "" },
  { role: "Recording Secretary", name: "Allan J. White", photo: "", email: "", linkedIn: "" },
  { role: "Corresponding Secretary", name: "Ian Thomas", photo: "assets/portraits/ian-thomas.png", email: "", linkedIn: "" },
  { role: "Treasurer", name: "Joseph Hargett", photo: "assets/portraits/joseph-hargett.png", email: "", linkedIn: "" },
  { role: "Chapter Dean of Membership", name: "Jahkael Parker", photo: "", email: "", linkedIn: "" },
  { role: "Sergeant-At-Arms", name: "Adarius Johnson", photo: "assets/portraits/adarius-johnson.png", email: "", linkedIn: "" },
  { role: "Editor of the Sphinx", name: "Simeon Butler", photo: "assets/portraits/simeon-butler.png", email: "", linkedIn: "" },
  { role: "Historian", name: "Brett Andrews, Jr", photo: "assets/portraits/brett-andrews-jr.png", email: "", linkedIn: "" },
  { role: "Parliamentarian", name: "Jaleel Drummond", photo: "assets/portraits/jaleel-drummond.png", email: "", linkedIn: "" },
  { role: "Chaplain", name: "Jaylen L. Johnson", photo: "assets/portraits/jaylen-johnson.png", email: "", linkedIn: "" },
  { role: "Chapter Advisor", name: "Dr. Leon Rousen", photo: "assets/portraits/leon-rousen.png", email: null, linkedIn: "" },
];

// Update this list to add or revise upcoming events shown on the monthly calendar.
const eventsCalendarData = [
  {
    date: "2026-04-25",
    title: "Brotherhood Cookout",
    time: "1:00 PM",
    location: "Student Center Lawn",
    description: "An end-of-month fellowship gathering with music, food, and chapter updates for brothers and invited guests.",
    linkLabel: "RSVP with the chapter",
    linkUrl: "mailto:epialphas@gmail.com?subject=Brotherhood%20Cookout%20RSVP",
  },
  {
    date: "2026-04-28",
    title: "Study Hall and Mentorship Night",
    time: "6:30 PM",
    location: "Brown Hall, Room 214",
    description: "An academic accountability night with upperclassmen support, planning time, and mentorship check-ins.",
  },
  {
    date: "2026-05-03",
    title: "Community Cleanup",
    time: "9:00 AM",
    location: "Downtown Norfolk",
    description: "A service day focused on neighborhood cleanup, visibility, and local impact.",
    linkLabel: "Volunteer details",
    linkUrl: "mailto:epialphas@gmail.com?subject=Community%20Cleanup%20Volunteer",
  },
  {
    date: "2026-05-10",
    title: "Mother's Day Appreciation Brunch",
    time: "11:30 AM",
    location: "Campus Dining Hall",
    description: "A celebratory brunch honoring the women who continue to support the chapter and its mission.",
  },
  {
    date: "2026-05-18",
    title: "Leadership Transition Meeting",
    time: "7:00 PM",
    location: "Chapter Meeting Room",
    description: "Officer handoff, summer planning, and committee alignment for the next chapter term.",
  },
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

const LINKEDIN_LOGO_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><rect x="2" y="2" width="20" height="20" rx="3.5" fill="currentColor"/><circle cx="7.35" cy="7.2" r="1.15" fill="#0a0a0a"/><rect x="6.2" y="10" width="2.3" height="7.4" fill="#0a0a0a"/><path d="M11 10h2.15v1.15c.48-.83 1.38-1.37 2.6-1.37 2.09 0 3.25 1.36 3.25 3.9v3.72H16.7v-3.38c0-1.32-.48-2.08-1.56-2.08-1.16 0-1.84.8-1.84 2.37v3.09H11V10z" fill="#0a0a0a"/></svg>';

const calendarMonthFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

const calendarDetailFormatter = new Intl.DateTimeFormat("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
  year: "numeric",
});

const todaysDateKey = formatDateKey(new Date());
let currentCalendarMonth = getInitialCalendarMonth();
let selectedCalendarDateKey = getInitialSelectedDate();

function formatDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getInitialCalendarMonth() {
  const seed = eventsCalendarData[0]?.date ? new Date(`${eventsCalendarData[0].date}T12:00:00`) : new Date();
  return new Date(seed.getFullYear(), seed.getMonth(), 1);
}

function getInitialSelectedDate() {
  if (eventsCalendarData.some((event) => event.date === todaysDateKey)) return todaysDateKey;
  return eventsCalendarData[0]?.date || todaysDateKey;
}

function getEventsForDate(dateKey) {
  return eventsCalendarData.filter((event) => event.date === dateKey);
}

function renderEventsCalendarDetail(dateKey) {
  if (!eventsCalendarDetail) return;

  const events = getEventsForDate(dateKey);
  const date = new Date(`${dateKey}T12:00:00`);
  const formattedDate = calendarDetailFormatter.format(date);

  if (!events.length) {
    eventsCalendarDetail.innerHTML = `
      <p class="events-calendar-detail-date">${formattedDate}</p>
      <div class="events-calendar-empty">
        <strong>No chapter events posted</strong>
        <p>Select another highlighted date or add an event to the calendar data in <code>script.js</code>.</p>
      </div>
    `;
    return;
  }

  const eventCards = events
    .map((event) => {
      const metaParts = [event.time, event.location].filter(Boolean);
      const meta = metaParts.length ? `<p class="events-calendar-event-meta">${metaParts.join(" · ")}</p>` : "";
      const link = event.linkUrl
        ? `<a class="events-calendar-event-link" href="${event.linkUrl}" target="_blank" rel="noopener noreferrer">${event.linkLabel || "View details"}</a>`
        : "";
      return `
        <article class="events-calendar-event">
          <h4>${event.title}</h4>
          ${meta}
          <p>${event.description}</p>
          ${link}
        </article>
      `;
    })
    .join("");

  eventsCalendarDetail.innerHTML = `
    <p class="events-calendar-detail-date">${formattedDate}</p>
    <div class="events-calendar-detail-list">${eventCards}</div>
  `;
}

function renderEventsCalendar() {
  if (!eventsCalendarGrid || !eventsCalendarMonth) return;

  const monthStart = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth(), 1);
  const monthEnd = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() + 1, 0);
  const firstWeekday = monthStart.getDay();
  const totalDays = monthEnd.getDate();

  eventsCalendarMonth.textContent = calendarMonthFormatter.format(monthStart);

  const cells = [];
  for (let i = 0; i < firstWeekday; i += 1) {
    cells.push('<div class="events-calendar-spacer" aria-hidden="true"></div>');
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const date = new Date(monthStart.getFullYear(), monthStart.getMonth(), day);
    const dateKey = formatDateKey(date);
    const events = getEventsForDate(dateKey);
    const isSelected = dateKey === selectedCalendarDateKey;
    const isToday = dateKey === todaysDateKey;
    const classes = [
      "events-calendar-day",
      events.length ? "has-event" : "",
      isSelected ? "is-selected" : "",
    ]
      .filter(Boolean)
      .join(" ");
    const countBadge = events.length
      ? `<span class="events-calendar-event-count">${events.length}</span>`
      : "";
    const todayMarker = isToday ? '<span class="events-calendar-day-today" aria-hidden="true"></span>' : "";

    cells.push(`
      <button
        type="button"
        class="${classes}"
        data-date="${dateKey}"
        role="gridcell"
        aria-pressed="${isSelected}"
        aria-label="${calendarDetailFormatter.format(date)}${events.length ? `, ${events.length} event${events.length > 1 ? "s" : ""}` : ", no events"}"
      >
        ${todayMarker}
        <span class="events-calendar-day-number">${day}</span>
        ${countBadge}
      </button>
    `);
  }

  eventsCalendarGrid.innerHTML = cells.join("");
  renderEventsCalendarDetail(selectedCalendarDateKey);
}

if (eventsCalendarGrid) {
  renderEventsCalendar();

  document.getElementById("events-calendar-prev")?.addEventListener("click", () => {
    currentCalendarMonth = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() - 1, 1);
    renderEventsCalendar();
  });

  document.getElementById("events-calendar-next")?.addEventListener("click", () => {
    currentCalendarMonth = new Date(currentCalendarMonth.getFullYear(), currentCalendarMonth.getMonth() + 1, 1);
    renderEventsCalendar();
  });

  eventsCalendarGrid.addEventListener("click", (event) => {
    const button = event.target.closest(".events-calendar-day");
    if (!button) return;
    selectedCalendarDateKey = button.dataset.date;
    renderEventsCalendar();
  });
}

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
    chapterDean: "Lauryce Derose",
    chapterPharaoh: "Jordan Moody",
    members: [
      { position: "1/Ace", fullName: "Keshun Nelson", lineName: "Prime Proton", photo: "", major: "Chemistry with a focus in Pre-Med", minor: "", hometown: "Milwaukee, WI", linkedIn: "" },
      { position: "2/Deuce", fullName: "Jahkari Taylor", lineName: "V.I.Pharoah", photo: "", major: "Political Science", minor: "", hometown: "Chesapeake, VA", linkedIn: "" },
      { position: "3/Tre", fullName: "Allan White", lineName: "Nocturnal Beast", photo: "", major: "Sociology", minor: "", hometown: "Mount Vernon, NY", linkedIn: "" },
      { position: "4/H4rdcore", fullName: "Jerome Sutton III", lineName: "Steady Heart", photo: "assets/portraits/jerome-sutton-iii.png", major: "Sociology", minor: "Criminal Justice", hometown: "Chesapeake, VA", linkedIn: "" },
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
    chapterDean: "Jared Jackson",
    chapterPharaoh: "Leon Mosley Jr.",
    noHeadshots: true,
    members: [
      { position: "1/Ace", fullName: "Aaron Fisher Jr", lineName: "Lord Frieza", photo: "", major: "Business Finance", minor: "", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/aaron-fisher-jr-15a2a0248" },
      { position: "2/Deuce", fullName: "Lauryce Derose", lineName: "Critical Condition", photo: "", major: "Sociology", minor: "Criminal Justice", hometown: "Chicago, IL", linkedIn: "https://www.linkedin.com/in/lauryce-derose-66424027b" },
      { position: "3/Tre", fullName: "Taavon Mitchell Jr", lineName: "Pharoahgamo", photo: "", major: "Computer Science with a focus in Cybersecurity", minor: "", hometown: "Baltimore, MD", linkedIn: "https://www.linkedin.com/in/taavon-mitchell-jr-85ba23243" },
      { position: "4/H4rdcore", fullName: "Alexander Soler", lineName: "Phlash", photo: "", major: "Social Work", minor: "", hometown: "Paterson, NJ", linkedIn: "https://www.linkedin.com/in/alexander-soler3" },
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
    chapterDean: "Charles Thompson Jr.",
    chapterPharaoh: "Leon Mosley Jr.",
    noHeadshots: true,
    members: [
      { position: "1/Ace", fullName: "McKinley Lowery III", lineName: "Basquiat", photo: "", major: "Business", minor: "", hometown: "Detroit, MI", linkedIn: "https://www.linkedin.com/in/mckinleyloweryiii" },
      { position: "2/Deuce", fullName: "Malik Cunningham", lineName: "Winter Soldier", photo: "", major: "Information Technology", minor: "", hometown: "Baltimore, MD", linkedIn: "https://www.linkedin.com/in/malik-cunningham-b4792b228" },
      { position: "3/Tre", fullName: "Tyreese Davis", lineName: "Koman", photo: "", major: "Early Childhood<br>Development", minor: "", hometown: "Chester, SC", linkedIn: "" },
      { position: "4/H4rdcore", fullName: "Christian Palmer", lineName: "Split", photo: "", major: "Mass Communications", minor: "", hometown: "Halifax, VA", linkedIn: "" },
      { position: "5/5ive", fullName: "Brian Peede Jr", lineName: "Rocky Balboa", photo: "", major: "Music Education", minor: "", hometown: "Hampton, VA", linkedIn: "https://www.linkedin.com/in/mr-brian-peede-585bab231" },
      { position: "6/6ix", fullName: "Shy'Keem Hussey", lineName: "Static Shock", photo: "", major: "Sociology", minor: "Criminal Justice", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/shykeem-hussey-21a296232" },
      { position: "7/Jewel - Tail", fullName: "Christopher Price Jr", lineName: "Thanos", photo: "", major: "Business Marketing", minor: "", hometown: "Chicago, IL", linkedIn: "https://www.linkedin.com/in/christopher-price-jr-6a41ba314" },
    ],
  },
  "Spring 2024": {
    lineName: "12 Degrees Below Zero aka Sons of the New World aka Skii Club",
    chapterDean: "Christopher Martin",
    chapterPharaoh: "Jordan Moody",
    noHeadshots: true,
    members: [
      { position: "1/Ace", fullName: "Jahmire Westbrook", lineName: "Vantage Po1nt", photo: "", major: "Accounting", minor: "", hometown: "Neptune, NJ", linkedIn: "https://www.linkedin.com/in/jahmire-westbrook" },
      { position: "2/Deuce", fullName: "Narenzo Fleors", lineName: "unPhased Marksman", photo: "", major: "Political Science", minor: "Business Finance", hometown: "Detroit, MI", linkedIn: "https://www.linkedin.com/in/narenzofleors" },
      { position: "3/Tre", fullName: "Malcolm Warren", lineName: "Golden Glove", photo: "", major: "Computer Science", minor: "", hometown: "Richmond, VA", linkedIn: "https://www.linkedin.com/in/malcwarren404" },
      { position: "4/H4rdcore", fullName: "Jamari Jones", lineName: "Frozone\" aka \"Virgil", photo: "", major: "Business Entrepreneurship", minor: "", hometown: "Richmond, VA", linkedIn: "https://www.linkedin.com/in/jamari-jones-4a2991288" },
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
    chapterDean: "Jordan Cain",
    chapterPharaoh: "Kaion Hamilton III",
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
      { position: "4/H4rdcore", fullName: "Dylan Bryant", lineName: "Spike Lee", photo: "assets/portraits/dylan-bryant.png", major: "Graphic Design with a focus in Fine Arts", minor: "", hometown: "Prince George's County, MD", linkedIn: "" },
      { position: "5/Live 5ive", fullName: "Ian Thomas", lineName: "Ares", photo: "assets/portraits/ian-thomas.png", major: "Interdisciplinary Studies with a focus in Criminal Justice and Business Marketing", minor: "", hometown: "Fredricksburg, VA", linkedIn: "https://www.linkedin.com/in/ian-thomas-09186b330" },
      { position: "6/Slick 6ix", fullName: "Simeon Butler", lineName: "Pain Killer", photo: "assets/portraits/simeon-butler.png", major: "Mass Communications", minor: "Business", hometown: "Huntsville, AL", linkedIn: "" },
      { position: "7/Jewel", fullName: "Kyree Williams", lineName: "Eagle Eye", photo: "assets/portraits/kyree-williams.png", major: "Psychology", minor: "Business", hometown: "Philadelphia, PA", linkedIn: "https://www.linkedin.com/in/kyree-williams-390870383/" },
      { position: "8/8Ball", fullName: "Jaleel Drummond", lineName: "Creed", photo: "assets/portraits/jaleel-drummond.png", major: "Social Work", minor: "", hometown: "Philadelphia, PA", linkedIn: "" },
      { position: "9/Notorios 9ine", fullName: "Nyles Ferguson", lineName: "Mister Terrific", photo: "assets/portraits/nyles-ferguson.png", major: "Political Science", minor: "", hometown: "Chesapeake, VA", linkedIn: "https://www.linkedin.com/in/nyles-ferguson-45b254321/" },
      { position: "10/Dime", fullName: "Brett Andrews Jr", lineName: "Man of Steel", photo: "assets/portraits/brett-andrews-jr.png", major: "Double Major in Computer Engineering Technology and Electronics Engineering Technology", minor: "", hometown: "Atlanta, GA", linkedIn: "https://www.linkedin.com/in/brett-andrews-norfolk-state" },
      { position: "11/Fly E11even - Tail", fullName: "Joseph Hargett", lineName: "Hail Mary", photo: "assets/portraits/joseph-hargett.png", major: "Business Marketing", minor: "", hometown: "Williamston, NC", linkedIn: "https://www.linkedin.com/in/joseph-hargett/" },
    ],
  },
  "Spring 2021": {
    lineName: "THE REAL IS BACK aka The 9 Worthies aka N.I.P",
    chapterDean: "Dominic Jordan",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Brandon Myrthil", lineName: "Menace to Society", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Leon Mosley", lineName: "Iron Man", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Justin Carr", lineName: "The Joker", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Master Turntine", lineName: "Silent Intellect", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Jared Jackson", lineName: "ScarPhace", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Kenneth Goodall", lineName: "SnowPhall", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Nathan Foster", lineName: "The Reclamation", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Trent Grant", lineName: "F8te Defied", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Charles Thompson", lineName: "Phrozen Prodigy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2019": {
    lineName: "5 Points of Power aka New Era aka Phrozen Genesis",
    chapterDean: "Kyle Archie",
    chapterPharaoh: "Malcolm Anderson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Kory Wells", lineName: "Suntzu", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Ari Weems", lineName: "Arkimedes", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Anthony Renyolds", lineName: "The Diplomat", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Jeremiah O'Bryant", lineName: "Ice-o-lated", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Dominique Jordan", lineName: "Phree Smoke", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2018": {
    lineName: "Legacy of the Light aka Reconciliation Resurgence aka Flawless Chaos",
    chapterDean: "Antwaun Hopkins",
    chapterPharaoh: "Kashaun Freeman",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Jordan Salary", lineName: "Gods Heart", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Tormè DeVauxbray", lineName: "Hidden Warrior", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Johnthan Beckett Jr.", lineName: "John Got it", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Malik Mccoy", lineName: "Eye of the Storm", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Myron Simon", lineName: "Born Sinna", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Marcus Cooper", lineName: "Views from the 6th", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Kyle Archie", lineName: "Savage Warfare", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2017": {
    lineName: "The 11 Apostles of Light aka The Last Descendants of the Chaos aka Watch The Throne",
    chapterDean: "Darius Ferguson",
    chapterPharaoh: "Antwan Bynum",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Malcolm Anderson", lineName: "Chosen One", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Devin Jefferson", lineName: "Soul Survivor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Eric Murphy", lineName: "MC Light", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Joshua Marshetelli", lineName: "Hannibal", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Aaron Jones", lineName: "Cold War", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Larry Whitaker Jr", lineName: "Alchemy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Shawn Smith", lineName: "Key Component", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Nathaniel Oppong", lineName: "Black Panther", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Jaylen Hobdy", lineName: "Pharaoh of War", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Jalen Mask", lineName: "Executive Decision", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Travion Capers", lineName: "De Ja Vu", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2016": {
    lineName: "The Reconciliation aka 7 Years of Famine",
    chapterDean: "Cedric Claud",
    chapterPharaoh: "Christopher Spriggs",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "De'Von Booker", lineName: "Full Metal Jackets", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Kashaun Freeman", lineName: "The Soul of Thutmose the Third", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Antwaun Hopkins", lineName: "The Revenant", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Edward Meadows", lineName: "The Blood of Thoth", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Christopher Crawford", lineName: "Phresh Prince", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Trey McClendon", lineName: "Golden Eye 006", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Dymitrous Byrd", lineName: "Case Closed", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2015": {
    lineName: "The Braves of a King aka Pharaoh's Rampage",
    chapterDean: "Robin Jolley Jr.",
    chapterPharaoh: "Malcom Perry",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Calvin Brown", lineName: "Inception", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Joshua Haynes", lineName: "Fear Factor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "William Scott", lineName: "Phearless Pharoah", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Christian McFall", lineName: "Undisputed", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Antwan Bynum", lineName: "Illmatic", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Gary Night", lineName: "General Ice", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Ryan Turner", lineName: "Forsceen Prophecy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Billy Scott", lineName: "Mastermind", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Blair Reid", lineName: "TNT The Notorious Tut", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Jeremy Barnette", lineName: "Cutting Edge", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Twan Davis", lineName: "Shock Treatment", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Alexander Hinton", lineName: "Public Enemy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "Mike Smith", lineName: "The Rebelations", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2014": {
    lineName: "Trials by Fire aka Fahrenheit 9/11",
    chapterDean: "Amory Tasby",
    chapterPharaoh: "Dashaun Vance",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Paris Diaz", lineName: "Diplomatic Immunity", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Steven Smalts", lineName: "Iron Heart", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Allen Simon", lineName: "Livewire", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Bruce Truitt", lineName: "Frozen Fortitude", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Andre Pickett", lineName: "Atlas", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Malcolm Perry", lineName: "Organized Chaos", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Cedrick Claude", lineName: "Bane", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Christopher Thompson", lineName: "Apocalypse", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Brandon Wells", lineName: "Silent Storm", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2013": {
    lineName: "Takeover aka 15 Weapons of Mass Destruction",
    chapterDean: "William Boyd",
    chapterPharaoh: "Michael Smart",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Deshane Vance", lineName: "Faces of Death", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Leron Smith", lineName: "Leon Ice", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Kendrick Eps", lineName: "Frozen Deception", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Korbet Clark", lineName: "Odessys the Prophet", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Davay Lineman", lineName: "Tephlon Don", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Bejamin Osoba", lineName: "Mission Impossible", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Robin Jolly Jr.", lineName: "Rampage", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Christopher Spriggs", lineName: "MVP (Most Valuable Pharoah)", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Christopher Picket", lineName: "Death Sentence", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Keeble Hawthorn Jr.", lineName: "The Immortal", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Richard Tran", lineName: "The God Father", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Shane Dawson", lineName: "Mr. Invincible", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Jonathan Amos", lineName: "Achilles", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "Nathaniel Mungo", lineName: "Death Comes in 3s", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "15", fullName: "Joel Fudge", lineName: "The Finale", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2011": {
    lineName: "The Blueprint aka By Any Means Necessary",
    chapterDean: "Willie R. Smith III",
    chapterPharaoh: "Darius Ferguson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Amory Tasby", lineName: "Death Before Dishonor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Brandon Johnson", lineName: "Rock Nation", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Michael Smart", lineName: "Prince of Kemet", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Kenneth Smith Jr.", lineName: "Growing Painz", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "William Boyd", lineName: "Ether", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Karl Massenburg", lineName: "Man of Honor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Christopher Bowie", lineName: "The Omen", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Carl Burnett Jr.", lineName: "Heart of the City", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Marcus Dodson", lineName: "The Unsung Hero", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Juan Lascano", lineName: "Talented Tenth", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Ryan Newsome", lineName: "Invictus the II", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2010": {
    lineName: "The Egyptian Asylums aka Hot Heads aka 8 Ways to Die",
    chapterDean: "Matthew Onajafe",
    chapterPharaoh: "Trevante Jenkins",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Rashad Patterson", lineName: "Death of Anubis", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dwight Tennison Jr.", lineName: "DePhiant", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Antwan Hicks", lineName: "Suicidal", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Martin Armstead", lineName: "Kaged Kong", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Raymond Spence", lineName: "Ice-O-Tonic", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Cedric King", lineName: "Enemy of State", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Charles Perkins", lineName: "Death Row", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 2007": {
    lineName: "Gorilla MAPHIA (Men About Professionalism, Honor, Integrity, and Ambition) aka NWA (Necessary Work of Alpha) aka Welcome to the Lumber Yard",
    chapterDean: "Robert Colin Stephens",
    chapterPharaoh: "Marques Ellis",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Tejay Lord", lineName: "Da Patron", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Marcus Harley", lineName: "The Hitman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Timothy Russell", lineName: "Cold Capo", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Paul McFall IV", lineName: "Donnie Brascoe", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Steven Dent", lineName: "Made Man", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Steve Parker Jr.", lineName: "Lucky Luciano", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Mathew Onojafe", lineName: "Don Corleone", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Brandon Williams", lineName: "Gusto", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Stevon Armstead", lineName: "Paid In Phull", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Carlos Segarra", lineName: "Mr. Perphect", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Stefon Alexander", lineName: "Stak Bundlez", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Myson Xavier Way", lineName: "Political Assassin", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Trevante Jenkins", lineName: "The GoodPhella", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "Jesus \"Zeus\" Cambell", lineName: "The Kingpin", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "15", fullName: "Julius McCormack", lineName: "Noriega", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "16", fullName: "Darius Ferguson", lineName: "Battle Royale", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 2006": {
    lineName: "The Notorious Reign",
    chapterDean: "Quinell Watson",
    chapterPharaoh: "Kevin Hall",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Dovarius Peoples", lineName: "Nocturnal", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Maamen Cook", lineName: "The Enigma", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Jason Tolliver", lineName: "Phrozen Phire", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Kendall Moody", lineName: "Jack Phrost", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Brian Gay", lineName: "Living Legend", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Darrius Robinson", lineName: "The Sin-ICE-ster", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "James Edwards III", lineName: "Jewel Shocka", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Willie R. Smith III", lineName: "PsychosICE", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 2005": {
    lineName: "11 War Chronicles aka TNT (Trials n Tribulations)",
    chapterDean: "Rahman Swain",
    chapterPharaoh: "Brandon \"Bo\" Jackson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Vincent Shuler Jr.", lineName: "Golden Dragon", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dwayne M. Littlejohn", lineName: "Golden Apprentice", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "William L. Davis Jr.", lineName: "Golden Minister", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Ryan J. Maull", lineName: "Golden Knight", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Robert Colin Stephens", lineName: "Golden Warrior", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Keith A.C. Freeman", lineName: "Golden Legacy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Jelaun K. Newsome", lineName: "Golden Alchemist", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "David L. Cross Jr.", lineName: "Golden Storm", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Kevin Shabazz", lineName: "Golden Pharaoh", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Dominic J. Garner", lineName: "Golden Child", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Alexander Smith-Johnson", lineName: "Golden Lion", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 2004": {
    lineName: "State of Emergency aka B.S.T (Blood, Sweat, and Tears)",
    chapterDean: "Brandon \"Bo\" Jackson",
    chapterPharaoh: "Mickey Armstrong",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Kevin Hall", lineName: "Brain Phreeze", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Quinell Watson", lineName: "Professor Ice", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Dwight Jarrett", lineName: "Reasonable Doubt", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Jared Holmes", lineName: "EXTRAordinary", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Marquis Ellis", lineName: "Guerilla P.I.M.P.", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Raymond Dawsoniak", lineName: "Chill Factor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Corey Brown", lineName: "Bananaz", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Jamaal Ali Richardson", lineName: "King Kong", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2004": {
    lineName: "The Sons of Messiah",
    chapterDean: "Mike Wilkins",
    chapterPharaoh: "Tony Davenport Jr.",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Wes Wesson", lineName: "Short Circuit", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Johnathan Branch", lineName: "Black Out", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Kirk Houston Jr.", lineName: "Christian Egyptian", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Rahman Swain", lineName: "The Golden Story", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Darren Bowens", lineName: "The Negotiator", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "John Johnson", lineName: "Breathe Easy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Robert Looper III", lineName: "The Eye of Ra", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 2003": {
    lineName: "The Light aka Chilluminati",
    chapterDean: "Bryant Hall",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Torrey Watkins", lineName: "Major Payne", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dale Barfield", lineName: "Iron Monkey", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Charles Powell", lineName: "Phather Time", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Mickey Armstrong", lineName: "Whisperz", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Brandon \"Bo\" Jackson", lineName: "Young Gunna", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Preston Brinkley", lineName: "Makaveli", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Christoph Jenkins", lineName: "Exodus", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "William White", lineName: "Silverback", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Kevin Tatum", lineName: "Lumberjack", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Jason Parker", lineName: "The Trilogy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2003": {
    lineName: "Gorilla Warfare",
    chapterDean: "Jamaal Anderson",
    chapterPharaoh: "Damion Wilson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Marvin Randall", lineName: "Braveheart", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Mike Wilkins", lineName: "The Grim Reaper", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Mike Archer", lineName: "Don Da Da", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Will Keowan", lineName: "Main Event", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Mike Washington", lineName: "Steel Reserve", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2002": {
    lineName: "New Alpha Order",
    chapterDean: "Tony Davenport Jr.",
    chapterPharaoh: "Damion Wilson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Aaron Scales", lineName: "Enemy Mind", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Robert Simmons", lineName: "Ghostface", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Wayne Andrews", lineName: "Black ICE", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Nathaniel Hopkins", lineName: "Chillmatic", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Andre Taylor", lineName: "The SacrifICE", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Bryant Hall", lineName: "Armageddon", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 2001": {
    lineName: "The Art of War",
    chapterDean: "James M. Riddick Jr.",
    chapterPharaoh: "Ronald Copeland",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Victor Clark", lineName: "Maximus", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Damion Wilson", lineName: "Nightcrawler", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Derick Rothwell", lineName: "Keyser Soze", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Kyle Grove", lineName: "The Game", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Nathaniel Watkins", lineName: "Shinobi", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 2000": {
    lineName: "Hostile Takeover",
    chapterDean: "James M. Riddick Jr.",
    chapterPharaoh: "Ronald Copeland",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Kenneth (Brad) Austin II", lineName: "Immovable Object", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Jason Diggs", lineName: "Irresistible Force", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Tony Davenport", lineName: "Terminal Velocity", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Kevin Montgomery", lineName: "The Phenom", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Joseph Patrick II", lineName: "King Beef", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Jamaal Anderson", lineName: "Final Destination", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1999": {
    lineName: "Legacy of Rage",
    chapterDean: "Clinton Copeland",
    chapterPharaoh: "Douglas Johnson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Syril (Mike) Gillies", lineName: "Chaos", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "George (Ernest) Davis", lineName: "The Riddler", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Dante Silmon", lineName: "Fatal Fury", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "James Riddick Jr.", lineName: "Killah Instinct", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Ronald Copeland", lineName: "The Last Dragon", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1998": {
    lineName: "Frozen Tundra",
    chapterDean: "Omar Wandera",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Jasper Lewis", lineName: "Iceburg Slim", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Samuel Watkins", lineName: "Battle Cat", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Eternally Remembered", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Clinton Copeland", lineName: "Stone Cold", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Douglas Johnson", lineName: "Big SeXXXy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Rondell Davis", lineName: "Icestorm", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Kenneth Vaughan", lineName: "Beowulf", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1997": {
    lineName: "Disciples Of Discipline aka X-Clan",
    chapterDean: "Austin Jackson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Kevin Bradby", lineName: "Attila the Hun and Southern Comfort", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Nathaniel Barfield", lineName: "Shaka Zulu and Ironman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Anthony Sutton", lineName: "Hannibal and Demolitian Man", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Kevin Cogdell", lineName: "Ahkenaton and Deathwish", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Winston Hylton", lineName: "Senworset and Cardiac Arrest", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "William (BJ) Butler", lineName: "Tutankhamen and Brooklyn Dodger", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Omar Wandera", lineName: "Jihad and Silent Rage", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1997": {
    lineName: "Tribulation",
    chapterDean: "Frank Manley",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Vernard Hinton", lineName: "Caleb", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1995": {
    lineName: "The Last Of A Legacy",
    chapterDean: "John McNeil Jr.",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Maurice Odom", lineName: "Ice Breaker II", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Roland Adams", lineName: "Wolverine II", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Jason Compton", lineName: "Bigg Poppa", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Austin Jackson", lineName: "Minister X", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Kirk Callwood", lineName: "MadLion, Imhotep, & Chief Rocker", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Maurice Hawkins", lineName: "Mouth O Mighty, Worst Nightmare & Hawk Diesel", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Marvin Collins", lineName: "Rata-Tat-Tat (Resigned From Fraternity)", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Zeno Hines", lineName: "High Stepper", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Lorenzo Briggs", lineName: "Fall Guy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Travis Ames", lineName: "Cohesion", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Anthony Brown", lineName: "911", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "DeShawn Anderson", lineName: "Line Backer", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "Corey Jackson", lineName: "The Chief", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "15", fullName: "Eugene Ward", lineName: "Disclosure", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "16", fullName: "Frank Manley", lineName: "The Keeper", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1993": {
    lineName: "The Wallbreakers",
    chapterDean: "Jarrell Watson (Mu Pi Chapter)",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Tracy Stokes", lineName: "Choir Boy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dana Tynes", lineName: "Ice Breaker", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Quinton Moss", lineName: "Ambassador", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Samuel Jones", lineName: "Confusion", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Aubrey Ricks", lineName: "Double Vision", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Jeffrey Dortch", lineName: "The Surgeon", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Robert Stokes", lineName: "Curfew", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Derrick Blair", lineName: "Smooth", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Quincy Stewart", lineName: "Batman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Reginald Bush", lineName: "Sexual Chocolate", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Franklin Blackmon", lineName: "Officer & a Gentleman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "John McNeill", lineName: "Joker Duce", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Armando Wyatt", lineName: "Debonair", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "Thomas Meyers", lineName: "I-95", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1992": {
    lineName: "X-Men aka The Dirty Dozen",
    chapterDean: "Clarence Bishop",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Raleigh Harsley", lineName: "Bishop", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Reggie Ford", lineName: "Wolverine", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Michael Johns", lineName: "Gambler", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Stacey Gillus", lineName: "Infinity", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Goddard Robinson", lineName: "Hurricane", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Randy Cooper", lineName: "Warpath", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Elias \"OX\" Oxdien III", lineName: "The Mac Perfolus", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Alvin Wilson II", lineName: "Bleek", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Adonis Mason", lineName: "Thor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Clifford Davis", lineName: "Godfather", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Joe L. Mason Jr.", lineName: "Mr. Loverman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Demetris Milbourne", lineName: "Ruff, Rugged and Raw", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1991": {
    lineName: "New Jack Swing",
    chapterDean: "Anthony \"Slap\" Jackson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Emmanull \"Nate\" Thomas", lineName: "Little Caesar", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Allison \"Bad Joe\" Trotman", lineName: "Little Big Man", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Shoan Harper", lineName: "Wonder Twin #1", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Lavon Harper", lineName: "Wonder Twin #2", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Corey D. Walker", lineName: "Total Package", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Robert Perkins", lineName: "Grumpy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "James Dance", lineName: "Hollywood", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Henry Morris", lineName: "Sir Henry", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Antonio Brown", lineName: "Merlin", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Ernest Ellis", lineName: "Quiet Storm", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Tyrone \"Tye\" Gillins", lineName: "Iceman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Dennis Spady", lineName: "Honner", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Benedict Spady", lineName: "K-Sweat", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "James \"Bobby\" Smith", lineName: "B-Love", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "15", fullName: "Anthony Simmons", lineName: "Smooth and Debonaire", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "16", fullName: "Jonathan Banks", lineName: "Vision", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "17", fullName: "Bryan D. Cuffee", lineName: "Dirty Pierre III", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1990": {
    lineName: "NEXUS",
    chapterDean: "Lester L. Arnold",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Shelly Thomas", lineName: "Time Keeper", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Rendell Green", lineName: "Chinaman", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Desmond Prillamen", lineName: "MLK", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Jeff Norfleet", lineName: "Politician", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Rod Morris", lineName: "Mardi Gras", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "William (BJ) Jones", lineName: "Pit Bull", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Clarence (Broozer) Bishop", lineName: "Fred Flintstone", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Timothy D. Goler", lineName: "Eight Ball", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Calvin Logan", lineName: "M.C. Poet", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Nathan \"Lumpy\" Lumpkin", lineName: "Beach Bum", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Arthur Smith", lineName: "Astro", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "David Lewis", lineName: "Backdoor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1988": {
    lineName: "THE UNTOUCHABLES",
    chapterDean: "Grant H. Coleman III",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "John W. Newsome III", lineName: "Spark Plug", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Marcus Logan", lineName: "Mouse", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Erwin Garcia", lineName: "Juggernaut", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Arthur (Artie) Jarrett Jr.", lineName: "Q-Bert", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Victor (Vic) Patterson", lineName: "Sleepy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Anthony (Slap) M. Jackson", lineName: "Invictus", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Jonathan Beckett", lineName: "Old Man", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Domonic A. Bearfield", lineName: "Verbose", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Joshua Aycott", lineName: "Sampson", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Darrell Beale", lineName: "Dollar Bill", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Bradford (Brad) Hardy", lineName: "Heavy D II", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Ronald (Ron) Harris", lineName: "Skeletor II", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1987": {
    lineName: "NOMIEN DUBIUM (Nine the Hard Way)",
    chapterDean: "James Diggs",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Charles H. Brinkley", lineName: "FYI", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Juandiego R. Wade", lineName: "Heavy D", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Russell Stewart", lineName: "Mission Impossible", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Grant H. Coleman III", lineName: "Dirty Pierre II & Gibraltar", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Mark S. Askew", lineName: "Entrepreneur", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Kevin M. Holmes", lineName: "Boy Wonder", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Warren Fowler", lineName: "Cro", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Lester L. Arnold", lineName: "Deputy Dawg & LA Law", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Ollie Elazier", lineName: "Skeletor", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1986": {
    lineName: "CONTRAS",
    chapterDean: "Reginald Black",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Perry Seawright", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Terry James Staten", lineName: "Khadafy", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Dwayne (Pop) Tillman", lineName: "Black Panther", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Dwight Rawlins", lineName: "Castro", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Aarion Durante' Benton", lineName: "Khomeini", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Ricardo M. Daniels", lineName: "Idi-Amin", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Benjamin (Bennie) Spady III", lineName: "Mario", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Anthony K. Butler", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1985": {
    lineName: "PANDAVA BROTHERS (Egyptian Gods)",
    chapterDean: "Brian White",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Al Lawson", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Glen Murray", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Pernell Jordan", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Jerome (Bump) Moses", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Steven A. Butler", lineName: "Thoth", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1984": {
    lineName: "THE NOMADS",
    chapterDean: "Jeffery D. Freeland",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Gregory A. Davis", lineName: "Tiny Giant", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "George Freeman", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Vincent Mohr", lineName: "Jason", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "John Curtis Small", lineName: "Smallbusters", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "William C. White", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Greg Willis", lineName: "Cosmos & Gismo", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "James E. Banks", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1983": {
    lineName: "",
    chapterDean: "Marvin Burch",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Frank Nelson", lineName: "H Master", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "James Diggs", lineName: "Total Chaos & Grandfather", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Trevin Jones", lineName: "Mellow Madness", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Michael Webb", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Vincent Boulden", lineName: "Golden Boulden", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Winthrop Love Maduro", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1983": {
    lineName: "SPHINX",
    chapterDean: "Mark Bartlett",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Leon Booker", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Jeffery Garrett", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Kelvin Lloyd", lineName: "The Rock", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Keith O'Neal France", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Larry Brown", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Anthony Goodman", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Michael Webb", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1982": {
    lineName: "PHARAOHS",
    chapterDean: "Mark Bartlett",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Dennis Wade", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Ronnie Akers", lineName: "Cadillac", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Jacques Walden", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Julian Jackson", lineName: "Ramases", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Mark Webb", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Curtis Bunn", lineName: "Moses", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1981": {
    lineName: "PANACEA",
    chapterDean: "Ronnie Bagley",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Jeffrey (JD) Freeland", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Tyrone Wyche", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Melvin Jones", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Fred (Freddie Gee) Gore", lineName: "Achilles", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Derek (Nick) Lambert", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Marvin Burch", lineName: "Fahrenheit", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "Greg Rawls", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "10", fullName: "Anthony (Killroy) Hall", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "11", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "12", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "13", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "14", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "15", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "16", fullName: "Dropped Dead and Gone", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1980": {
    lineName: "CONGO",
    chapterDean: "Harry Sykes",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Hubert (Ronnie) E. Bagley Jr.", lineName: "Sargent Psycho", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Kim S. Mosely", lineName: "Tumble Weed & Inch Worm", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Marc E. Davenport", lineName: "Houdini", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1979": {
    lineName: "NURU",
    chapterDean: "Charles E. Johnson",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Karl Stokes", lineName: "Hannabal", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Leon Garnette", lineName: "Omar", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "French Pope Jr.", lineName: "Pharoah", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Harry Sykes", lineName: "Akhenaton", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Mark (BJ) Bartlett", lineName: "Tut", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1978": {
    lineName: "NEW BREED",
    chapterDean: "Gerald Mason",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Charles E. Johnson", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Dennis McCraw", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Don Carson", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Al Williams", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Gary Clemmons", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Fall 1975": {
    lineName: "GENESIS EIGHT",
    chapterDean: "Samuel C. Gregory",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Linwood Thomas Daughtrey", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "William Dallas Carter", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Anthony Sizemore", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Reginald K. Hunt", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Dennis Wormley", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Milton J. Bailey", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Wiley Powell", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Dennis Cooke", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1967": {
    lineName: "MAGNIFICENT 7",
    chapterDean: "Lee H. Barnes",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Dennis Ray Winston", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "James Oswell Bowser", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Eugene Roland Ford", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Leon Herbert Jordan", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Marvin Leathers", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "Robert Gregory Rose", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Johnnie Ervin Thomas", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
    ],
  },
  "Spring 1965": {
    lineName: "",
    noHeadshots: true,
    members: [
      { position: "1", fullName: "Charles Henry Williams", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "2", fullName: "Clarence Titus Catchings", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "3", fullName: "Robert Henry Copeland", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "4", fullName: "Joseph Allen Ford", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "5", fullName: "Randolph Tynes Gray", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "6", fullName: "James Hill", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "7", fullName: "Clarence Lee Lewis", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "8", fullName: "Horace Roland Pratt", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
      { position: "9", fullName: "William Tyler Russell Jr.", lineName: "", photo: "", major: "", minor: "", hometown: "", linkedIn: "" },
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

const ENVELOPE_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';

// Build firstname.middleinitial.lastname@spartans.nsu.edu, stripping titles
// (Dr., Mr.) and suffixes (Jr, II, III). Returns "" if name is unusable.
function defaultOfficerEmail(name) {
  if (!name) return "";
  const parts = name
    .replace(/,/g, " ")
    .split(/\s+/)
    .map((s) => s.replace(/\.$/, "").trim())
    .filter(Boolean)
    .filter((s) => !/^(Dr|Mr|Mrs|Ms|Prof)$/i.test(s))
    .filter((s) => !/^(Jr|Sr|II|III|IV)$/i.test(s));
  if (parts.length === 0) return "";
  return parts.join(".").toLowerCase() + "@spartans.nsu.edu";
}

function getOfficerEmail(officer) {
  if (officer.email === null) return null;
  if (officer.email && officer.email.trim()) return officer.email.trim();
  return defaultOfficerEmail(officer.name);
}

function renderOfficers() {
  const markup = officersData
    .map((officer) => {
      const email = getOfficerEmail(officer);
      const linkedIn = officer.linkedIn && officer.linkedIn.trim();
      const emailHtml = email
        ? `<a class="officer-contact-link officer-contact-email" href="mailto:${email}" aria-label="Email ${officer.name}" title="${email}">${ENVELOPE_ICON_SVG}</a>`
        : "";
      const linkedInHtml = linkedIn
        ? `<a class="officer-contact-link officer-contact-linkedin" href="${linkedIn}" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile of ${officer.name}">${LINKEDIN_LOGO_SVG}</a>`
        : "";
      const contactsHtml = emailHtml || linkedInHtml
        ? `<div class="officer-contacts">${emailHtml}${linkedInHtml}</div>`
        : "";
      return `
        <article class="officer-card">
          <div class="officer-photo-wrap">
            ${getOfficerPhotoMarkup(officer.name, officer.photo, `${officer.name} headshot`)}
          </div>
          <div class="officer-info">
            <p class="officer-role">${officer.role}</p>
            <h3 class="officer-name">${officer.name}</h3>
            <span class="officer-divider" aria-hidden="true"></span>
            ${contactsHtml}
          </div>
        </article>
      `;
    })
    .join("");

  officerContainer.innerHTML = markup;
}

const LINEAGE_TERM_ORDER = [
  "Spring 2026", "Spring 2025", "Spring 2024", "Spring 2023", "Spring 2022",
  "Spring 2021", "Spring 2019", "Spring 2018", "Spring 2017", "Spring 2016",
  "Spring 2015", "Spring 2014", "Spring 2013", "Spring 2011", "Spring 2010",
  "Fall 2007", "Fall 2006", "Fall 2005", "Fall 2004", "Spring 2004",
  "Fall 2003", "Spring 2003", "Spring 2002", "Spring 2001", "Fall 2000",
  "Fall 1999", "Fall 1998", "Fall 1997", "Spring 1997", "Fall 1995",
  "Fall 1993", "Fall 1992", "Spring 1991", "Spring 1990", "Fall 1988",
  "Fall 1987", "Spring 1986", "Spring 1985", "Fall 1984", "Fall 1983",
  "Spring 1983", "Fall 1982", "Fall 1981", "Spring 1980", "Spring 1979",
  "Spring 1978", "Fall 1975", "Spring 1967", "Spring 1965",
];

function buildLineageTerms() {
  return LINEAGE_TERM_ORDER.map((termKey) => {
    const [season, yearStr] = termKey.split(" ");
    return { season, year: Number.parseInt(yearStr, 10) };
  });
}

function normalizeBrotherName(name) {
  if (!name) return "";
  return name.toLowerCase().trim().replace(/\s+/g, " ").replace(/[.,]/g, "");
}

function brotherNameKeys(name) {
  if (!name) return [];
  const base = normalizeBrotherName(name);
  if (!base) return [];
  const keys = [base];
  const noSuffix = base.replace(/\s+(jr|sr|ii|iii|iv|v)$/, "");
  if (noSuffix !== base) keys.push(noSuffix);
  const noMid = noSuffix.replace(/\s+[a-z](?=\s)/g, "");
  if (noMid !== noSuffix) keys.push(noMid);
  return keys;
}

const LEADER_ALIASES = new Map([
  ["dominic jordan", "Dominique Jordan"],
  ["cedric claud", "Cedrick Claude"],
  ["robin jolley jr", "Robin Jolly Jr."],
  ["malcom perry", "Malcolm Perry"],
  ["dashaun vance", "Deshane Vance"],
  ["matthew onajafe", "Mathew Onojafe"],
  ["marques ellis", "Marquis Ellis"],
  ["john mcneil jr", "John McNeill"],
  ["clarence bishop", "Clarence (Broozer) Bishop"],
  ["anthony \"slap\" jackson", "Anthony (Slap) M. Jackson"],
  ["jeffery d freeland", "Jeffrey (JD) Freeland"],
  ["mark bartlett", "Mark (BJ) Bartlett"],
  ["ronnie bagley", "Hubert (Ronnie) E. Bagley Jr."],
]);

const NAME_INDEX = new Map();

function buildNameIndex() {
  NAME_INDEX.clear();
  Object.entries(lineageData).forEach(([term, details]) => {
    if (!details || !details.members) return;
    details.members.forEach((member, idx) => {
      const fn = member.fullName;
      if (!fn || fn === "Dropped Dead and Gone" || fn === "Eternally Remembered") return;
      brotherNameKeys(fn).forEach((key) => {
        if (!NAME_INDEX.has(key)) NAME_INDEX.set(key, { term, idx });
      });
    });
  });
}

function findBrother(name) {
  if (!name) return null;
  const aliasKey = normalizeBrotherName(name);
  if (LEADER_ALIASES.has(aliasKey)) {
    const aliasTarget = LEADER_ALIASES.get(aliasKey);
    for (const key of brotherNameKeys(aliasTarget)) {
      if (NAME_INDEX.has(key)) return NAME_INDEX.get(key);
    }
  }
  for (const key of brotherNameKeys(name)) {
    if (NAME_INDEX.has(key)) return NAME_INDEX.get(key);
  }
  return null;
}

function escapeHtmlAttr(value) {
  return String(value).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function renderLeaderName(name) {
  if (!name) return "";
  const match = findBrother(name);
  if (match) {
    return `<button type="button" class="lineage-leader-link" data-target-term="${escapeHtmlAttr(match.term)}" data-target-name="${escapeHtmlAttr(name)}">${name}</button>`;
  }
  return `<span class="lineage-leader-name">${name}</span>`;
}

function jumpToBrother(targetTerm, targetName) {
  if (!targetTerm) return;
  showLineageTerm(targetTerm);
  const aliasKey = normalizeBrotherName(targetName);
  const resolvedName = LEADER_ALIASES.get(aliasKey) || targetName;
  const wantedKeys = new Set([...brotherNameKeys(targetName), ...brotherNameKeys(resolvedName)]);
  requestAnimationFrame(() => {
    const rows = lineageContainer.querySelectorAll(".lineage-member");
    let target = null;
    rows.forEach((row) => {
      if (target) return;
      const rowName = row.dataset.fullName || "";
      const rowKeys = brotherNameKeys(rowName);
      if (rowKeys.some((k) => wantedKeys.has(k))) target = row;
    });
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("lineage-member-highlight");
      window.setTimeout(() => target.classList.remove("lineage-member-highlight"), 2600);
    }
  });
}

function isCropEditable(termKey) {
  const match = /^(Spring|Fall)\s+(\d{4})$/.exec(termKey || "");
  if (!match) return false;
  const season = match[1];
  const year = Number.parseInt(match[2], 10);
  if (Number.isNaN(year)) return false;
  if (year > 2025) return true;
  if (year < 2025) return false;
  return season === "Spring" || season === "Fall";
}

function buildLineageItem(termKey, details) {
  const item = document.createElement("article");
  item.className = "lineage-item";

  if (details) {
    const noPhotos = !!details.noHeadshots;
    const memberClass = noPhotos ? "lineage-member lineage-member-no-photo" : "lineage-member";
    const roster = details.members
      .map((member, idx) => {
        const positionRaw = member.position || "";
        const [num, positionName] = positionRaw.includes("/") ? positionRaw.split("/", 2) : [positionRaw, ""];
        const positionNameHtml = positionName ? `<span class="lineage-position-name">${positionName}</span>` : "";
        const lineNameHtml = member.lineName ? `<span class="lineage-line-name">"${member.lineName}"</span>` : "";
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
          const detailItems = [
            { label: "Major", value: major },
            ...(minor ? [{ label: minorLabel, value: minor }] : []),
            { label: "Hometown", value: member.hometown || "—" },
          ]
            .map(
              ({ label, value }) => `
                <div class="lineage-member-detail-item">
                  <span class="lineage-member-detail-label">${label}</span>
                  <span class="lineage-member-detail-value">${value}</span>
                </div>`
            )
            .join("");
          bodyHtml = `
              <div class="lineage-member-col lineage-member-col-identity">
                <span class="lineage-position-num">#${num}</span>
                ${positionNameHtml}
                <span class="lineage-full-name">${member.fullName}</span>
                ${lineNameHtml}
              </div>
              <div class="lineage-member-col lineage-member-col-details">
                <div class="lineage-member-details">${detailItems}</div>
              </div>
              <div class="lineage-member-col lineage-member-col-state">${stateMapHtml || ""}</div>
              <div class="lineage-member-col lineage-member-col-blank">${linkedInHtml}</div>`;
        } else {
          bodyHtml = `
              <div class="lineage-member-meta">
                <span class="lineage-position-num">#${num}</span>
                ${positionNameHtml}
                <span class="lineage-full-name">${member.fullName}</span>
                ${lineNameHtml}
              </div>`;
        }

        const roleAttrs = ' tabindex="0" role="button"';
        const noStateClass = noPhotos && !statePath ? " lineage-member-no-state" : "";
        const fullNameAttr = ` data-full-name="${(member.fullName || "").replace(/"/g, "&quot;")}"`;
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
    const lineNameP = details.lineName ? `<p class="lineage-term-line-name">${details.lineName}</p>` : "";
    const deanRow = details.chapterDean
      ? `<p class="lineage-leader-row"><span class="lineage-leader-label">Dean of Membership:</span> ${renderLeaderName(details.chapterDean)}</p>`
      : "";
    const pharaohRow = details.chapterPharaoh
      ? `<p class="lineage-leader-row"><span class="lineage-leader-label">Chapter President:</span> ${renderLeaderName(details.chapterPharaoh)}</p>`
      : "";
    item.innerHTML = `
      <h3>${termKey}</h3>
      ${lineNameP}
      ${deanRow}
      ${pharaohRow}
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
  buildNameIndex();
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
  const visualSection = modal.querySelector(".rap-sheet-visual");
  const photoWrap = modal.querySelector(".rap-sheet-photo-wrap");
  const crop = getCropValue(member.fullName);
  const showVisualSection = member.photo && isCropEditable(termKey);
  visualSection.hidden = !showVisualSection;
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
  cropEditor.hidden = !showVisualSection;
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
  const leaderLink = e.target.closest(".lineage-leader-link");
  if (leaderLink) {
    e.preventDefault();
    e.stopPropagation();
    jumpToBrother(leaderLink.dataset.targetTerm, leaderLink.dataset.targetName);
    return;
  }
  if (e.target.closest(".lineage-member-linkedin")) return;
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
  const termKey = member.dataset.term;
  const idx = parseInt(member.dataset.memberIndex, 10);
  if (termKey != null && !isNaN(idx)) openRapSheet(termKey, idx);
});
document.getElementById("lineage-list").addEventListener("keydown", (e) => {
  if (e.key !== "Enter" && e.key !== " ") return;
  if (e.target.closest(".lineage-member-linkedin")) return;
  const member = e.target.closest(".lineage-member");
  if (!member) return;
  e.preventDefault();
  const termKey = member.dataset.term;
  const idx = parseInt(member.dataset.memberIndex, 10);
  if (termKey != null && !isNaN(idx)) openRapSheet(termKey, idx);
});

// Awards & Achievements timeline (newest to oldest)
// To add a new year: copy a block, change the year, leadership, and awards.
// Awards can be a plain string, or an object { text, brother } to credit a specific brother.
const achievementsData = [
  {
    year: "2026",
    leadership: [],
    awards: [
      "Charles H. Wesley Award",
      { text: "Eastern Region Brother of the Year", brother: "Bro. Jaden Johnson" },
    ],
  },
  {
    year: "2024/2025",
    leadership: [],
    awards: [
      "VACAPAF Brother Of The Year",
      "Eastern Region Brother Of The Year",
      "National Step Show Champions",
    ],
  },
  {
    year: "2022/2023",
    leadership: [],
    awards: [
      "VACAPAF & Eastern Region College Chapter Of The Year",
      "VACAPAF & Eastern Region College Chapter With The Highest GPA",
      "VACAPAF & Eastern Region Scholars Bowl Winner",
      "VACAPAF & Eastern Region Charles H. Wesley Award",
    ],
  },
  {
    year: "2021/2022",
    leadership: [],
    awards: [
      "VACAPAF Unconditional Service Award",
      "VACAPAF Scholars Bowl Winner",
    ],
  },
  {
    year: "2021",
    leadership: [{ role: "Whistle", name: "Ari Weems" }],
    awards: ["Norfolk State University Homecoming Stroll Of Champions"],
  },
  {
    year: "2019",
    leadership: [{ role: "Chapter President", name: "Marcus Cooper" }],
    awards: ["VACAPAF College Chapter Of The Year"],
  },
  {
    year: "2018",
    leadership: [
      { role: "Chapter President", name: "Kashaun Freeman" },
      { role: "Step Master", name: "Joshua Marshatelli" },
    ],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "Norfolk State University Homecoming Step Show Champions",
    ],
  },
  {
    year: "2014",
    leadership: [{ role: "Step Master", name: "Laron Smith" }],
    awards: [
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
      "Norfolk State University Homecoming Step Show Champions",
    ],
  },
  {
    year: "2011",
    leadership: [{ role: "Step Master", name: "Antione Hicks" }],
    awards: ["Hampden-Sydney Homecoming Step Show Champions"],
  },
  {
    year: "2010",
    leadership: [{ role: "Step Master", name: "Xavier Way" }],
    awards: [
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
    ],
  },
  {
    year: "2008",
    leadership: [{ role: "Step Master", name: "Jesus Campbell" }],
    awards: [
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
      { text: "VACAPAF Oratorical Champion", brother: "Bro. Alexander Smith-Johnson" },
      { text: "Eastern Regional Oratorical Champion", brother: "Bro. Alexander Smith-Johnson" },
      "ODU Stomp The Yard Step Show Champions",
      "University Of District Of Columbia Homecoming Step Show Champions",
      "George Mason Homecoming Step Show Champions",
    ],
  },
  {
    year: "2007",
    leadership: [
      { role: "Chapter President", name: "Kevin Hall" },
      { role: "Step Master", name: "Ryan Maull" },
    ],
    awards: [
      "VACAPAF College Chapter Of The Year",
      { text: "VACAPAF College Brother Of The Year", brother: "Bro. Jelaun Newsome" },
      "Eastern Regional College Chapter Of The Year",
      { text: "Regional College Brother Of The Year", brother: "Bro. Jelaun Newsome" },
      "National College Chapter Of The Year",
      { text: "National College Brother Of The Year", brother: "Bro. Jelaun Newsome" },
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
      "ODU Stomp The Yard Step Show Champions",
    ],
  },
  {
    year: "2006",
    leadership: [
      { role: "Chapter President", name: "Brandon Jackson" },
      { role: "Step Master", name: "Robert Looper III" },
    ],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "Centennial College Chapter Of The Year",
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
      "Norfolk State University Homecoming Step Show Champions",
      "Centennial Step Show Champions",
      "Step Correct Step Show Champions",
    ],
  },
  {
    year: "2005",
    leadership: [{ role: "Step Master", name: "Robert Looper" }],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
      "Norfolk State University Homecoming Step Show Champions",
    ],
  },
  {
    year: "2004",
    leadership: [{ role: "Step Master", name: "Robert Looper III" }],
    awards: [
      "VACAPAF Step Show Champions",
      "Eastern Regional Step Show Champions",
      "Norfolk State University Homecoming Step Show Champions",
    ],
  },
  {
    year: "2002",
    leadership: [{ role: "Step Master", name: "Tony Davenport" }],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "Norfolk State University Homecoming Step Show Champions",
    ],
  },
  {
    year: "2001",
    leadership: [{ role: "Step Master", name: "Tony Davenport" }],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "National College Chapter Of The Year",
      "Norfolk State University Homecoming Step Show Champions",
    ],
  },
  {
    year: "2000",
    leadership: [],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "National GPA Award Recipients",
      "National College Chapter Of The Year",
    ],
  },
  {
    year: "1999",
    leadership: [],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
      "National Scholars Bowl Champion",
    ],
  },
  {
    year: "1998",
    leadership: [],
    awards: [
      "VACAPAF College Chapter Of The Year",
      "Eastern Regional College Chapter Of The Year",
    ],
  },
];

function renderAchievements() {
  const container = document.getElementById("achievements-timeline");
  if (!container) return;
  container.innerHTML = achievementsData
    .map((entry) => {
      const leadershipHtml = entry.leadership && entry.leadership.length
        ? `<div class="achievement-leadership">${entry.leadership
            .map((l) => `<div class="achievement-leader"><span class="achievement-leader-role">${l.role}:</span> <span class="achievement-leader-name">${l.name}</span></div>`)
            .join("")}</div>`
        : "";
      const awardsHtml = entry.awards
        .map((award) => {
          if (typeof award === "string") {
            return `<li class="achievement-item">${award}</li>`;
          }
          return `<li class="achievement-item">${award.text}<span class="achievement-brother">${award.brother}</span></li>`;
        })
        .join("");
      return `
        <article class="achievement-year">
          <h4 class="achievement-year-title">${entry.year}</h4>
          ${leadershipHtml}
          <ul class="achievement-list">${awardsHtml}</ul>
        </article>
      `;
    })
    .join("");
}
renderAchievements();

// Tab switching: show only the active panel
const tabLinks = document.querySelectorAll('.main-nav [role="tab"]');
const panels = document.querySelectorAll('[data-tab-panel]');
const validTabs = Array.from(tabLinks).map((link) => link.dataset.tab);

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

function getTabFromUrl() {
  const path = window.location.pathname.replace(/^\/+|\/+$/g, '').toLowerCase();
  const hash = window.location.hash.replace(/^#/, '').toLowerCase();
  if (validTabs.includes(path)) return path;
  if (validTabs.includes(hash)) return hash;
  return 'home';
}

tabLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const tabId = link.dataset.tab;
    showTab(tabId);
    const newPath = tabId === 'home' ? '/' : `/${tabId}`;
    if (window.location.pathname !== newPath) {
      window.history.pushState({ tab: tabId }, '', newPath);
    }
  });
});

window.addEventListener('popstate', () => {
  showTab(getTabFromUrl());
});

showTab(getTabFromUrl());
