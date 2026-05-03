// Canonical chapter data — mirrored from epsilon-pi-site/script.js so the
// promo and the live site stay in lockstep. Update both files together if
// the source changes.

export interface OfficerRow {
  role: string;
  name: string;
  photo: string;
}

export interface LineMember {
  num: string;
  pos: string;
  name: string;
  line: string;
  photo: string;
  major: string;
}

export interface AchievementYear {
  year: string;
  awards: string[];
}

// Source: officersData @ epsilon-pi-site/script.js (2026-2027 chapter officers).
export const officers: OfficerRow[] = [
  { role: 'Chapter President', name: 'Jahkari N. Taylor', photo: '' },
  { role: '1st Vice President', name: 'Nyles Ferguson', photo: 'nyles-ferguson.png' },
  { role: '2nd Vice President', name: 'Khamani Battiste', photo: 'khamani-battiste.png' },
  { role: 'Recording Secretary', name: 'Allan J. White', photo: '' },
  { role: 'Corresponding Secretary', name: 'Ian Thomas', photo: 'ian-thomas.png' },
  { role: 'Treasurer', name: 'Joseph Hargett', photo: 'joseph-hargett.png' },
  { role: 'Chapter Dean of Membership', name: 'Jahkael Parker', photo: '' },
  { role: 'Sergeant-At-Arms', name: 'Adarius Johnson', photo: 'adarius-johnson.png' },
  { role: 'Editor of the Sphinx', name: 'Simeon Butler', photo: 'simeon-butler.png' },
  { role: 'Historian', name: 'Brett Andrews, Jr.', photo: 'brett-andrews-jr.png' },
  { role: 'Parliamentarian', name: 'Jaleel Drummond', photo: 'jaleel-drummond.png' },
  { role: 'Chaplain', name: 'Jaylen L. Johnson', photo: 'jaylen-johnson.png' },
  { role: 'Chapter Advisor', name: 'Dr. Leon Rousen', photo: 'leon-rousen.png' },
];

// Source: lineageData["Spring 2026"] @ epsilon-pi-site/script.js.
// "The 11 Virtues of P.E.A.C.E." — Chapter Dean: Jordan Cain.
export const spring2026Line: LineMember[] = [
  { num: '1', pos: 'Ace', name: 'Adarius Johnson', line: 'K1ll Switch', photo: 'adarius-johnson.png', major: 'Exercise Science w/ focus in Kinesiotherapy' },
  { num: '2', pos: 'Deuce', name: 'Justin Claiborne', line: 'Flu Game', photo: 'justin-claiborne.png', major: 'Computer Science w/ focus in Cybersecurity' },
  { num: '3', pos: 'Tre', name: 'Brandon Richardson', line: 'Tariq St. Patrick', photo: 'brandon-richardson.png', major: 'Business Management · Minor: Psychology' },
  { num: '4', pos: 'H4rdcore', name: 'Dylan Bryant', line: 'Spike Lee', photo: 'dylan-bryant.png', major: 'Graphic Design w/ focus in Fine Arts' },
  { num: '5', pos: 'Live 5ive', name: 'Ian Thomas', line: 'Ares', photo: 'ian-thomas.png', major: 'Interdisciplinary Studies (CJ & Marketing)' },
  { num: '6', pos: 'Slick 6ix', name: 'Simeon Butler', line: 'Pain Killer', photo: 'simeon-butler.png', major: 'Mass Communications · Minor: Business' },
  { num: '7', pos: 'Jewel', name: 'Kyree Williams', line: 'Eagle Eye', photo: 'kyree-williams.png', major: 'Psychology · Minor: Business' },
  { num: '8', pos: '8Ball', name: 'Jaleel Drummond', line: 'Creed', photo: 'jaleel-drummond.png', major: 'Social Work' },
  { num: '9', pos: 'Notorious 9ine', name: 'Nyles Ferguson', line: 'Mister Terrific', photo: 'nyles-ferguson.png', major: 'Political Science' },
  { num: '10', pos: 'Dime', name: 'Brett Andrews, Jr.', line: 'Man of Steel', photo: 'brett-andrews-jr.png', major: 'Computer Engineering Technology' },
  { num: '11', pos: 'Fly E11even — Tail', name: 'Joseph Hargett', line: 'Hail Mary', photo: 'joseph-hargett.png', major: 'Business Marketing' },
];

export const lineageTerms: string[] = [
  'Spring 2026',
  'Spring 2024',
  'Spring 2023',
  'Spring 2022',
  'Fall 2021',
  'Spring 2021',
];

// Source: achievementsData @ epsilon-pi-site/script.js. Awards normalized
// to plain strings (object entries flattened to "<text> — <brother>").
export const achievements: AchievementYear[] = [
  { year: '2026', awards: ['Charles H. Wesley Award', 'Eastern Region Brother of the Year — Bro. Jaden Johnson'] },
  { year: '2024/2025', awards: ['VACAPAF Brother Of The Year', 'Eastern Region Brother Of The Year', 'National Step Show Champions'] },
  {
    year: '2022/2023',
    awards: [
      'VACAPAF & Eastern Region College Chapter Of The Year',
      'VACAPAF & Eastern Region College Chapter With The Highest GPA',
      'VACAPAF & Eastern Region Scholars Bowl Winner',
      'VACAPAF & Eastern Region Charles H. Wesley Award',
    ],
  },
  { year: '2021/2022', awards: ['VACAPAF Unconditional Service Award', 'VACAPAF Scholars Bowl Winner'] },
];

// Source: eventsCalendarData @ epsilon-pi-site/script.js.
export interface CalendarEvent {
  date: string; // YYYY-MM-DD
  category: 'event' | 'service' | 'ict';
  title: string;
  time?: string;
  location?: string;
  description?: string;
}

export const eventsCalendar: CalendarEvent[] = [
  {
    date: '2026-04-25',
    category: 'event',
    title: 'Brotherhood Cookout',
    time: '1:00 PM',
    location: 'Student Center Lawn',
    description:
      'An end-of-month fellowship gathering with music, food, and chapter updates for brothers and invited guests.',
  },
  {
    date: '2026-04-28',
    category: 'service',
    title: 'Study Hall and Mentorship Night',
    time: '6:30 PM',
    location: 'Brown Hall, Room 214',
    description:
      'An academic accountability night with upperclassmen support, planning time, and mentorship check-ins.',
  },
  {
    date: '2026-05-03',
    category: 'service',
    title: 'Community Cleanup',
    time: '9:00 AM',
    location: 'Downtown Norfolk',
  },
  {
    date: '2026-05-10',
    category: 'event',
    title: "Mother's Day Appreciation Brunch",
    time: '11:30 AM',
    location: 'Campus Dining Hall',
  },
  {
    date: '2026-05-18',
    category: 'event',
    title: 'Leadership Transition Meeting',
    time: '7:00 PM',
    location: 'Chapter Meeting Room',
  },
];

// Source: iceColdTuesdayContent @ epsilon-pi-site/script.js.
export interface IctContent {
  video: string; // path under public/
  poster: string;
  instagramUrl?: string;
  caption: string;
}

export const iceColdTuesdayContent: Record<string, IctContent> = {
  '2026-04-28': {
    video: 'assets/videos/ict-2026-04-28-cain-greaux.mp4',
    poster: 'assets/videos/ict-2026-04-28-cain-greaux-poster.jpg',
    instagramUrl: 'https://www.instagram.com/reel/DXrwc-ckSv0/',
    caption:
      "The greatest lessons in college don't come from a syllabus, they come from life. Bro. Cain & Bro. Greaux speak on what they've learned beyond the classroom as they prepare to graduate.",
  },
};

// Mirrors `isSchoolYearTuesday` in script.js — Tue, excluding June/July.
export function isSchoolYearTuesday(date: Date): boolean {
  const m = date.getMonth();
  return date.getDay() === 2 && m !== 5 && m !== 6;
}

export const charterMembers: string[] = [
  'Andrew Blackburn',
  'Vincent Blue',
  'Willie Booth',
  'William Brothers',
  'Nathaniel Bynum',
  'Berkley Chandler',
  'Eugene Davis',
  'Melvin C. Fallis, Jr.',
  'James F. Gay',
  'William Gray',
  'Zane Gray',
  'Ralph Hill',
  'James Howard',
  'Claywood Jones',
  'Winston Nottingham',
];
