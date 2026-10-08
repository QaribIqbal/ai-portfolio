import { ogSize, renderOgCard } from "@/components/dental/og-card";
import { dentalGuides, getGuide } from "@/lib/dental-guides";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Guide for Australian dental practice owners";

export function generateStaticParams() {
  return dentalGuides.map((guide) => ({ slug: guide.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const guide = getGuide((await params).slug);

  return renderOgCard({
    eyebrow: "Qarib Iqbal · Guide",
    headline: guide?.title ?? "Guides for Australian dental practice owners",
    sub: "For Australian dental clinics",
  });
}
