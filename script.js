const officerContainer = document.getElementById("officer-list");
const lineageContainer = document.getElementById("lineage-list");

const officersData = [
  { role: "President", name: "Kaion N. Hamilton, III", photo: "" },
  { role: "Vice-President", name: "Jahkari N. Taylor", photo: "" },
  { role: "Corresponding Secretary", name: "Jaylen L. Johnson", photo: "" },
  { role: "Recording Secretary", name: "Malcolm J. Warren", photo: "" },
  { role: "Treasurer", name: "Xavier J. Spindle", photo: "" },
  { role: "Chapter Dean", name: "Jordan A. Cain", photo: "" },
  { role: "Historian", name: "Jerome Sutton, III", photo: "" },
  { role: "Associate Editor of the Sphinx", name: "Keshun Nelson", photo: "" },
  { role: "Parliamentarian", name: "Khamani Battiste", photo: "" },
  { role: "Sergeant-At-Arms", name: "Allan J. White", photo: "" },
  { role: "Chapter Advisor", name: "Dr. Leon Rousen", photo: "" },
];

const lineageData = {
  "Spring 2026": {
    lineName: "TBD",
    members: [
      { position: "1/Ace", fullName: "Adarius Johnson", lineName: "K1ll Switch", photo: "" },
      { position: "2/Deuce", fullName: "Justin Claiborne", lineName: "Flu Game", photo: "" },
      { position: "3/Tre", fullName: "Brandon Richardson", lineName: "Tariq St. Patrick", photo: "" },
      { position: "4/Hardcore 4our", fullName: "Dylan Bryant", lineName: "Spike Lee", photo: "" },
      { position: "5/Live 5ive", fullName: "Ian Thomas", lineName: "Ares", photo: "" },
      { position: "6/Slick 6ix", fullName: "Simeon Butler", lineName: "Pain Killer", photo: "" },
      { position: "7/Jewel", fullName: "Kyree Williams", lineName: "Eagle Eye", photo: "" },
      { position: "8/8Ball", fullName: "Jaleel Drummond", lineName: "Creed", photo: "" },
      { position: "9/Notorios 9ine", fullName: "Nyles Ferguson", lineName: "Mister Terrific", photo: "" },
      { position: "10/Dime", fullName: "Brett Andrews Jr.", lineName: "Man of Steel", photo: "" },
      { position: "11/Tail", fullName: "Joseph Hargett", lineName: "Hail Mary", photo: "" },
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

function getPhotoMarkup(name, photo, altLabel) {
  if (photo) {
    return `<img class="person-photo" src="${photo}" alt="${altLabel}" />`;
  }
  return `<div class="person-photo" aria-hidden="true">${getInitials(name)}</div>`;
}

function renderOfficers() {
  const markup = officersData
    .map(
      (officer) => `
        <article class="person-item">
          ${getPhotoMarkup(officer.name, officer.photo, `${officer.name} headshot`)}
          <div class="person-meta">
            <span class="person-role">${officer.role}</span>
            <span class="person-name">${officer.name}</span>
          </div>
        </article>
      `,
    )
    .join("");

  officerContainer.innerHTML = markup;
}

function buildLineageTerms() {
  const terms = [];
  for (let year = 2026; year >= 2007; year -= 1) {
    if (year === 2026) {
      terms.push({ season: "Spring", year });
      continue;
    }
    terms.push({ season: "Fall", year });
    terms.push({ season: "Spring", year });
  }
  terms.push({ season: "Fall", year: 2007 });
  return terms;
}

function renderLineage() {
  const terms = buildLineageTerms();

  const fragment = document.createDocumentFragment();
  terms.forEach((term) => {
    const termKey = `${term.season} ${term.year}`;
    const details = lineageData[termKey];
    const item = document.createElement("article");
    item.className = "lineage-item";

    if (details) {
      const roster = details.members
        .map(
          (member) =>
            `
              <li class="person-item">
                ${getPhotoMarkup(member.fullName, member.photo, `${member.fullName} headshot`)}
                <div class="person-meta">
                  <span class="person-role">${member.position}</span>
                  <span class="person-name">${member.fullName} <span class="line-name">"${member.lineName}"</span></span>
                </div>
              </li>
            `,
        )
        .join("");

      item.innerHTML = `
        <h3>${termKey}</h3>
        <p>Line Name: ${details.lineName} | Number of Brothers: ${details.members.length}</p>
        <ul class="lineage-roster">${roster}</ul>
      `;
    } else {
      item.innerHTML = `
        <h3>${termKey}</h3>
        <p>Line Name: TBD | Number of Brothers: TBD</p>
      `;
    }

    fragment.appendChild(item);
  });

  lineageContainer.replaceChildren(fragment);
}

renderOfficers();
renderLineage();
