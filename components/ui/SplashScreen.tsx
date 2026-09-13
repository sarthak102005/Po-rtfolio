"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onComplete, 400);
    }, 2000);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " " || e.key === "Escape") {
        clearTimeout(timer);
        setVisible(false);
        setTimeout(onComplete, 400);
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", handleKey);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          role="status"
          aria-label="Loading Sarthak's Portfolio"
        >
          <motion.div
            className="flex flex-col items-center gap-5"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Play button icon */}
            <motion.div
              className="relative"
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                style={{
                  width: "clamp(64px, 10vw, 100px)",
                  height: "clamp(64px, 10vw, 100px)",
                  background: "#ff0033",
                  borderRadius: "22%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 60px rgba(255,0,51,0.4)",
                }}
              >
                {/* Triangle play icon */}
                <svg
                  viewBox="0 0 24 24"
                  fill="white"
                  style={{ width: "45%", height: "45%", marginLeft: "8%" }}
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </motion.div>

            {/* Wordmark */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
            >
              <div
                style={{
                  color: "#ffffff",
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 700,
                  fontSize: "clamp(22px, 4vw, 36px)",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.1,
                }}
              >
                Sarthak&apos;s Portfolio
              </div>
              <div
                style={{
                  color: "#aaaaaa",
                  fontSize: "clamp(11px, 2vw, 14px)",
                  fontWeight: 400,
                  marginTop: "6px",
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                }}
              >
                Backend · Full Stack · GenAI
              </div>
            </motion.div>
          </motion.div>

          {/* Skip button */}
          <motion.button
            onClick={() => {
              setVisible(false);
              setTimeout(onComplete, 400);
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-8 right-8 text-sm text-gray-400 hover:text-white transition-colors px-3 py-1 rounded border border-gray-700 hover:border-gray-500"
            aria-label="Skip intro"
          >
            Skip intro
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
