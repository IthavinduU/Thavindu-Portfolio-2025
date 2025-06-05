import React from "react";
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

const githubCards = [
  {
    src: "https://github-readme-stats.vercel.app/api?username=IthavinduU&show_icons=true&theme=tokyonight&hide_border=true",
    alt: "GitHub Stats",
    link: "https://github.com/IthavinduU",
  },
  {
    src: "https://github-readme-stats.vercel.app/api/top-langs/?username=IthavinduU&layout=compact&theme=tokyonight&hide_border=true",
    alt: "Top Languages",
    link: "https://github.com/IthavinduU?tab=repositories",
  },
  {
    src: "https://github-readme-streak-stats.herokuapp.com/?user=IthavinduU&theme=tokyonight&hide_border=true",
    alt: "GitHub Streak",
    link: "https://github.com/IthavinduU",
  },
  {
    src: "https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=IthavinduU&theme=tokyonight",
    alt: "Profile Summary",
    link: "https://github.com/IthavinduU",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#092537]">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Heading */}
        <motion.h2
          initial={{ y: 40, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent"
        >
          We can make it together
        </motion.h2>

        {/* Terminal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <TerminalTypewriter />
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-gray-700 dark:text-gray-300 text-center max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          I'm a passionate software engineer specializing in developing web and
          mobile applications. Proficient in JavaScript, React, Node.js, and
          Python, I enjoy solving complex problems and building innovative
          solutions.
        </motion.p>

        {/* Skills */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-3 justify-center mb-12"
        >
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-4 py-2 rounded-full bg-teal-500/10 dark:bg-teal-500/5 text-teal-700 dark:text-teal-300 text-sm font-medium border border-teal-400"
            >
              {skill}
            </span>
          ))}
        </motion.div>

        {/* GitHub Stat Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 place-items-center"
        >
          {githubCards.map(({ src, alt, link }, index) => (
            <motion.a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
              className="w-full max-w-[400px] h-[250px] rounded-xl overflow-hidden shadow-lg bg-white dark:bg-[#0f1c2e] border border-gray-200 dark:border-gray-700 p-3 flex items-center justify-center"
            >
              <img
                src={src}
                alt={alt}
                className="w-full h-full object-contain rounded-md"
                loading="lazy"
              />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
