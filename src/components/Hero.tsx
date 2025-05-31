import React from "react";
import { Github as GitHub, Linkedin, Mail } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 20 : -20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

const roles = ["Software Engineer", "Web Developer", "Tech Enthusiast"];

export default function Hero() {
  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url('https://github.com/ThavinduLiyanage/software/raw/main/portfoliyocover.png')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center text-white space-y-8 overflow-visible">
        {/* Name with gradient */}
        <motion.h1
          variants={fadeIn("down", 0)}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-5xl font-extrabold leading-[1.2] bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent pb-2 overflow-visible"
        >
          Thavindu Liyanage
        </motion.h1>

        {/* Typewriter role titles */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          className="text-2xl font-semibold pb-2"
        >
          <Typewriter
            options={{
              strings: roles,
              autoStart: true,
              loop: true,
            }}
          />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          animate="show"
          className="text-gray-300 max-w-xl mx-auto leading-relaxed pb-2"
        >
          A proactive computer science professional driven by a passion for leveraging technology to create meaningful impact.
        </motion.p>

        {/* Social icons */}
        <motion.div
          variants={fadeIn("down", 0.9)}
          initial="hidden"
          animate="show"
          className="flex justify-center space-x-6"
        >
          <a
            href="https://github.com/ThavinduLiyanage"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="GitHub"
          >
            <GitHub className="w-6 h-6 text-white" />
          </a>
          <a
            href="https://www.linkedin.com/in/Thavindu-Liyanage-02631b1b8/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="w-6 h-6 text-white" />
          </a>
          <a
            href="mailto:thilinaThavinduLiyanage@gmail.com"
            className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            aria-label="Email"
          >
            <Mail className="w-6 h-6 text-white" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
