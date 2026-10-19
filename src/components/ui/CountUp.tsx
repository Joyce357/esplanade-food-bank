"use client";

import React, { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string;
  duration?: number; // duration in ms, default 1800
  className?: string;
}

export default function CountUp({
  value,
  duration = 1800,
  className = "",
}: CountUpProps) {
  const [displayValue, setDisplayValue] = useState<string>(value);
  const elementRef = useRef<HTMLSpanElement>(null);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setDisplayValue(value);
      return;
    }

    // Parse the value to find numeric parts
    // Examples: "3,490,000+", "154,000+", "10%", "$50", "2025"
    const match = value.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);

    if (!match) {
      // If it's a non-numeric string (e.g. "1 in 10" or "[Pending]"), display as-is
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const rawNumberStr = match[2].replace(/,/g, "");
    const suffix = match[3] || "";
    const targetNumber = parseFloat(rawNumberStr);

    if (isNaN(targetNumber)) {
      setDisplayValue(value);
      return;
    }

    const isInteger = !rawNumberStr.includes(".");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimatedRef.current) {
            hasAnimatedRef.current = true;
            observer.disconnect();

            const startTime = performance.now();

            const animate = (currentTime: number) => {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);

              // Ease-out cubic: 1 - (1 - progress)^3
              const easeOut = 1 - Math.pow(1 - progress, 3);
              const currentNumber = targetNumber * easeOut;

              const formattedNumber = isInteger
                ? Math.round(currentNumber).toLocaleString("en-US")
                : currentNumber.toLocaleString("en-US", {
                    minimumFractionDigits: 1,
                    maximumFractionDigits: 1,
                  });

              setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setDisplayValue(value); // ensure exact target formatting at end
              }
            };

            requestAnimationFrame(animate);
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [value, duration]);

  return (
    <span ref={elementRef} className={className}>
      {displayValue}
    </span>
  );
}
