import React from "react";
import { Github as GitHub, Linkedin, Mail, Briefcase, Users, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";

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
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center overflow-visible"
      style={{
        backgroundImage: `url('https://github.com/ThavinduLiyanage/software/raw/main/portfoliyocover.png')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="container mx-auto px-4 relative z-10 max-w-4xl text-center text-white space-y-8 overflow-visible">
        {/* Gradient name */}
        <motion.h1
          variants={fadeIn("down", 0)}
          initial="hidden"
          animate="show"
          className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent"
        >
          Thavindu Liyanage
        </motion.h1>

        {/* Typewriter roles */}
        <motion.div
          variants={fadeIn("down", 0.3)}
          initial="hidden"
          animate="show"
          className="text-2xl font-semibold"
        >
          <Typewriter options={{ strings: roles, autoStart: true, loop: true }} />
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeIn("down", 0.6)}
          initial="hidden"
          animate="show"
          className="text-gray-300 max-w-xl mx-auto leading-relaxed"
        >
          A proactive computer science professional driven by a passion for leveraging technology to create meaningful impact.
        </motion.p>

        {/* Counters */}
        <motion.div
          variants={fadeIn("right", 0.9)}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          ref={ref}
          className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-x-12 mt-6"
        >
          {/* Experience */}
          <div className="flex items-center space-x-4">
            <Briefcase className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-2xl font-extrabold text-white">
                {inView && <CountUp start={0} end={4} duration={3} />}+
              </div>
              <div className="text-sm text-gray-300">Years of Experience</div>
            </div>
          </div>

          {/* Clients */}
          <div className="flex items-center space-x-4">
            <Users className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-2xl font-extrabold text-white">
                {inView && <CountUp start={0} end={8} duration={3} />}+
              </div>
              <div className="text-sm text-gray-300">Happy Clients</div>
            </div>
          </div>

          {/* Projects */}
          <div className="flex items-center space-x-4">
            <CheckCircle className="w-6 h-6 text-blue-400" />
            <div className="text-left">
              <div className="text-2xl font-extrabold text-white">
                {inView && <CountUp start={0} end={14} duration={3} />}+
              </div>
              <div className="text-sm text-gray-300">Completed Projects</div>
            </div>
          </div>
        </motion.div>

        {/* Social Icons */}
        <motion.div
          variants={fadeIn("down", 1.2)}
          initial="hidden"
          animate="show"
          className="flex justify-center space-x-6 pt-6"
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
