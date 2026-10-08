export type TimeZoneInfo = {
  name: string;
  abbreviation: string;
  daylightSaving: boolean;
};

export type AuLocation = {
  slug: string;
  city: string;
  state: string;
  stateCode: string;
  timeZone: TimeZoneInfo;
};

const AEST_DST: TimeZoneInfo = { name: "Australian Eastern Time", abbreviation: "AEST/AEDT", daylightSaving: true };
const AEST: TimeZoneInfo = { name: "Australian Eastern Standard Time", abbreviation: "AEST", daylightSaving: false };
const ACST_DST: TimeZoneInfo = { name: "Australian Central Time", abbreviation: "ACST/ACDT", daylightSaving: true };
const ACST: TimeZoneInfo = { name: "Australian Central Standard Time", abbreviation: "ACST", daylightSaving: false };
const AWST: TimeZoneInfo = { name: "Australian Western Standard Time", abbreviation: "AWST", daylightSaving: false };

export const auLocations: AuLocation[] = [
  { slug: "sydney", city: "Sydney", state: "New South Wales", stateCode: "NSW", timeZone: AEST_DST },
  { slug: "melbourne", city: "Melbourne", state: "Victoria", stateCode: "VIC", timeZone: AEST_DST },
  { slug: "brisbane", city: "Brisbane", state: "Queensland", stateCode: "QLD", timeZone: AEST },
  { slug: "perth", city: "Perth", state: "Western Australia", stateCode: "WA", timeZone: AWST },
  { slug: "adelaide", city: "Adelaide", state: "South Australia", stateCode: "SA", timeZone: ACST_DST },
  { slug: "gold-coast", city: "Gold Coast", state: "Queensland", stateCode: "QLD", timeZone: AEST },
  { slug: "canberra", city: "Canberra", state: "Australian Capital Territory", stateCode: "ACT", timeZone: AEST_DST },
  { slug: "newcastle", city: "Newcastle", state: "New South Wales", stateCode: "NSW", timeZone: AEST_DST },
  { slug: "hobart", city: "Hobart", state: "Tasmania", stateCode: "TAS", timeZone: AEST_DST },
  { slug: "darwin", city: "Darwin", state: "Northern Territory", stateCode: "NT", timeZone: ACST },
];

export function getLocation(slug: string) {
  return auLocations.find((location) => location.slug === slug);
}

export function describeLocalTime(location: AuLocation) {
  const { city, stateCode, timeZone } = location;

  if (timeZone.daylightSaving) {
    return `Clinics in ${city} run on ${timeZone.name} (${timeZone.abbreviation}). ${stateCode} observes daylight saving from the first Sunday in October to the first Sunday in April, so the lunch and after-hours windows are set in your clinic's local time and move with the clock change.`;
  }

  return `Clinics in ${city} run on ${timeZone.name} (${timeZone.abbreviation}) all year. ${stateCode} does not observe daylight saving, so your lunch and after-hours windows stay fixed while clinics in the south-eastern states change their clocks.`;
}

export function buildLocationFaqs(location: AuLocation) {
  const { city, state } = location;

  return [
    {
      question: `Do you work with dental clinics in ${city}?`,
      answer: `Yes. Setup is remote and runs inside your clinic's existing phone and SMS tools, so practices in ${city} and across ${state} can start with the free Missed-Call Leak Audit.`,
    },
    {
      question: `Which time zone is the after-hours text-back set to in ${city}?`,
      answer: describeLocalTime(location),
    },
    {
      question: `Is pricing different for ${city} clinics?`,
      answer:
        "No. The 31 December Reactivation Campaign is a fixed AUD 490 Australia-wide. Ongoing missed-call text-back + monthly reactivation is AUD 649/month, the founding price for the first 3 practices.",
    },
  ];
}
