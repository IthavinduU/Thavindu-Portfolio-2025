import React, { useState, useEffect } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { motion } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import { cn } from "../lib/utils";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Projects data
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
      "custom-color-contrast-checker is a Node.js package designed to check the contrast ratio between two colors and verify their compliance with WCAG accessibility standards. The tool supports hex color codes, rgb() and rgba() formats, and offers both a JavaScript API and a command-line interface (CLI) for quick and easy checks.",
    technologies: ["Python", "Node.js", "NPM", "HTML5"],
    github: "https://github.com/IthavinduU/color-contrast-checker",
  },
];
//----------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  // Lock scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "auto";
  }, [selectedProject]);

  return (
    <>
      <section id="projects" className="py-16 px-4 sm:px-6 md:px-8 bg-gray-100 dark:bg-[#0A1F2E]">
        <div className="container mx-auto">
          {/* Section Title */}
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

          {/* Projects Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="transition-transform cursor-pointer"
                onClick={() => setSelectedProject(project)}
                aria-label={`View details for project ${project.title}`}
              >
                <WobbleCard
                  containerClassName={cn(
                    "bg-white dark:bg-[#112D3B] border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden"
                  )}
                >
                  <div className="relative z-10 p-6">
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 text-[15px] md:text-base text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
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

                    <div className="mt-6 flex gap-3">
                      {/* GitHub Button */}
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-all"
                      >
                        <Github className="w-4 h-4" />
                        View on Github
                      </a>

                      {/* Live Website Button */}
                      {project.web && (
                        <a
                          href={project.web}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-cyan-100 dark:bg-cyan-700 hover:bg-cyan-200 dark:hover:bg-cyan-600 text-cyan-900 dark:text-white rounded-lg transition-all"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Visit
                        </a>
                      )}
                    </div>
                  </div>
                </WobbleCard>
              </motion.div>
            ))}
          </div>

          <p className="mt-8 text-center text-base sm:text-lg text-gray-500 dark:text-gray-400">
            Want to see more? Check out my{" "}
            <a
              href="https://github.com/IthavinduU"
              className="text-cyan-500 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
          </p>
        </div>
      </section>

      {/* Modal Preview */}
      {selectedProject && (
        <div
          aria-modal="true"
          role="dialog"
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          tabIndex={-1}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 p-4 sm:p-6"
          onClick={() => setSelectedProject(null)}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.25 }}
            className="bg-white dark:bg-[#0B1F2E] max-w-lg w-full rounded-xl p-6 relative shadow-xl border dark:border-gray-700 overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              aria-label="Close modal"
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <h3
              id="modal-title"
              className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            >
              {selectedProject.title}
            </h3>
            <p
              id="modal-description"
              className="text-base md:text-lg text-justify text-gray-700 dark:text-gray-300 leading-relaxed"
            >
              {selectedProject.description}
            </p>

            <div className="mt-6">
              <p className="text-sm font-semibold mb-2 text-gray-600 dark:text-gray-400">
                Technologies Used:
              </p>
              <ul className="flex flex-wrap gap-3">
                {selectedProject.technologies.map((tech, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 text-sm bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-white rounded-md"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-4 justify-center">
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-all"
              >
                <Github className="w-5 h-5" />
                View on Github
              </a>

              {selectedProject.web && (
                <a
                  href={selectedProject.web}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 text-sm bg-cyan-100 dark:bg-cyan-700 hover:bg-cyan-200 dark:hover:bg-cyan-600 text-cyan-900 dark:text-white rounded-lg transition-all"
                >
                  <ExternalLink className="w-5 h-5" />
                  Visit
                </a>
              )}
            </div>

            <button
              onClick={() => setSelectedProject(null)}
              className="mt-6 w-full py-3 text-center bg-red-100 dark:bg-red-800 text-red-800 dark:text-white rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}
    </>
  );
}
