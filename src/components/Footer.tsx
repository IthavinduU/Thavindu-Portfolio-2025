import React from "react";
import { Facebook, Twitter, Instagram, Linkedin, Github } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const logoVariants = {
  hidden: { opacity: 0, y: -20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeOut" },
  },
};

const socialIconVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const copyrightVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut", delay: 0.5 },
  },
};

export default function Footer() {
  const socialLinks = [
    {
      icon: <Facebook className="w-5 h-5" />,
      href: "https://www.facebook.com/t.Thavindu.rathayaka?mibextid=ZbWKwL",
      label: "Facebook",
    },
    {
      icon: <Twitter className="w-5 h-5" />,
      href: "https://x.com/Thavindu_rathnaya?s=09",
      label: "Twitter",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      href: "https://www.instagram.com/Thavindu__Liyanage?igsh=MjdhcHlpdjd6NnR6",
      label: "Instagram",
    },
    {
      icon: <Linkedin className="w-5 h-5" />,
      href: "https://www.linkedin.com/in/Thavindu-Liyanage-02631b1b8/",
      label: "LinkedIn",
    },
    {
      icon: <Github className="w-5 h-5" />,
      href: "https://github.com/ThavinduLiyanage",
      label: "GitHub",
    },
  ];

  return (
    <footer className="bg-gray-50 dark:bg-[#092537] py-12 border-t border-gray-200 dark:border-gray-700/50 relative">
      <div className="container mx-auto px-4">
        <motion.div
          className="flex flex-col items-center text-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Logo/Brand */}
          <motion.a
            href="/"
            className="text-xl md:text-2xl font-bold mb-6 text-gray-800 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            variants={logoVariants}
          >
            thavindu.
            <span className="text-teal-600 dark:text-teal-400">Live</span>
          </motion.a>

          {/* Social Links */}
          <motion.ul
            className="flex flex-wrap justify-center gap-6 mb-8"
            variants={containerVariants}
          >
            {socialLinks.map((link, index) => (
              <motion.li
                key={link.label}
                variants={socialIconVariants}
                custom={index}
              >
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.label}
                  className="group flex items-center justify-center w-10 h-10 bg-gray-200 dark:bg-gray-700/50 rounded-full text-gray-600 dark:text-gray-400 hover:bg-teal-500/20 hover:text-teal-600 dark:hover:text-teal-300 transition-all duration-300"
                >
                  <motion.span
                    className="group-hover:scale-110 transition-transform duration-300"
                    whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {link.icon}
                  </motion.span>
                </a>
              </motion.li>
            ))}
          </motion.ul>

          {/* Map Location Embed */}
          {/* Map Location Embed - Smaller Version */}
          <motion.div
            className="w-full max-w-2xl mb-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <iframe
              title="My Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d271.86963478290323!2d80.62798324714622!3d7.287091688842843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae369c6f9dcd711%3A0xca97089e2522d149!2sSupreme%20Catering%20%26%20Event%20items%2C%20Kandy!5e0!3m2!1sen!2slk!4v1748666726361!5m2!1sen!2slk"
              width="100%"
              height="200" // Reduced height
              allowFullScreen
              loading="lazy"
              className="rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </motion.div>

          {/* Copyright */}
          <motion.p
            className="text-sm text-gray-600 dark:text-gray-400 px-4 text-center"
            variants={copyrightVariants}
          >
            All rights reserved © {new Date().getFullYear()} | Built by{" "}
            <span className="text-teal-600 dark:text-teal-400 font-medium hover:text-teal-700 dark:hover:text-teal-300 transition-colors duration-300">
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                Thavindu Liyanage
              </span>
            </span>
          </motion.p>
        </motion.div>
      </div>

      {/* Back to Top Button (non-fixed, smaller, transparent) */}
      <div className="mt-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-transparent text-teal-600 dark:text-teal-400 border border-teal-500/50 hover:bg-teal-500/10 transition-colors duration-300"
          aria-label="Back to top"
        >
          ↑
        </motion.button>
      </div>
    </footer>
  );
}
