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
  NavbarButton,
} from "./ui/resizable-navbar";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun } from "lucide-react";

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
  const [theme, setTheme] = useState("light");
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
    ],
    []
  );

  // Memoized callbacks
  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  const toggleTheme = useCallback(() => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);

    // Safe localStorage usage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("theme", newTheme);
      } catch (error) {
        console.warn("Failed to save theme to localStorage:", error);
      }
    }

    document.documentElement.classList.toggle("dark", newTheme === "dark");
  }, [theme]);

  // Handle navigation click
  const handleNavClick = useCallback(
    (e, item) => {
      e.preventDefault();

      if (item.name === "Articles") {
        onArticlesClick?.();
      } else if (item.name === "RoadMap") {
        onRoadMapClick?.();
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

  // Theme initialization
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const storedTheme = localStorage.getItem("theme") || "light";
        setTheme(storedTheme);
        document.documentElement.classList.toggle(
          "dark",
          storedTheme === "dark"
        );
      } catch (error) {
        console.warn("Failed to load theme from localStorage:", error);
        setTheme("light");
      }
    }
  }, []);

  const handleScroll = useCallback(
    throttle(() => {
      const st = window.scrollY;
      setIsScrolled(st > 20);
      setIsVisible(st < lastScrollTop.current || st < 10);
      lastScrollTop.current = st <= 0 ? 0 : st;

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

  useEffect(() => {
    if (!isClient) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isClient]);

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

              <div className="flex items-center gap-2">
                <NavbarButton
                  variant="secondary"
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    smoothScrollToElement("#contact");
                  }}
                  aria-label="Navigate to contact section"
                >
                  Contact
                </NavbarButton>
                <NavbarButton
                  variant="primary"
                  href="#articles"
                  onClick={(e) => {
                    e.preventDefault();
                    onArticlesClick?.();
                  }}
                  aria-label="View articles"
                >
                  Articles
                </NavbarButton>
                <button
                  onClick={toggleTheme}
                  className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                  aria-label={`Switch to ${
                    theme === "dark" ? "light" : "dark"
                  } mode`}
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Moon className="w-4 h-4 text-gray-800" />
                  )}
                </button>
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
                <div className="mt-4 flex flex-col gap-2">
                  <NavbarButton
                    variant="secondary"
                    href="#contact"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      smoothScrollToElement("#contact");
                    }}
                    aria-label="Navigate to contact section"
                  >
                    Contact
                  </NavbarButton>
                  <NavbarButton
                    variant="primary"
                    href="#articles"
                    className="w-full"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsMenuOpen(false);
                      onArticlesClick?.();
                    }}
                    aria-label="View articles"
                  >
                    Articles
                  </NavbarButton>
                  <button
                    onClick={() => {
                      toggleTheme();
                      setIsMenuOpen(false);
                    }}
                    className="mt-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 self-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
                    aria-label={`Switch to ${
                      theme === "dark" ? "light" : "dark"
                    } mode`}
                  >
                    {theme === "dark" ? (
                      <Sun className="w-5 h-5 text-yellow-400" />
                    ) : (
                      <Moon className="w-5 h-5 text-gray-800" />
                    )}
                  </button>
                </div>
              </MobileNavMenu>
            </MobileNav>
          </Navbar>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
