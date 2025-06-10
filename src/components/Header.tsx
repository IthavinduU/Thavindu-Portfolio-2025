import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  MobileNavHeader,
  MobileNavMenu,
  MobileNavToggle,
  NavbarLogo,
} from "./ui/resizable-navbar";
import { motion } from "framer-motion";

// Smooth scroll utility
const smoothScrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Header({ onArticlesClick, onRoadMapClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [isClient, setIsClient] = useState(false);

  const navItems = useMemo(
    () => [
      { name: "Home", link: "#home" },
      { name: "About", link: "#about" },
      { name: "Projects", link: "#projects" },
      { name: "Road Map", link: "#roadmap" },
      { name: "Services", link: "#services" },
      { name: "Articles", link: "#articles" },
      { name: "Contact", link: "#contact" },
    ],
    []
  );

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const handleNavClick = useCallback(
    (e, item) => {
      e.preventDefault();
      if (item.name === "Articles") onArticlesClick?.();
      else if (item.name === "Road Map") onRoadMapClick?.();
      else smoothScrollToElement(item.link);
    },
    [onArticlesClick, onRoadMapClick]
  );

  const handleMobileNavClick = useCallback(
    (e, item) => {
      e.preventDefault();
      setIsMenuOpen(false);
      if (item.name === "Articles") onArticlesClick?.();
      else if (item.name === "Road Map") onRoadMapClick?.();
      else smoothScrollToElement(item.link);
    },
    [onArticlesClick, onRoadMapClick]
  );

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Shrink effect on scroll
  useEffect(() => {
    if (!isClient) return;

    const onScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isClient]);

  // Active section detection
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      try {
        const sectionOffsets = navItems
          .map((item) => {
            const el = document.querySelector(item.link);
            return el
              ? {
                  name: item.name,
                  top: el.getBoundingClientRect().top + window.scrollY,
                }
              : null;
          })
          .filter(Boolean);

        const current = sectionOffsets.findLast(
          (s) => window.scrollY + 120 >= s.top
        );
        if (current) setActiveSection(current.name);
      } catch (error) {
        console.warn("Error detecting active section:", error);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navItems, isClient]);

  if (!isClient) return null;

  return (
    <motion.div
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="fixed top-0 w-full z-50"
    >
      <Navbar
        className={`transition-all duration-300 backdrop-blur-lg border-b ${
          isScrolled
            ? "bg-white/80 dark:bg-slate-900/80 shadow-md py-2 border-gray-200 dark:border-gray-800"
            : "bg-white/40 dark:bg-slate-900/30 py-4 border-transparent"
        }`}
      >
        {/* Desktop Nav */}
        <NavBody visible className="px-4">
          <motion.div
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <NavbarLogo />
          </motion.div>

          <NavItems
            items={navItems}
            className="mx-auto"
            renderItem={(item) => (
              <motion.a
                href={item.link}
                key={item.name}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeSection === item.name
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={(e) => handleNavClick(e, item)}
                aria-current={activeSection === item.name ? "page" : undefined}
              >
                {item.name}
              </motion.a>
            )}
          />

          <div className="flex items-center">{/* Layout filler */}</div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav visible>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMenuOpen}
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.link}
                className={`block px-4 py-2 text-lg font-medium transition-colors ${
                  activeSection === item.name
                    ? "text-teal-600 dark:text-teal-400"
                    : "text-gray-800 dark:text-gray-200 hover:text-teal-500 dark:hover:text-teal-300"
                }`}
                onClick={(e) => handleMobileNavClick(e, item)}
                aria-current={activeSection === item.name ? "page" : undefined}
              >
                {item.name}
              </a>
            ))}
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </motion.div>
  );
}
