"use client";

import ProfileCard from "@/components/ProfileCard";
import { siteConfig } from "@/lib/site-content";

export function ProfileCardPanel() {
  return (
    <div className="profile-premium-wrap">
      <ProfileCard
        name="Qarib Iqbal"
        title="AI Automation Specialist"
        handle="qaribiqbal92"
        status="Available for New Agency Projects"
        contactText="Book on Calendly"
        avatarUrl="/me.png"
        miniAvatarUrl="/me007.jpeg"
        iconUrl="/Ai_automation.svg"
        grainUrl="/window.svg"
        behindGradient="radial-gradient(circle at var(--pointer-x) var(--pointer-y), rgba(87,214,203,var(--card-opacity)) 0%, rgba(28,110,127,0.42) 35%, rgba(7,21,31,0) 100%), radial-gradient(40% 55% at 68% 18%, rgba(58,163,184,0.36) 0%, rgba(9,25,36,0) 100%), conic-gradient(from 140deg at 50% 50%, #53cfc4 0%, #2f92aa 40%, #1a6077 64%, #53cfc4 100%)"
        innerGradient="linear-gradient(150deg, rgba(31,85,103,0.6) 0%, rgba(20,40,57,0.22) 100%)"
        showUserInfo
        enableTilt
        enableMobileTilt
        className="w-full max-w-[335px]"
        onContactClick={() => {
          window.open(siteConfig.calendly, "_blank", "noopener,noreferrer");
        }}
      />
    </div>
  );
}
