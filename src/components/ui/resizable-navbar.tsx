"use client";
import React, { useRef, useState, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X } from "lucide-react";

// Utility function for class name concatenation
const cn = (...classes) => {
  return classes.filter(Boolean).join(" ");
};

// Interface definitions (converted to PropTypes for runtime checking if needed)
interface NavbarProps {
  children: React.ReactNode;
  className?: string;
}

interface NavBodyProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface NavItemsProps {
  items: {
    name: string;
    link: string;
  }[];
  className?: string;
  onItemClick?: () => void;
  renderItem?: (item: { name: string; link: string }) => React.ReactNode;
}

interface MobileNavProps {
  children: React.ReactNode;
  className?: string;
  visible?: boolean;
}

interface MobileNavHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface MobileNavMenuProps {
  children: React.ReactNode;
  className?: string;
  isOpen: boolean;
  onClose: () => void;
}

interface MobileNavToggleProps {
  isOpen: boolean;
  onClick: () => void;
  "aria-label"?: string;
}

interface NavbarButtonProps {
  href?: string;
  as?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "secondary" | "dark" | "gradient";
  onClick?: (e: React.MouseEvent) => void;
  "aria-label"?: string;
}

export const Navbar = ({ children, className }: NavbarProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const [visible, setVisible] = useState<boolean>(false);

  const handleScrollChange = useCallback((latest: number) => {
    setVisible(latest > 100);
  }, []);

  useMotionValueEvent(scrollY, "change", handleScrollChange);

  return (
    <motion.div
      ref={ref}
      className={cn("fixed inset-x-0 top-0 z-40 w-full", className)}
    >
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(
              child as React.ReactElement<{ visible?: boolean }>,
              { visible }
            )
          : child
      )}
    </motion.div>
  );
};

export const NavBody = ({
  children,
  className,
  visible = false,
}: NavBodyProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "min(90%, 1200px)" : "100%",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      style={{
        minWidth: "320px", // More reasonable minimum width
      }}
      className={cn(
        "relative z-[60] mx-auto hidden w-full max-w-7xl flex-row items-center justify-between self-start rounded-full bg-transparent px-4 py-2 lg:flex",
        visible && "bg-white/80 dark:bg-slate-900/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const NavItems = ({
  items,
  className,
  onItemClick,
  renderItem,
}: NavItemsProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  const handleMouseLeave = useCallback(() => setHovered(null), []);
  const handleMouseEnter = useCallback((idx: number) => setHovered(idx), []);

  if (renderItem) {
    return (
      <motion.div
        className={cn(
          "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium lg:flex lg:space-x-2",
          className
        )}
      >
        {items.map((item) => renderItem(item))}
      </motion.div>
    );
  }

  return (
    <motion.div
      onMouseLeave={handleMouseLeave}
      className={cn(
        "absolute inset-0 hidden flex-1 flex-row items-center justify-center space-x-2 text-sm font-medium text-zinc-600 transition duration-200 hover:text-zinc-800 lg:flex lg:space-x-2",
        className
      )}
    >
      {items.map((item, idx) => (
        <a
          onMouseEnter={() => handleMouseEnter(idx)}
          onClick={onItemClick}
          className="relative px-4 py-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
          key={`link-${idx}`}
          href={item.link}
        >
          {hovered === idx && (
            <motion.div
              layoutId="hovered"
              className="absolute inset-0 h-full w-full rounded-full bg-gray-100 dark:bg-slate-800"
              transition={{ duration: 0.2 }}
            />
          )}
          <span className="relative z-20">{item.name}</span>
        </a>
      ))}
    </motion.div>
  );
};

export const MobileNav = ({
  children,
  className,
  visible = false,
}: MobileNavProps) => {
  return (
    <motion.div
      animate={{
        backdropFilter: visible ? "blur(10px)" : "none",
        boxShadow: visible
          ? "0 0 24px rgba(34, 42, 53, 0.06), 0 1px 1px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(34, 42, 53, 0.04), 0 0 4px rgba(34, 42, 53, 0.08), 0 16px 68px rgba(47, 48, 55, 0.05), 0 1px 0 rgba(255, 255, 255, 0.1) inset"
          : "none",
        width: visible ? "95%" : "100%",
        paddingRight: visible ? "12px" : "0px",
        paddingLeft: visible ? "12px" : "0px",
        borderRadius: visible ? "12px" : "0px",
        y: visible ? 12 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 50,
      }}
      className={cn(
        "relative z-50 mx-auto flex w-full max-w-[calc(100vw-1rem)] flex-col items-center justify-between bg-transparent px-2 py-2 lg:hidden",
        visible && "bg-white/80 dark:bg-slate-900/80",
        className
      )}
    >
      {children}
    </motion.div>
  );
};

export const MobileNavHeader = ({
  children,
  className,
}: MobileNavHeaderProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-row items-center justify-between px-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export const MobileNavMenu = ({
  children,
  className,
  isOpen,
  onClose,
}: MobileNavMenuProps) => {
  // Close menu when clicking outside
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    },
    [onClose]
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleBackdropClick}
          />

          {/* Menu */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "absolute inset-x-0 top-16 z-50 flex w-full flex-col items-start justify-start gap-4 rounded-lg bg-white px-4 py-6 shadow-lg dark:bg-slate-900 mx-2",
              "shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]",
              className
            )}
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const MobileNavToggle = ({
  isOpen,
  onClick,
  "aria-label": ariaLabel,
}: MobileNavToggleProps) => {
  return (
    <button
      onClick={onClick}
      className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
      aria-label={ariaLabel || (isOpen ? "Close menu" : "Open menu")}
    >
      {isOpen ? (
        <X className="w-6 h-6 text-black dark:text-white" />
      ) : (
        <Menu className="w-6 h-6 text-black dark:text-white" />
      )}
    </button>
  );
};

export const NavbarLogo = () => {
  return (
    <a
      href="#"
      className="relative z-20 mr-4 flex items-center space-x-2 px-2 py-1 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 rounded-md"
      aria-label="Go to homepage"
    >
      <img
        src="icon.png"
        className="rounded-full object-cover"
        alt="Company logo"
        width={50}
        height={50}
        onError={(e) => {
          // Fallback if image fails to load
          e.currentTarget.style.display = "none";
        }}
      />
      <span className="font-medium text-black dark:text-white">
        {/* Add your company name here if needed */}
      </span>
    </a>
  );
};

export const NavbarButton = ({
  href,
  as: Tag = "a",
  children,
  className,
  variant = "primary",
  onClick,
  "aria-label": ariaLabel,
  ...props
}: NavbarButtonProps) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-medium relative cursor-pointer hover:-translate-y-0.5 transition-all duration-200 inline-block text-center focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2";

  const variantStyles = {
    primary:
      "bg-slate-900 dark:bg-slate-800 text-white hover:bg-slate-800 dark:hover:bg-slate-700 shadow-lg hover:shadow-xl",
    secondary:
      "bg-transparent text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500",
    dark: "bg-black text-white hover:bg-gray-800 shadow-lg hover:shadow-xl",
    gradient:
      "bg-gradient-to-r from-teal-500 to-blue-600 text-white hover:from-teal-600 hover:to-blue-700 shadow-lg hover:shadow-xl",
  };

  return (
    <Tag
      href={href || undefined}
      className={cn(baseStyles, variantStyles[variant], className)}
      onClick={onClick}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </Tag>
  );
};
