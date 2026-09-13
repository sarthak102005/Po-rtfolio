"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { topicChips } from "@/data/projects";

interface TopicChipsProps {
  selected: string;
  onSelect: (chip: string) => void;
}

export default function TopicChips({ selected, onSelect }: TopicChipsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div
      className="sticky z-20 bg-white border-b border-[#e5e5e5]"
      style={{ top: "var(--topbar-height)" }}
    >
      <div className="relative flex items-center max-w-[2560px] mx-auto">
        {/* Left fade + arrow */}
        <button
          onClick={scrollLeft}
          className="hidden sm:flex absolute left-0 z-10 items-center justify-center w-10 h-full bg-gradient-to-r from-white to-transparent flex-shrink-0"
          aria-label="Scroll chips left"
        >
          <ChevronLeft size={18} className="text-[#606060]" />
        </button>

        {/* Scrollable chip row */}
        <div
          ref={scrollRef}
          className="chips-scroll flex items-center gap-3 px-4 py-3 overflow-x-auto"
          role="tablist"
          aria-label="Topic filters"
        >
          {topicChips.map((chip) => (
            <button
              key={chip}
              onClick={() => onSelect(chip)}
              role="tab"
              aria-selected={selected === chip}
              className={`chip flex-shrink-0 ${
                selected === chip ? "chip-active" : "chip-inactive"
              }`}
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Right fade + arrow */}
        <button
          onClick={scrollRight}
          className="hidden sm:flex absolute right-0 z-10 items-center justify-center w-10 h-full bg-gradient-to-l from-white to-transparent flex-shrink-0"
          aria-label="Scroll chips right"
        >
          <ChevronRight size={18} className="text-[#606060]" />
        </button>
      </div>
    </div>
  );
}
