"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ArchiveTimelineProps {
  entryCount: number;
}

export function ArchiveTimeline({ entryCount }: ArchiveTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const height = Math.max(entryCount * 420, 600);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute left-4 top-0 hidden h-full md:left-1/2 md:block md:-translate-x-1/2"
      aria-hidden="true"
    >
      <svg
        width="2"
        height={height}
        viewBox={`0 0 2 ${height}`}
        className="h-full overflow-visible"
        preserveAspectRatio="none"
      >
        <motion.path
          d={`M 1 0 V ${height}`}
          fill="none"
          stroke="rgba(245,245,245,0.15)"
          strokeWidth="1"
          style={{ pathLength }}
        />
      </svg>
    </div>
  );
}
