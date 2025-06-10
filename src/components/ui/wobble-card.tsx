"use client";

import React, { useCallback, useMemo } from "react";
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

  // Optimized move handler with throttling
  const handleMove = useCallback(
    (xPos: number, yPos: number, rect: DOMRect) => {
      const x = (xPos - rect.left) / rect.width - 0.5;
      const y = (yPos - rect.top) / rect.height - 0.5;

      // Throttle updates for better performance
      setMousePosition((prev) => {
        if (Math.abs(prev.x - x) < 0.01 && Math.abs(prev.y - y) < 0.01) {
          return prev;
        }
        return { x, y };
      });
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      handleMove(e.clientX, e.clientY, e.currentTarget.getBoundingClientRect());
    },
    [handleMove]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      const touch = e.touches[0];
      handleMove(
        touch.clientX,
        touch.clientY,
        e.currentTarget.getBoundingClientRect()
      );
      setIsHovering(true);
    },
    [handleMove]
  );

  const handleMouseEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  const handleTouchEnd = useCallback(() => {
    setIsHovering(false);
    setMousePosition({ x: 0, y: 0 });
  }, []);

  // Memoized animation values
  const animationProps = useMemo(
    () => ({
      rotateX: isHovering ? mousePosition.y * 3 : 0, // Reduced rotation for smoother animation
      rotateY: isHovering ? mousePosition.x * 3 : 0,
      scale: isHovering ? 1.01 : 1, // Reduced scale for subtlety
    }),
    [isHovering, mousePosition]
  );

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleTouchEnd}
      className={cn(
        "relative overflow-hidden rounded-2xl will-change-transform",
        containerClassName
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        backfaceVisibility: "hidden", // Optimize for 3D transforms
      }}
    >
      <motion.div
        className={cn("relative z-10 flex h-full w-full flex-col", className)}
        animate={animationProps}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          mass: 0.8, // Lighter mass for quicker response
        }}
      >
        {children}
      </motion.div>

      {/* Simplified gradient overlay */}
      <motion.div
        className="absolute inset-0 z-0 bg-gradient-to-br from-teal-400/10 to-blue-400/10 pointer-events-none"
        animate={{
          opacity: isHovering ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      />
    </motion.div>
  );
}
