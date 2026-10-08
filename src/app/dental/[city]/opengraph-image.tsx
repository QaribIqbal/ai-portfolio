import { ogSize, renderOgCard } from "@/components/dental/og-card";
import { auLocations, getLocation } from "@/lib/au-locations";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Missed-call recovery for Australian dental clinics";

export function generateStaticParams() {
  return auLocations.map((location) => ({ city: location.slug }));
}

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const location = getLocation((await params).city);

  return renderOgCard({
    eyebrow: `Qarib Iqbal · ${location?.city ?? "Australia"}${location ? `, ${location.stateCode}` : ""}`,
    headline: `Missed-call recovery for dental clinics in ${location?.city ?? "Australia"}.`,
    sub: "Missed-call text-back and patient reactivation",
  });
}
