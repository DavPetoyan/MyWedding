"use client";

import { useEffect, useRef, useState } from "react";

interface ScratchCoinProps {
  number: string;
  image: string;
}

export default function ScratchCoin({
  number,
  image,
}: ScratchCoinProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = image;

    img.onload = () => {
      canvas.width = 100;
      canvas.height = 100;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
  }, [image]);

  const erase = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.globalCompositeOperation = "destination-out";

    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalCompositeOperation = "source-over";
  };

  const getPosition = (
    e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
  ) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();

    if ("touches" in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  };

  return (
    <div className="relative w-25 h-25 select-none">

      <div className="absolute inset-0 flex items-center justify-center">
        <p className="font-signature text-[59px] text-[#5C2018]">
          {number}
        </p>
      </div>


      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full touch-none cursor-pointer"
        onMouseDown={() => setIsDrawing(true)}
        onMouseUp={() => setIsDrawing(false)}
        onMouseLeave={() => setIsDrawing(false)}
        onMouseMove={(e) => {
          if (!isDrawing) return;
          const pos = getPosition(e);
          erase(pos.x, pos.y);
        }}
        onTouchStart={() => setIsDrawing(true)}
        onTouchEnd={() => setIsDrawing(false)}
        onTouchMove={(e) => {
          e.preventDefault();
          if (!isDrawing) return;

          const pos = getPosition(e);
          erase(pos.x, pos.y);
        }}
      />
    </div>
  );
}