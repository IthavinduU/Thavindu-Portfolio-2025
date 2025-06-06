import React, { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Home, 
  User, 
  FolderOpen, 
  MapPin, 
  Settings, 
  Mail, 
  FileText,
  Menu,
  X
} from "lucide-react";

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

const IconMobileHeader = ({ onArticlesClick, onRoadMapClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [activeSection, setActiveSection] = useState("Home");
  const [isClient, setIsClient] = useState(false);

  const lastScrollTop = useRef(0);

  // Navigation items with icons
  const navItems = useMemo(
    () => [
      { name: "Home", link: "#home", icon: Home },
      { name: "About", link: "#about", icon: User },
      { name: "Projects", link: "#projects", icon: FolderOpen },
      { name: "RoadMap", link: "#roadmap", icon: MapPin },
      { name: "Services", link: "#services", icon: Settings },
      { name: "Contact", link: "#contact", icon: Mail },
      { name: "Articles", link: "#articles", icon: FileText },
    ],
    []
  );

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), []);

  // Handle navigation click
  const handleNavClick = useCallback(
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

      // Active section detection
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
  );

  // Scroll effects
  useEffect(() => {
    if (!isClient) return;

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll, isClient]);

  if (!isClient) {
    return null;
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: -80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -80, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-0 w-full z-50"
          >
            {/* Desktop Navigation */}
            <nav
              className={`hidden lg:flex transition-all duration-300 ${
                isScrolled
                  ? "bg-white/70 dark:bg-slate-900/80 shadow backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                  : "bg-transparent"
              }`}
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="flex justify-between items-center py-4">
                  {/* Logo */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <a href="#" className="flex items-center space-x-2">
                      <img
                        src="https://via.placeholder.com/40x40/0891b2/ffffff?text=L"
                        alt="Logo"
                        className="w-10 h-10 rounded-full"
                      />
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        Logo
                      </span>
                    </a>
                  </motion.div>

                  {/* Desktop Menu Items */}
                  <div className="flex space-x-8">
                    {navItems.map((item) => (
                      <motion.a
                        key={item.name}
                        href={item.link}
                        className={`px-3 py-2 text-sm font-medium transition-colors ${
                          activeSection === item.name
                            ? "text-teal-600 dark:text-teal-400"
                            : "text-gray-700 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-300"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleNavClick(e, item)}
                      >
                        {item.name}
                      </motion.a>
                    ))}
                  </div>

                  <div className="w-20"></div>
                </div>
              </div>
            </nav>

            {/* Mobile Navigation */}
            <nav
              className={`lg:hidden transition-all duration-300 ${
                isScrolled
                  ? "bg-white/90 dark:bg-slate-900/90 shadow backdrop-blur-md border-b border-gray-200 dark:border-gray-800"
                  : "bg-transparent"
              }`}
            >
              <div className="px-4 sm:px-6">
                <div className="flex justify-between items-center py-4">
                  {/* Mobile Logo */}
                  <motion.div
                    initial={{ x: -30, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6 }}
                  >
                    <a href="#" className="flex items-center space-x-2">
                      <img
                        src="https://via.placeholder.com/36x36/0891b2/ffffff?text=L"
                        alt="Logo"
                        className="w-9 h-9 rounded-full"
                      />
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        Logo
                      </span>
                    </a>
                  </motion.div>

                  {/* Mobile Menu Button */}
                  <motion.button
                    onClick={toggleMenu}
                    className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
                    whileTap={{ scale: 0.95 }}
                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                  >
                    {isMenuOpen ? (
                      <X className="w-6 h-6 text-gray-900 dark:text-white" />
                    ) : (
                      <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
                    )}
                  </motion.button>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Icon Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Icon Grid Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed top-20 left-4 right-4 z-50 lg:hidden"
            >
              <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl p-6 border border-gray-200 dark:border-gray-700">
                <div className="grid grid-cols-3 gap-6">
                  {navItems.map((item, index) => {
                    const IconComponent = item.icon;
                    const isActive = activeSection === item.name;
                    
                    return (
                      <motion.button
                        key={item.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05, duration: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleNavClick(e, item)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-200 ${
                          isActive
                            ? "bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400"
                            : "bg-gray-50 dark:bg-slate-800 hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        <IconComponent className="w-6 h-6 mb-2" />
                        <span className="text-xs font-medium text-center">
                          {item.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>

                {/* Close hint */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                    Tap anywhere outside to close
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Demo Sections */}
      <div className="pt-20">
        <section id="home" className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Welcome Home
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              This is the home section with your icon-based mobile menu
            </p>
          </div>
        </section>

        <section id="about" className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              About Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Learn more about our story and mission
            </p>
          </div>
        </section>

        <section id="projects" className="min-h-screen bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Our Projects
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Discover our latest work and innovations
            </p>
          </div>
        </section>

        <section id="roadmap" className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Roadmap
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Our future plans and milestones
            </p>
          </div>
        </section>

        <section id="services" className="min-h-screen bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Services
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              What we offer to help you succeed
            </p>
          </div>
        </section>

        <section id="contact" className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Us
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Get in touch with our team
            </p>
          </div>
        </section>

        <section id="articles" className="min-h-screen bg-gray-50 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Articles
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Read our latest insights and updates
            </p>
          </div>
        </section>
      </div>
    </>
  );
};

export default IconMobileHeader;