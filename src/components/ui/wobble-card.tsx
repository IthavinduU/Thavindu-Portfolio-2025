"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface WobbleCardProps {
  containerClassName?: string;
  children?: React.ReactNode;
  className?: string;
}

export function WobbleCard({
  containerClassName,
  children,
  className,
}: WobbleCardProps) {
  const [mousePosition, setMousePosition] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  const handleMove = (xPos: number, yPos: number, rect: DOMRect) => {
    const x = (xPos - rect.left) / rect.width - 0.5;
    const y = (yPos - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    handleMove(
      touch.clientX,
      touch.clientY,
      e.currentTarget.getBoundingClientRect()
    );
    setIsHovering(true);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onTouchEnd={() => {
        setIsHovering(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      className={cn(
        "relative overflow-hidden rounded-2xl p-4 will-change-transform",
        containerClassName
      )}
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
    >
      <motion.div
        className={cn("relative z-10 flex h-full w-full flex-col", className)}
        animate={{
          rotateX: isHovering ? mousePosition.y * 6 : 0,
          rotateY: isHovering ? mousePosition.x * 6 : 0,
          scale: isHovering ? 1.015 : 1,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 18 }}
      >
        {children}
      </motion.div>
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-teal-500/20 to-blue-500/20"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.div>
  );
}
