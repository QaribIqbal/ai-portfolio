"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  PhoneCall,
  CalendarCheck,
  MessageCircle,
  Bot,
  ArrowRight,
  Mic,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/site/button-link";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const VOICE_FEATURES = [
  {
    Icon: PhoneCall,
    title: "24/7 Call Handling",
    description: "Never miss an inbound lead — your AI agent picks up instantly, day or night.",
  },
  {
    Icon: CalendarCheck,
    title: "Live Appointment Booking",
    description: "Callers book directly into your calendar during the conversation.",
  },
  {
    Icon: Users,
    title: "Lead Qualification",
    description: "Asks the right questions, scores the lead, and routes to your team.",
  },
  {
    Icon: MessageCircle,
    title: "Natural Conversations",
    description: "Sounds human, handles objections, and adapts tone to the caller.",
  },
];

const CONVERSATION_FLOW = [
  { role: "caller", text: "Hi, I'm interested in your marketing services for my agency." },
  { role: "agent", text: "Thanks for calling! I'd love to help. Can I ask about your current team size and what channels you're running?" },
  { role: "caller", text: "We're a team of 8, mostly doing paid social and SEO." },
  { role: "agent", text: "Got it. Based on that, I'd recommend our lead follow-up automation sprint. Let me check availability — does Thursday at 2pm work for a 30-min walkthrough?" },
  { role: "caller", text: "Thursday works great." },
  { role: "agent", text: "Booked! You'll get a calendar invite and a prep checklist shortly. Talk soon!" },
];

export function VoiceAgentShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = sectionRef.current;
      if (!el) return;
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reducedMotion) return;

      const messages = gsap.utils.toArray<HTMLElement>(".voice-message", el);
      const features = gsap.utils.toArray<HTMLElement>(".voice-feature-card", el);
      const stats = gsap.utils.toArray<HTMLElement>(".voice-stat", el);

      gsap.set(messages, { opacity: 0, y: 30, scale: 0.95 });
      gsap.set(features, { opacity: 0, x: -40 });
      gsap.set(stats, { opacity: 0, y: 20 });

      // Animate conversation messages sequentially
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: el.querySelector(".voice-conversation"),
          start: "top 80%",
          once: true,
        },
      });

      messages.forEach((msg, i) => {
        tl.to(msg, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.2)",
        }, i * 0.35);
      });

      // Animate feature cards
      gsap.to(features, {
        opacity: 1,
        x: 0,
        duration: 0.7,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: el.querySelector(".voice-features-grid"),
          start: "top 85%",
          once: true,
        },
      });

      // Animate stats
      gsap.to(stats, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: el.querySelector(".voice-stats-row"),
          start: "top 88%",
          once: true,
        },
      });
    },
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="voice-showcase-section" id="voice-agents">
      <div className="shell">
        {/* Section Header */}
        <div className="voice-header">
          <div className="voice-header-badge">
            <Mic className="h-4 w-4" />
            <span>New Service</span>
          </div>
          <h2 className="voice-header-title">
            Your agency gets an AI receptionist that never sleeps.
          </h2>
          <p className="voice-header-subtitle">
            Voice agents answer calls, qualify leads, book appointments, and brief your team —
            so no opportunity slips through because someone was on another line.
          </p>
        </div>

        {/* Split Layout: Features Left, Conversation Right */}
        <div className="voice-split-layout">
          {/* Left: Features */}
          <div className="voice-features-side">
            <div className="voice-features-grid">
              {VOICE_FEATURES.map((feature) => (
                <div key={feature.title} className="voice-feature-card">
                  <div className="voice-feature-icon">
                    <feature.Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="voice-feature-title">{feature.title}</h3>
                    <p className="voice-feature-desc">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Row */}
            <div className="voice-stats-row">
              <div className="voice-stat">
                <span className="voice-stat-value">&lt;3s</span>
                <span className="voice-stat-label">Avg Pickup Time</span>
              </div>
              <div className="voice-stat">
                <span className="voice-stat-value">24/7</span>
                <span className="voice-stat-label">Availability</span>
              </div>
              <div className="voice-stat">
                <span className="voice-stat-value">85%</span>
                <span className="voice-stat-label">Calls Resolved</span>
              </div>
            </div>

            <div className="voice-cta-row">
              <ButtonLink href="/contact" trackingEvent="voice_agent_audit_click">
                Explore Voice Agent Setup
              </ButtonLink>
            </div>
          </div>

          {/* Right: Live Conversation Demo */}
          <div className="voice-conversation-side">
            <div className="voice-phone-frame">
              <div className="voice-phone-header">
                <div className="voice-phone-status">
                  <PhoneCall className="h-4 w-4 text-emerald-400" />
                  <span className="voice-phone-status-text">AI Agent — Live Call</span>
                </div>
                <div className="voice-phone-timer">
                  <Clock className="h-3.5 w-3.5" />
                  <span>02:34</span>
                </div>
              </div>
              <div className="voice-conversation">
                {CONVERSATION_FLOW.map((msg, i) => (
                  <div
                    key={i}
                    className={`voice-message voice-message-${msg.role}`}
                  >
                    {msg.role === "agent" && (
                      <div className="voice-message-avatar">
                        <Bot className="h-3.5 w-3.5" />
                      </div>
                    )}
                    <div className={`voice-message-bubble voice-bubble-${msg.role}`}>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="voice-phone-footer">
                <div className="voice-waveform">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <div key={i} className="voice-wave-bar" style={{ animationDelay: `${i * 0.08}s` }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
