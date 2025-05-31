import React from "react";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";
import { motion } from "framer-motion";
import TerminalTypewriter from "./ui/TerminalTypewriter";

const skills = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "HTML",
  "CSS",
  "Git",
  "SQL",
  "AWS",
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { x: 50, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.4, ease: "easeOut" } },
};

const headingVariants = {
  hidden: { x: 100, opacity: 0 },
  show: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
};

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#092537]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">

          {/* Static heading with blinking cursor */}
          <div className="mb-5 text-2xl md:text-base flex justify-center">
            <div className="font-mono text-lg md:text-xl text-gray-900 dark:text-white">
              <span>Absolute Coding at its Finest.</span>
              <span className="ml-1 animate-blink">|</span>
            </div>
          </div>

          {/* Terminal Typewriter */}
          <div className="mb-8 flex justify-center">
            <TerminalTypewriter />
          </div>

        </div>

        {/* Card and content section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mt-5">
          <div className="relative w-3/4 mx-auto">
            <CardContainer className="inter-var">
              <CardBody className="bg-gray-50 relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[#0f172a] dark:border-white/[0.1] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border">
                
                {/* Header with avatar and name */}
                <div className="flex items-center space-x-4">
                  <CardItem translateZ={20}>
                    <img
                      src="https://github.com/ThavinduLiyanage/Portfolio_React/blob/main/src/assets/cover3_053717.jpg?raw=true"
                      className="w-12 h-12 rounded-full object-cover"
                      alt="Avatar"
                    />
                  </CardItem>
                  <div>
                    <CardItem translateZ={20} className="font-semibold text-neutral-800 dark:text-white">
                      Thavindu Liyanage
                    </CardItem>
                    <CardItem translateZ={20} className="text-sm text-neutral-500 dark:text-neutral-400">
                      @Thavindur_dev
                    </CardItem>
                  </div>
                </div>

                {/* Tweet content */}
                <CardItem as="p" translateZ={40} className="text-neutral-700 dark:text-neutral-300 mt-4 text-sm">
                  Focused on the future, inspired by the view. 🚀💻 #WebDev #React #TechLife
                </CardItem>

                {/* Image */}
                <CardItem translateZ={100} className="w-full mt-4">
                  <img
                    src="https://github.com/ThavinduLiyanage/Portfolio_React/blob/main/src/assets/cover3_053717.jpg?raw=true"
                    className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                    alt="Post image"
                  />
                </CardItem>

                {/* Action buttons */}
                <div className="flex justify-around items-center mt-6 text-neutral-500 dark:text-neutral-400 text-sm">
                  <CardItem translateZ={20} className="hover:text-blue-500 cursor-pointer">💬 Comment</CardItem>
                  <CardItem translateZ={20} className="hover:text-green-500 cursor-pointer">🔁 Repost</CardItem>
                  <CardItem translateZ={20} className="hover:text-pink-500 cursor-pointer">❤️ Like</CardItem>
                  <CardItem translateZ={20} className="hover:text-yellow-500 cursor-pointer">📌 Save</CardItem>
                </div>

              </CardBody>
            </CardContainer>
          </div>

          {/* About Text */}
          <div className="text-center md:text-left">
            <motion.h2
              variants={headingVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent"
            >
              We can make it together
            </motion.h2>

            <motion.p
              initial={{ x: 100, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              viewport={{ once: true, amount: 0.5 }}
              className="text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              I'm a passionate software engineer specializing in developing web and mobile
              applications. Proficient in JavaScript, React, Node.js,
              and Python, I enjoy solving complex problems and building innovative solutions.
            </motion.p>

            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start"
            >
              {skills.map((skill) => (
                <motion.span
                  key={skill}
                  variants={item}
                  className="px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/5 text-teal-700 dark:text-teal-300 text-sm font-medium border border-teal-400"
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="flex justify-center md:justify-start mt-6"
            >
              
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
