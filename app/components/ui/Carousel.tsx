// components/ui/Carousel.tsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

// Type definition for the state setter function in TypeScript
type SetIndexType = (i: number | ((i: number) => number)) => void;

interface CarouselProps {
    images: string[];
    index?: number;
    setIndex?: SetIndexType;
}

export default function Carousel({ images, index: externalIndex, setIndex: setExternalIndex }: CarouselProps) {
  // Use external state if provided, otherwise use internal state
  const [internalIndex, setInternalIndex] = useState(0);
  const index = externalIndex !== undefined ? externalIndex : internalIndex;
  
  // Use the external setter if provided, otherwise use the internal setter
  const setIndex: SetIndexType = setExternalIndex || setInternalIndex;

  useEffect(() => {
    // Auto-play interval logic
    const t = window.setInterval(() => {
        setIndex((i) => (i + 1) % images.length)
    }, 4500);
    return () => clearInterval(t);
  }, [images.length, setIndex]);


  return (
    <div className="relative rounded-xl overflow-hidden border border-white/6 shadow-lg">
      <div className="h-64 md:h-[400px] relative"> 
        <Image src={images[index]} alt={`slide-${index}`} fill style={{ objectFit: "cover" }} />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-4 left-4 text-white/90">
          <div className="text-xl font-oswald text-[#E6E6E6]">IronCore Experience</div>
          <div className="text-sm text-[#F5E6B3] font-roboto">Facilities & results</div>
        </div>
      </div>

      {/* dots */}
      <div className="absolute bottom-3 right-4 flex gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            // Use the non-functional update form for user clicks
            onClick={() => setIndex(i)} 
            aria-label={`Go to slide ${i + 1}`}
            className={`w-2 h-2 rounded-full ${i === index ? "bg-[#F5E6B3]" : "bg-white/30"}`}
          />
        ))}
      </div>
    </div>
  );
}