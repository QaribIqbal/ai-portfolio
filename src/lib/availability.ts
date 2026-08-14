const BUSINESS_TIME_ZONE = "Asia/Karachi";

export function getCurrentMonth(date = new Date()) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    timeZone: BUSINESS_TIME_ZONE,
  }).format(date);
}

export function buildAvailabilityCopy(capacity: number, date = new Date()) {
  const clientLabel = capacity === 1 ? "client" : "clients";
  return `Accepting ${capacity} sprint ${clientLabel} in ${getCurrentMonth(date)}.`;
}
