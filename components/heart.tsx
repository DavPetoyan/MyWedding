"use client";


import { useEffect, useRef } from "react";
import {
  useScroll,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";

export default function Timeline() {
  const pathRef = useRef<SVGPathElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 40, 
    damping: 20, 
    mass: 1,
  });

  useEffect(() => {
    if (!pathRef.current || !heartRef.current) return;

    const point = pathRef.current.getPointAtLength(0);

    heartRef.current.style.transform = `translate(${point.x - 12}px, ${
      point.y - 12
    }px)`;
  }, []);

  useMotionValueEvent(smoothProgress, "change", (progress) => {
    if (!pathRef.current || !heartRef.current) return;

    const path = pathRef.current;
    const length = path.getTotalLength();

    const point = path.getPointAtLength(length * progress);

    heartRef.current.style.transform = `translate(${point.x - 12}px, ${
      point.y - 12
    }px)`;
  });

  return (
    <div
      ref={containerRef}
      className="relative mx-auto w-[300px] h-[700px]"
    >
      <svg
        viewBox="0 0 300 700"
        className="absolute inset-0 w-full h-full"
      >
        <path
          ref={pathRef}
          d="M150 20 C220 120 80 180 170 280 S260 420 140 520 S80 650 170 690"
          fill="none"
          stroke="#999"
          strokeWidth="2"
          strokeDasharray="6 6"
        />
      </svg>

      <div
        ref={heartRef}
        className="absolute text-xl pointer-events-none"
      >
        ❤️
      </div>
    </div>
  );
}