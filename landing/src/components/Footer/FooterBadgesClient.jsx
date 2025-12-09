"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { footerConfig } from "./footerConfig";
import { socials } from "@/utils/constants";

const FooterBadgesClient = () => {
  const [isHeartHovered, setIsHeartHovered] = useState(false);
  const { achievementBadges } = footerConfig;

  return (
    <div className="flex flex-col items-center">
      {/* Achievement badges with improved display and spacing */}
      <motion.div
        className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {achievementBadges.map((badge, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full text-sm font-medium text-white/70 border border-white/5 hover:border-white/10 transition-all duration-300"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: i * 0.1 }}
            whileHover={{ y: -3, boxShadow: "0 4px 20px rgba(0,0,0,0.1)" }}
          >
            <svg
              className="w-4 h-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {badge}
          </motion.div>
        ))}
      </motion.div>

      {/* Attribution section with enhanced styling */}
      <div className="mt-10 text-center">
        <Link href={socials.twitter} target="_blank" rel="noopener noreferrer">
          <motion.p
            className="text-sm text-white/60 items-center justify-center inline-flex hover:text-white/80 px-4 py-2 rounded-full bg-white/5 hover:bg-white/8 transition-all duration-300"
            whileHover={{ scale: 1.03 }}
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
          >
            <span>Made with</span>
            <motion.span
              className="mx-2 transform"
              animate={isHeartHovered ? { scale: [1, 1.2, 1] } : {}}
              transition={{
                duration: 0.5,
                repeat: isHeartHovered ? Infinity : 0,
              }}
            >
              <svg
                className={`w-5 h-5 ${
                  isHeartHovered ? "text-red-500" : "text-white/60"
                }`}
                viewBox="0 0 24 24"
                fill={isHeartHovered ? "currentColor" : "none"}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
                />
              </svg>
            </motion.span>
            <span className="hover:text-white"> by </span>
            <Link
              href="https://x.com/jorjishasan_"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className="underline text-white ml-1 hover:text-primary transition-colors">
                this guy
              </span>
            </Link>
          </motion.p>
        </Link>
      </div>
    </div>
  );
};

export default FooterBadgesClient;
