"use client";

import { motion } from "framer-motion";
import { TICKER_ITEMS } from "@/lib/constants/palace-copy";

export function SiteTicker() {
  const track = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div className="overflow-hidden border-t border-ice-gray-800 bg-ice-black">
      <motion.div
        className="flex w-max gap-0 whitespace-nowrap py-2.5"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
      >
        {track.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="flex items-center font-condensed text-[11px] font-bold uppercase tracking-wide text-ice-white"
          >
            {item}
            <span className="mx-5 text-ice-gray-600" aria-hidden="true">
              //
            </span>
          </span>
        ))}
      </motion.div>
    </div>
  );
}
