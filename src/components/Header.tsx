"use client";
import React, { useState, useEffect, useRef } from "react";
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

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("home");
  const [theme, setTheme] = useState("light");

  const lastScrollTop = useRef(0);

  const navItems = [
    { name: "Home", link: "#home" },
    { name: "About", link: "#about" },
    { name: "Projects", link: "#projects" },
    { name: "Services", link: "#services" },
  ];

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  // Scroll effects
  useEffect(() => {
    const handleScroll = () => {
      const st = window.scrollY;
      setIsScrolled(st > 20);
      setIsVisible(st < lastScrollTop.current || st < 10);
      lastScrollTop.current = st <= 0 ? 0 : st;

      // Active section detection
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
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
                ? "bg-white/70 dark:bg-[#0f172a]/80 shadow backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                : "bg-transparent"
            }`}
          >
            {/* Desktop */}
            <NavBody visible={true} className="px-4">
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
                  >
                    {item.name}
                  </motion.a>
                )}
              />

              <div className="flex items-center gap-2">
                <NavbarButton variant="secondary" href="#contact">
                  Contact
                </NavbarButton>
                <NavbarButton variant="primary" href="#articles">
                  Articles
                </NavbarButton>
                <button
                  onClick={toggleTheme}
                  className="ml-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  aria-label="Toggle Dark Mode"
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
            <MobileNav visible={true}>
              <MobileNavHeader>
                <NavbarLogo />
                <MobileNavToggle isOpen={isMenuOpen} onClick={toggleMenu} />
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
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="mt-4 flex flex-col gap-2">
                  <NavbarButton
                    variant="secondary"
                    href="#contact"
                    className="w-full"
                  >
                    Contact
                  </NavbarButton>
                  <NavbarButton
                    variant="primary"
                    href="#articles"
                    className="w-full"
                  >
                    Articles
                  </NavbarButton>
                  <button
                    onClick={toggleTheme}
                    className="mt-2 p-2 rounded-full bg-gray-100 dark:bg-gray-800 self-center"
                    aria-label="Toggle Dark Mode"
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
