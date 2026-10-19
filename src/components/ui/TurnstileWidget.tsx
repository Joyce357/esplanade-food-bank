"use client";

import React, { useEffect, useRef } from "react";

interface TurnstileWidgetProps {
  onVerify?: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  className?: string;
}

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement | string,
        params: {
          sitekey: string;
          callback: (token: string) => void;
          "error-callback"?: () => void;
          "expired-callback"?: () => void;
          theme?: "light" | "dark" | "auto";
        }
      ) => string;
      reset: (widgetId: string) => void;
    };
    onTurnstileLoaded?: () => void;
  }
}

export default function TurnstileWidget({
  onVerify,
  onError,
  onExpire,
  className = "",
}: TurnstileWidgetProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

  useEffect(() => {
    // If no Turnstile site key is configured, pass an empty token for preview mode
    if (!siteKey || siteKey === "test_turnstile_site_key") {
      onVerify?.("preview_turnstile_token");
      return;
    }

    if (!containerRef.current) return;

    // Load Turnstile script if not present
    const SCRIPT_ID = "cf-turnstile-script";
    let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement;

    const renderWidget = () => {
      if (window.turnstile && containerRef.current && !widgetIdRef.current) {
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteKey,
          callback: (token: string) => onVerify?.(token),
          "error-callback": () => onError?.(),
          "expired-callback": () => onExpire?.(),
          theme: "auto",
        });
      }
    };

    if (!script) {
      script = document.createElement("script");
      script.id = SCRIPT_ID;
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        renderWidget();
      };
      document.body.appendChild(script);
    } else if (window.turnstile) {
      renderWidget();
    }
  }, [siteKey, onVerify, onError, onExpire]);

  // When no site key is configured, render a subtle indicator during dev
  if (!siteKey || siteKey === "test_turnstile_site_key") {
    return (
      <div className="text-xs text-on-surface-variant/70 italic flex items-center gap-1.5 py-1">
        <span className="material-symbols-outlined text-sm text-secondary">verified_user</span>
        <span>Spam protection (Cloudflare Turnstile) ready for client key.</span>
      </div>
    );
  }

  return <div ref={containerRef} className={className} />;
}
