"use client";

import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { SiBuymeacoffee } from "react-icons/si";
import { motion } from "framer-motion";
import Typewriter from "typewriter-effect";
import CountUp from "react-countup";
import { CheckCircle, Briefcase } from "lucide-react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";

const fadeIn = (direction = "up", delay = 0) => ({
  hidden: {
    opacity: 0,
    y: direction === "up" ? 20 : direction === "down" ? -20 : 0,
    x: direction === "left" ? 20 : direction === "right" ? -20 : 0,
  },
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  },
});

const roles = ["Software Engineer", "Web Developer", "Tech Enthusiast"];

export default function Hero() {
  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-0"
        options={{
          background: { color: { value: "#000000" } },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              resize: true,
            },
            modes: { repulse: { distance: 100, duration: 0.4 } },
          },
          particles: {
            color: { value: "#38bdf8" },
            links: {
              color: "#38bdf8",
              distance: 100,
              enable: true,
              opacity: 0.3,
              width: 4,
            },
            move: {
              enable: true,
              speed: 1.5,
              outModes: { default: "bounce" },
            },
            number: {
              value: 45,
              density: { enable: true, area: 800 },
            },
            opacity: { value: 0.4 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0" />

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-8">
          {/* Text Card */}
          <div className="w-full md:w-1/2 bg-black/60 backdrop-blur-lg rounded-xl p-6 md:p-8 shadow-xl space-y-6 text-white text-center md:text-left">
            <motion.h1
              variants={fadeIn("down", 0)}
              initial="hidden"
              animate="show"
              className="text-4xl md:text-5xl font-extrabold leading-snug break-words bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent"
            >
              Thavindu Liyanage
            </motion.h1>

            <motion.div
              variants={fadeIn("down", 0.3)}
              initial="hidden"
              animate="show"
              className="text-2xl font-semibold"
            >
              <Typewriter
                options={{ strings: roles, autoStart: true, loop: true }}
              />
            </motion.div>

            <motion.p
              variants={fadeIn("down", 0.5)}
              initial="hidden"
              animate="show"
              className="text-gray-300 leading-relaxed"
            >
              A proactive computer science professional driven by a passion for
              leveraging technology to create meaningful impact.
            </motion.p>

            {/* Counters */}
            <motion.div
              variants={fadeIn("right", 0.6)}
              initial="hidden"
              animate="show"
              className="grid grid-cols-3 gap-4 text-center"
            >
              {[
                {
                  label: "Years Experience",
                  value: 5,
                  icon: <Briefcase className="w-6 h-6 text-blue-400" />,
                },
                {
                  label: "Satisfied Clients",
                  value: 18,
                  icon: (
                    <svg
                      className="w-6 h-6 text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87M16 7a4 4 0 11-8 0 4 4 0 018 0z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ),
                },
                {
                  label: "Projects Completed",
                  value: 25,
                  icon: <CheckCircle className="w-6 h-6 text-blue-400" />,
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-900/60 rounded-lg p-4 shadow-md"
                >
                  {item.icon}
                  <div className="mt-2">
                    <div className="text-xl font-bold text-white">
                      <CountUp start={0} end={item.value} duration={2.5} />+
                    </div>
                    <div className="text-sm text-gray-300">{item.label}</div>
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeIn("down", 0.9)}
              initial="hidden"
              animate="show"
              className="flex flex-wrap justify-center md:justify-start gap-4 pt-4"
            >
              <a
                href="https://github.com/IthavinduU"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <FaGithub className="w-6 h-6" style={{ color: "#181717" }} />
              </a>
              <a
                href="https://www.linkedin.com/in/thavinduliyanage"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <FaLinkedin className="w-6 h-6" style={{ color: "#0A66C2" }} />
              </a>
              <a
                href="mailto:thilinaThavinduLiyanage@gmail.com"
                aria-label="Email"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <HiOutlineMail
                  className="w-6 h-6"
                  style={{ color: "#D14836" }}
                />
              </a>
              <a
                href="https://medium.com/@thavinduwrites"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Medium"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <FaMedium className="w-6 h-6" style={{ color: "#00AB6C" }} />
              </a>
              <a
                href="https://buymeacoffee.com/Odbb0q1cZY"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy Me a Coffee"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <SiBuymeacoffee
                  className="w-6 h-6"
                  style={{ color: "#FF813F" }}
                />
              </a>
            </motion.div>

            {/* Resume & Contact Buttons */}
            <motion.div
              variants={fadeIn("up", 1)}
              initial="hidden"
              animate="show"
              className="flex flex-col sm:flex-row gap-4 pt-6 justify-center md:justify-start"
            >
              <motion.a
                href="https://drive.google.com/file/d/1_mrHJFLABuvJkcCa9dDuvDkX2SrN0_51/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-md text-white font-semibold transition-shadow shadow-lg hover:shadow-xl"
              >
                View Resume
              </motion.a>
              <a
                href="#contact"
                className="px-6 py-2 border border-white hover:bg-white hover:text-black rounded-md text-white font-semibold transition"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* Avatar Card */}
          <motion.div
            variants={fadeIn("left", 0.6)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="w-full md:w-1/3 bg-black/60 backdrop-blur-lg rounded-xl p-4 shadow-xl flex justify-center"
          >
            <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg">
              <img
                src="hero.png"
                alt="Thavindu"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 pointer-events-none rounded-full scanning-effect" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scanning Animation */}
      <style jsx>{`
        .scanning-effect {
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.25) 50%,
            transparent 100%
          );
          animation: scan 2.5s linear infinite;
          opacity: 0;
          transition: opacity 0.3s ease-in-out;
        }
        div.relative:hover > .scanning-effect {
          opacity: 1;
        }
        @keyframes scan {
          0% {
            transform: translateX(-100%) translateY(0);
          }
          100% {
            transform: translateX(100%) translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
