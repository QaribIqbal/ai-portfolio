import { ogSize, renderOgCard } from "@/components/dental/og-card";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Guides for Australian dental practice owners";

export default function Image() {
  return renderOgCard({
    eyebrow: "Qarib Iqbal · Guides",
    headline: "Guides for Australian dental practice owners.",
    sub: "Missed calls, the extras reset and SMS rules",
  });
}
