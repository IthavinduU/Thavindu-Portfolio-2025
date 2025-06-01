import React from "react";
import {
  Github as GitHub,
  Linkedin,
  Mail,
  Briefcase,
  SignalMedium,
  Users,
  CheckCircle,
} from "lucide-react";
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
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
  });

  return (
    <section
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url('https://github.com/ThavinduLiyanage/software/raw/main/portfoliyocover.png')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-0" />

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col md:flex-row items-center justify-between bg-black/60 backdrop-blur-lg rounded-xl p-8 md:p-12 shadow-xl">
          {/* LEFT SIDE */}
          <div className="text-white max-w-xl space-y-6 text-center md:text-left">
            {/* Name */}
            <motion.h1
              variants={fadeIn("down", 0)}
              initial="hidden"
              animate="show"
              className="text-4xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-blue-400 to-white bg-clip-text text-transparent"
            >
              Thavindu Liyanage
            </motion.h1>

            {/* Roles */}
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

            {/* Description */}
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
              ref={ref}
              className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center md:justify-start"
            >
              <div className="flex items-center space-x-3">
                <Briefcase className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {inView ? <CountUp start={0} end={4} duration={3} /> : "0"}+
                  </div>
                  <div className="text-sm text-gray-300">Years Experience</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Users className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {inView ? <CountUp start={0} end={8} duration={3} /> : "0"}+
                  </div>
                  <div className="text-sm text-gray-300">Happy Clients</div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-blue-400" />
                <div>
                  <div className="text-2xl font-bold text-white">
                    {inView ? <CountUp start={0} end={14} duration={3} /> : "0"}
                    +
                  </div>
                  <div className="text-sm text-gray-300">Projects Done</div>
                </div>
              </div>
            </motion.div>

            {/* Socials */}
            <motion.div
              variants={fadeIn("down", 0.9)}
              initial="hidden"
              animate="show"
              className="flex space-x-5 justify-center md:justify-start pt-4"
            >
              <a
                href="https://github.com/ThavinduLiyanage"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <GitHub className="w-5 h-5 text-white" />
              </a>
              <a
                href="https://www.linkedin.com/in/Thavindu-Liyanage-02631b1b8/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </a>
              <a
                href="mailto:thilinaThavinduLiyanage@gmail.com"
                className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition"
              >
                <Mail className="w-5 h-5 text-white" />
              </a>
            </motion.div>

            {/* Buttons */}
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
                View Resume{" "}
              </motion.a>

              <a
                href="#contact"
                className="px-6 py-2 border border-white hover:bg-white hover:text-black rounded-md text-white font-semibold transition"
              >
                Contact Me
              </a>
            </motion.div>
          </div>

          {/* RIGHT SIDE - Image */}
          <motion.div
            variants={fadeIn("left", 0.6)}
            initial="hidden"
            animate="show"
            whileHover={{ scale: 1.05, rotate: 2 }}
            className="mt-10 md:mt-0 md:ml-8 flex justify-center"
          >
            <img
              src="https://avatars.githubusercontent.com/u/111663219?v=4"
              alt="Thavindu"
              className="w-64 h-64 object-cover rounded-full border-4 border-blue-500 shadow-lg transition-transform duration-300"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
