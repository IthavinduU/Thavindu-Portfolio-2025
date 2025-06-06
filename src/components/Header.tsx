import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
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
import { motion, AnimatePresence } from "framer-motion";

// Utility function for smooth scrolling
const smoothScrollToElement = (selector) => {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
};

// Throttle function for performance optimization
const throttle = (func, limit) => {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

export default function Header({ onArticlesClick, onRoadMapClick }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");
  const [isClient, setIsClient] = useState(false);

  const lastScrollTop = useRef(0);

  // Memoized nav items
  const navItems = useMemo(
    () => [
      { name: "Home", link: "#home" },
      { name: "About", link: "#about" },
      { name: "Projects", link: "#projects" },
      { name: "RoadMap", link: "#roadmap" },
      { name: "Services", link: "#services" },
      { name: "Contact", link: "#contact" },
      { name: "Articles", link: "#articles" },
    ],
    []
  );

  // Memoized callbacks
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Handle navigation click
  const handleNavClick = useCallback(
    (e, item) => {
      e.preventDefault();

      if (item.name === "Articles") {
        onArticlesClick?.();
      } else if (item.name === "RoadMap") {
        onRoadMapClick?.();
      } else if (item.name === "Contact") {
        smoothScrollToElement("#contact");
      } else {
        smoothScrollToElement(item.link);
      }
    },
    [onArticlesClick, onRoadMapClick]
  );

  // Handle mobile nav click
  const handleMobileNavClick = useCallback(
    (e, item) => {
      e.preventDefault();
      setIsMenuOpen(false);

      if (item.name === "Articles") {
        onArticlesClick?.();
      } else if (item.name === "RoadMap") {
        onRoadMapClick?.();
      } else if (item.name === "Contact") {
        smoothScrollToElement("#contact");
      } else {
        smoothScrollToElement(item.link);
      }
    },
    [onArticlesClick, onRoadMapClick]
  );

  // Client-side hydration check
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Throttled scroll handler
  const handleScroll = useCallback(
    throttle(() => {
      const st = window.scrollY;
      setIsScrolled(st > 20);
      setIsVisible(st < lastScrollTop.current || st < 10);
      lastScrollTop.current = st <= 0 ? 0 : st;

      // Active section detection with error handling
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
    }, 16),
    [navItems]
  ); // 16ms = ~60fps

  // Scroll effects and active section detection
  useEffect(() => {
    if (!isClient) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isClient]);

  // Don't render until client-side hydration is complete
  if (!isClient) {
    return null;
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed top-0 w-full z-50"
        >
          <Navbar
            className={`transition-all duration-300 ${
              isScrolled
                ? "bg-white/70 dark:bg-slate-900/80 shadow backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                : "bg-transparent"
            }`}
          >
            {/* Desktop */}
            <NavBody visible={isScrolled} className="px-4">
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
                    aria-current={
                      activeSection === item.name ? "page" : undefined
                    }
                  >
                    {item.name}
                  </motion.a>
                )}
              />

              <div className="flex items-center">
                {/* Empty div to maintain layout balance */}
              </div>
            </NavBody>

            {/* Mobile */}
            <MobileNav visible={isScrolled}>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle
                  isOpen={isMenuOpen}
                  onClick={toggleMenu}
                  aria-label={`${
                    isMenuOpen ? "Close" : "Open"
                  } navigation menu`}
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
                    aria-current={
                      activeSection === item.name ? "page" : undefined
                    }
                  >
                    {item.name}
                  </a>
                ))}
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
