"use client";

import Link from "next/link";
import type { AnchorHTMLAttributes, CSSProperties } from "react";

import { trackEvent } from "@/lib/analytics";
import { captureCurrentUtmParams } from "@/lib/utm";
import { cn } from "@/lib/utils";

type ButtonLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> & {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
  trackingEvent?: string;
  trackingProps?: Record<string, string | number | boolean | undefined>;
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  external = false,
  trackingEvent,
  trackingProps,
  style: incomingStyle,
  ...props
}: ButtonLinkProps) {
  const isExternal = external || /^https?:\/\//.test(href);

  const style =
    variant === "primary"
      ? ({
          "--button-bg": "var(--accent)",
          "--button-border": "var(--accent)",
          "--button-fg": "var(--bg-strong)",
          "--button-shadow":
            "0 18px 32px -26px color-mix(in oklch, var(--accent) 78%, transparent)",
        } as CSSProperties)
      : variant === "secondary"
        ? ({
            "--button-bg": "var(--panel-soft)",
            "--button-border": "var(--line-strong)",
            "--button-fg": "var(--text-main)",
          } as CSSProperties)
        : ({
            "--button-bg": "transparent",
            "--button-border": "transparent",
            "--button-fg": "var(--text-muted)",
          } as CSSProperties);

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noreferrer noopener" : undefined}
      style={{ ...style, ...incomingStyle }}
      {...props}
      onClick={(event) => {
        props.onClick?.(event);
        captureCurrentUtmParams();

        if (trackingEvent) {
          trackEvent(trackingEvent, trackingProps);
        }

        if (href.includes("calendly.com")) {
          trackEvent("calendly_click", { source: trackingEvent ?? "button_link" });
        }

        if (href.includes("linkedin.com")) {
          trackEvent("linkedin_click", { source: trackingEvent ?? "button_link" });
        }
      }}
      className={cn(
        "button-link",
        variant === "primary" && "button-link-primary",
        variant === "secondary" && "button-link-secondary",
        variant === "ghost" && "button-link-ghost",
        className,
      )}
    >
      <span>{children}</span>
    </Link>
  );
}
