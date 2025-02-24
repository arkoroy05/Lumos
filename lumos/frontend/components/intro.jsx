import React from "react";
import { Tomorrow } from "next/font/google";

import { cn } from "@/lib/utils";

const tomorrow = Tomorrow({
  subsets: ["latin"],
  weight: ["800", "900"],
  variable: "--font-tomorrow",
});

export default function GlitchText({
  text = "1000 Stars",
  className,
  starCount = 50,
}) {
  return (
    <div className="relative flex items-center justify-center overflow-hidden">
      <div className="relative flex flex-col items-center justify-center ">
        {[...Array(starCount)].map((_, i) => (
          <div
            key={i}
            className="star absolute aspect-square animate-[twinkle_5s_infinite] rounded-full bg-[#fafafa] opacity-70"
            style={{
              width: `${Math.random() * 4}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 1}s`,
            }}
          />
        ))}
        <h1
          className={cn(
            "glitch-text z-10 animate-[glitch_4s_infinite] p-6 text-4xl font-black md:p-12 md:text-6xl",
            className,
            tomorrow.className,
          )}
          aria-label={text}
        >
          {text}
        </h1>
      </div>
    </div>
  );
}
