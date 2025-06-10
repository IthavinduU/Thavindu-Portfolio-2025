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
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1],
      staggerChildren: 0.1,
    },
  },
});

const floatAnimation = {
  initial: { y: 0 },
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

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
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 2,
            },
            move: {
              enable: true,
              speed: 1,
              outModes: { default: "out" },
              direction: "none",
              random: false,
              straight: false,
              path: {
                enable: true,
                delay: {
                  value: 0.1
                },
                options: {
                  size: 5,
                  draw: false,
                  increment: 0.001
                }
              }
            },
            number: {
              value: 40,
              density: { enable: true, area: 800 },
            },
            opacity: { 
              value: 0.7,
              animation: {
                enable: true,
                speed: 0.5,
                minimumValue: 0.2
              }
            },
            shape: { type: "circle" },
            size: { 
              value: { min: 2, max: 4 },
              animation: {
                enable: true,
                speed: 2,
                minimumValue: 0.5
              }
            },
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
              {[
                {
                  href: "https://github.com/IthavinduU",
                  icon: <FaGithub className="w-6 h-6" style={{ color: "#181717" }} />,
                  label: "GitHub"
                },
                {
                  href: "https://www.linkedin.com/in/thavinduliyanage",
                  icon: <FaLinkedin className="w-6 h-6" style={{ color: "#0A66C2" }} />,
                  label: "LinkedIn"
                },
                {
                  href: "mailto:thilinaThavinduLiyanage@gmail.com",
                  icon: <HiOutlineMail className="w-6 h-6" style={{ color: "#D14836" }} />,
                  label: "Email"
                },
                {
                  href: "https://medium.com/@thavinduwrites",
                  icon: <FaMedium className="w-6 h-6" style={{ color: "#00AB6C" }} />,
                  label: "Medium"
                },
                {
                  href: "https://buymeacoffee.com/Odbb0q1cZY",
                  icon: <SiBuymeacoffee className="w-6 h-6" style={{ color: "#FF813F" }} />,
                  label: "Buy Me a Coffee"
                }
              ].map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-all duration-300"
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    boxShadow: "0 0 15px rgba(56, 189, 248, 0.5)"
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {social.icon}
                </motion.a>
              ))}
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
            className="w-full md:w-1/3 bg-black/60 backdrop-blur-lg rounded-xl p-4 shadow-xl flex justify-center"
          >
            <motion.div
              initial="initial"
              animate="animate"
              variants={floatAnimation}
              className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg"
            >
              <img
                src="hero.png"
                alt="Thavindu"
                className="w-full h-full object-cover rounded-full"
              />
              <div className="absolute inset-0 pointer-events-none rounded-full scanning-effect" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-transparent animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scanning Animation */}
      <style jsx>{`
        .scanning-effect {
          background: linear-gradient(
            120deg,
            transparent 0%,
            rgba(255, 255, 255, 0.15) 50%,
            transparent 100%
          );
          animation: scan 3s ease-in-out infinite;
          opacity: 0;
          transition: opacity 0.5s ease-in-out;
        }
        div.relative:hover > .scanning-effect {
          opacity: 0.8;
        }
        @keyframes scan {
          0% {
            transform: translateX(-100%) translateY(0);
          }
          50% {
            transform: translateX(0%) translateY(0);
          }
          100% {
            transform: translateX(100%) translateY(0);
          }
        }

        /* Add new animations */
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(56, 189, 248, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(56, 189, 248, 0.5);
          }
        }

        .animate-pulse {
          animation: pulse-glow 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
