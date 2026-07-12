"use client";

import { useEffect, useRef, useState } from "react";
import { TICKER_ITEMS } from "@/lib/constants/palace-copy";

const SCROLL_SPEED = 48;

function TickerSegment({
  id,
  segmentRef,
  ariaHidden = false,
}: {
  id: number;
  segmentRef?: React.RefObject<HTMLDivElement | null>;
  ariaHidden?: boolean;
}) {
  return (
    <div
      ref={segmentRef}
      className="flex shrink-0 flex-nowrap items-center whitespace-nowrap"
      aria-hidden={ariaHidden || undefined}
    >
      {TICKER_ITEMS.map((item) => (
        <span
          key={`${id}-${item}`}
          className="flex shrink-0 items-center font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-white"
        >
          {item}
          <span className="mx-5 shrink-0 text-ice-gray-600" aria-hidden="true">
            //
          </span>
        </span>
      ))}
    </div>
  );
}

export function SiteTicker({ glass = false }: { glass?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const segmentRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const [segmentWidth, setSegmentWidth] = useState(0);
  const [copyCount, setCopyCount] = useState(3);

  useEffect(() => {
    const measure = () => {
      const node = segmentRef.current;
      if (!node) return;

      const width = node.getBoundingClientRect().width;
      if (width <= 0) return;

      setSegmentWidth(width);
      setCopyCount(Math.max(3, Math.ceil(window.innerWidth / width) + 2));
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (segmentRef.current) observer.observe(segmentRef.current);

    window.addEventListener("resize", measure);
    document.fonts?.ready.then(measure);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  useEffect(() => {
    if (segmentWidth <= 0) return;

    let frame = 0;
    let lastTime = performance.now();

    const tick = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      offsetRef.current += SCROLL_SPEED * delta;
      if (offsetRef.current >= segmentWidth) {
        offsetRef.current -= segmentWidth;
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [segmentWidth]);

  return (
    <div
      className={`w-full overflow-hidden border-t ${
        glass
          ? "border-white/10 bg-black/35 backdrop-blur-md"
          : "border-ice-gray-800 bg-ice-black"
      }`}
    >
      <div
        ref={trackRef}
        className="flex w-max flex-nowrap py-2.5 will-change-transform"
      >
        {Array.from({ length: copyCount }, (_, index) => (
          <TickerSegment
            key={index}
            id={index + 1}
            segmentRef={index === 0 ? segmentRef : undefined}
            ariaHidden={index > 0}
          />
        ))}
      </div>
    </div>
  );
}
