"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectGalleryProps {
  project: Project;
}

export default function ProjectGallery({ project }: ProjectGalleryProps) {
  const gallery = project.gallery && project.gallery.length > 0 ? project.gallery : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Restart autoplay timer
  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (gallery.length <= 1 || isHovered || isLightboxOpen) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
    }, 3500);
  }, [gallery.length, isHovered, isLightboxOpen]);

  // Autoplay effect
  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const handlePrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCurrentIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
      resetTimer();
    },
    [gallery.length, resetTimer]
  );

  const handleNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) {
        e.preventDefault();
        e.stopPropagation();
      }
      setCurrentIndex((prev) => (prev + 1) % gallery.length);
      resetTimer();
    },
    [gallery.length, resetTimer]
  );

  const openLightbox = () => {
    // Open on the EXACT currently displayed screenshot!
    setLightboxIndex(currentIndex);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    // Keep gallery at the lightbox index when closing
    setCurrentIndex(lightboxIndex);
    setIsLightboxOpen(false);
  };

  const handleLightboxPrev = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) => (prev === 0 ? gallery.length - 1 : prev - 1));
    },
    [gallery.length]
  );

  const handleLightboxNext = useCallback(
    (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      setLightboxIndex((prev) => (prev + 1) % gallery.length);
    },
    [gallery.length]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closeLightbox();
      } else if (e.key === "ArrowLeft") {
        handleLightboxPrev();
      } else if (e.key === "ArrowRight") {
        handleLightboxNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, handleLightboxPrev, handleLightboxNext]);

  return (
    <>
      {/* Large Project / Watch Page Gallery Viewer */}
      <div
        className="group relative w-full rounded-2xl overflow-hidden mb-5 bg-[#0f0f0f] select-none shadow-lg cursor-pointer"
        style={{ aspectRatio: "16/9" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={openLightbox}
        role="region"
        aria-label={`${project.name} screenshot gallery`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openLightbox();
          } else if (e.key === "ArrowLeft") {
            e.preventDefault();
            handlePrev();
          } else if (e.key === "ArrowRight") {
            e.preventDefault();
            handleNext();
          }
        }}
      >
        {/* Screenshots stack */}
        {gallery.length > 0 ? (
          gallery.map((src, idx) => {
            const isVisible = idx === currentIndex;
            return (
              <img
                key={src}
                src={src}
                alt={`${project.name} architecture and UI screenshot ${idx + 1}`}
                className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-400 ease-in-out ${
                  isVisible ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
                }`}
                loading={idx === 0 ? "eager" : "lazy"}
              />
            );
          })
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-white">
            <span className="text-6xl">{project.icon}</span>
            <span className="font-mono text-xl font-bold">{project.name}</span>
          </div>
        )}

        {/* YouTube-like controls overlay on hover */}
        <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 bg-gradient-to-t from-black/60 via-transparent to-black/40 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-200">
          {/* Top Bar: screenshot counter + maximize prompt */}
          <div className="flex items-center justify-between pointer-events-auto">
            <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-xs text-xs font-medium text-white flex items-center gap-1.5">
              <span>Screenshot</span>
              <span className="font-mono font-bold text-[#ff3b5c]">
                {currentIndex + 1}
              </span>
              <span>of</span>
              <span className="font-mono">{gallery.length}</span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                openLightbox();
              }}
              className="p-2 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors"
              aria-label="Open screenshot fullscreen"
              title="Click to view fullscreen (Esc to exit)"
            >
              <Maximize2 size={16} />
            </button>
          </div>

          {/* Left / Right Arrow Navigation (YouTube media control style) */}
          <div className="flex items-center justify-between w-full pointer-events-none">
            <button
              onClick={handlePrev}
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition-all transform -translate-x-1 group-hover:translate-x-0 shadow-md backdrop-blur-xs"
              aria-label="Previous screenshot"
              title="Previous screenshot (Left arrow)"
            >
              <ChevronLeft size={24} />
            </button>

            <button
              onClick={handleNext}
              className="pointer-events-auto w-11 h-11 rounded-full bg-black/65 hover:bg-black/85 text-white flex items-center justify-center transition-all transform translate-x-1 group-hover:translate-x-0 shadow-md backdrop-blur-xs"
              aria-label="Next screenshot"
              title="Next screenshot (Right arrow)"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Progress Bar & chapter indicator */}
          <div className="flex items-center gap-3 pointer-events-auto">
            <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden flex gap-0.5">
              {gallery.map((_, i) => (
                <div
                  key={i}
                  className={`h-full flex-1 transition-all duration-300 ${
                    i === currentIndex
                      ? "bg-[#ff0033]"
                      : i < currentIndex
                      ? "bg-white/70"
                      : "bg-transparent"
                  }`}
                />
              ))}
            </div>
            <span className="text-[11px] font-mono text-white/90">
              {isHovered ? "Paused" : "Autoplay"}
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================== */}
      {/* 3E. FULLSCREEN IMAGE VIEWER / LIGHTBOX */}
      {/* ========================================================== */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-[9999] bg-black/92 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6 select-none animate-in fade-in duration-200"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`${project.name} screenshot ${lightboxIndex + 1} of ${gallery.length}`}
        >
          {/* Header row: Project title, counter, close button */}
          <div
            className="w-full max-w-7xl flex items-center justify-between text-white z-20 py-2"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold truncate max-w-md hidden sm:inline">
                {project.name}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-white/10 text-xs font-mono">
                {lightboxIndex + 1} / {gallery.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-white/60 hidden sm:inline">
                Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono">Esc</kbd> to close · <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono">←</kbd> <kbd className="px-1.5 py-0.5 bg-white/10 rounded font-mono">→</kbd> to navigate
              </span>
              <button
                onClick={closeLightbox}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors ml-4"
                aria-label="Close fullscreen viewer"
              >
                <X size={22} />
              </button>
            </div>
          </div>

          {/* Centered Image with side navigation */}
          <div
            className="relative flex-1 w-full max-w-7xl flex items-center justify-center overflow-hidden my-2"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Prev Button */}
            <button
              onClick={handleLightboxPrev}
              className="absolute left-2 sm:left-4 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-105 border border-white/10 backdrop-blur-xs"
              aria-label="Previous screenshot"
              title="Previous (Left Arrow)"
            >
              <ChevronLeft size={28} />
            </button>

            {/* High-res Image (Preserves aspect ratio, fits viewport) */}
            <img
              src={gallery[lightboxIndex]}
              alt={`${project.name} screenshot ${lightboxIndex + 1}`}
              className="max-h-[82vh] max-w-[92vw] w-auto h-auto object-contain rounded-lg shadow-2xl transition-all duration-200"
            />

            {/* Next Button */}
            <button
              onClick={handleLightboxNext}
              className="absolute right-2 sm:right-4 z-30 w-12 h-12 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-transform hover:scale-105 border border-white/10 backdrop-blur-xs"
              aria-label="Next screenshot"
              title="Next (Right Arrow)"
            >
              <ChevronRight size={28} />
            </button>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div
            className="w-full max-w-4xl flex items-center justify-center gap-2 overflow-x-auto py-2 z-20"
            onClick={(e) => e.stopPropagation()}
          >
            {gallery.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightboxIndex(i)}
                className={`relative w-14 h-9 rounded-md overflow-hidden flex-shrink-0 transition-all ${
                  i === lightboxIndex
                    ? "ring-2 ring-[#ff0033] scale-105 opacity-100"
                    : "opacity-40 hover:opacity-80"
                }`}
                aria-label={`View screenshot ${i + 1}`}
              >
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
