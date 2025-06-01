import React, { useState } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import { cn } from "../lib/utils";

// Project data
const projects = [
  {
    title: "EmotiLive : Real Time Student Monitoring System",
    description:
      "AI-powered classroom tool for monitoring student engagement & emotional state in real time.",
    technologies: [
      "Python",
      "TensorFlow",
      "ESRGAN",
      "OpenCV",
      "Flask",
      "NextJS",
      "MongoDB",
    ],
    github: "https://github.com/IthavinduU/EmotiLive--FS",
  },
  {
    title: "Dice Maniacs: Android Game",
    description:
      "A Dice Roller game mobile application built using Android Studio with Kotlin, featuring multiplayer mode.",
    technologies: ["Kotlin", "Android Studio", "XML"],
    github: "https://github.com/IthavinduU/Dice-Maniacs",
  },
  {
    title: "Prettify : Face Enhancement Application",
    description:
      "A face beautification application focused on acne detection and removal using a deep CNN model and digital inpainting. With the integration of CI-CD Pipeline, building, testing and deployment has been automated.",
    technologies: ["Python", "Dart/Flutter", "Firebase", "Docker", "Jenkins"],
    github: "https://github.com/IthavinduU/Prettify",
  },
  {
    title: "Custom-Color-Contrast-Checker",
    description:
      "A Node.js package designed to check the contrast ratio between two colors and verify their compliance with WCAG accessibility standards. Supports hex, rgb(), rgba(), CLI and JS API.",
    technologies: ["Python", "Node.js", "NPM", "HTML5"],
    github: "https://github.com/IthavinduU/color-contrast-checker",
  },
];

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section id="projects" className="py-20 bg-gray-100 dark:bg-[#0A1F2E]">
      <div className="container mx-auto px-4">

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
        >
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            Featured Projects
          </span>
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              whileHover={{ scale: 1.02 }}
              className="transition-transform"
              onClick={() => setSelectedProject(project)}
            >
              <WobbleCard
                containerClassName={cn(
                  "bg-white dark:bg-[#112D3B] border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-md hover:shadow-xl cursor-pointer overflow-hidden"
                )}
              >
                <div className="relative z-10 p-6">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
                    {project.description}
                  </p>
                  <div className="mt-4">
                    <p className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                      Technologies Used:
                    </p>
                    <ul className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, i) => (
                        <li
                          key={i}
                          className="px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-white rounded-md"
                        >
                          {tech}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </WobbleCard>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <p className="mt-10 text-center text-base text-gray-600 dark:text-gray-400">
          Want to see more? Check out my{" "}
          <a
            href="https://github.com/IthavinduU"
            className="text-cyan-500 hover:underline"
          >
            GitHub
          </a>
        </p>
      </div>

      {/* Modal for project preview */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              className="bg-white dark:bg-[#0B1F2E] max-w-lg w-full rounded-xl p-6 relative shadow-xl border dark:border-gray-700"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
              >
                <X className="w-5 h-5" />
              </button>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {selectedProject.title}
              </h3>
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                {selectedProject.description}
              </p>
              <div className="mb-4">
                <p className="font-semibold text-gray-600 dark:text-gray-400 mb-1">
                  Technologies:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 bg-cyan-100 dark:bg-cyan-700 text-cyan-900 dark:text-white rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-cyan-600 hover:underline"
              >
                <Github className="w-4 h-4" />
                View on GitHub
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
