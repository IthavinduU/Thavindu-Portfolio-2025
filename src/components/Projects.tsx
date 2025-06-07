import React, { useState, useEffect } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import { cn } from "../lib/utils";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Projects data with actual image URLs and lazy loading
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
    image:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dice Maniacs: Android Game",
    description:
      "A Dice Roller game mobile application built using Android Studio with Kotlin, featuring multiplayer mode.",
    technologies: ["Kotlin", "Android Studio", "XML"],
    github: "https://github.com/IthavinduU/Dice-Maniacs",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Prettify : Face Enhancement Application",
    description:
      "A face beautification application focused on acne detection and removal using a deep CNN model and digital inpainting. With the integration of CI-CD Pipeline, building, testing and deployment has been automated.",
    technologies: ["Python", "Dart/Flutter", "Firebase", "Docker", "Jenkins"],
    github: "https://github.com/IthavinduU/Prettify",
    image:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Custom-Color-Contrast-Checker",
    description:
      "Node.js package designed to check the contrast ratio between two colors and verify compliance with WCAG accessibility standards. Supports hex, rgb, rgba with JavaScript API and CLI.",
    technologies: ["Python", "Node.js", "NPM", "HTML5"],
    github: "https://github.com/IthavinduU/color-contrast-checker",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
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
      <section
        id="projects"
        className="py-16 px-4 sm:px-6 md:px-8 bg-gray-100 dark:bg-[#0A1F2E]"
      >
        <div className="container mx-auto">
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white group relative text-center">
              <span className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  Featured Projects
                </span>
              </span>
            </h2>
          </motion.h2>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, y: 20 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                className="transition-transform cursor-pointer h-full"
                onClick={() => setSelectedProject(project)}
                aria-label={`View details for project ${project.title}`}
              >
                <WobbleCard
                  containerClassName={cn(
                    "h-full bg-white dark:bg-[#112D3B] border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-md hover:shadow-xl transition-all overflow-hidden flex flex-col"
                  )}
                >
                  <img
                    src={project.image}
                    alt={`${project.title} preview`}
                    loading="lazy"
                    className="w-full h-48 object-cover rounded-t-2xl"
                    decoding="async"
                    importance="low"
                  />
                  <div className="relative z-10 p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-[15px] md:text-base text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

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
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm p-4 sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") setSelectedProject(null);
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
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

              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedProject.title}
              </h3>

              <img
                src={selectedProject.image}
                alt={`${selectedProject.title} large preview`}
                loading="lazy"
                className="rounded-lg w-full mb-6 object-cover max-h-64 mx-auto"
                decoding="async"
                importance="low"
              />

              <p className="text-base md:text-lg text-justify text-gray-700 dark:text-gray-300 leading-relaxed">
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
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-all"
                >
                  <Github className="w-5 h-5" />
                  View on Github
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
