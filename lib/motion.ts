// lib/motion.ts
export const fadeIn = (direction: string = "up", delay: number = 0) => {
  const variants = {
    hidden: {
      y: direction === "up" ? 40 : direction === "down" ? -40 : 0,
      opacity: 0,
    },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.8,
        delay,
      },
    },
  };
  return variants;
};
