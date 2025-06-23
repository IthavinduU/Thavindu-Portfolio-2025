import React, { useState, useEffect, useCallback, useMemo } from "react";
import { ExternalLink, Github, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { WobbleCard } from "./ui/wobble-card";
import { cn } from "../lib/utils";

//----------------------------------------------------------------------------------------------------------------------------------------------------------------
// Projects data with optimized images
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
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=70",
    imageLarge:
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Dice Maniacs: Android Game",
    description:
      "A Dice Roller game mobile application built using Android Studio with Kotlin, featuring multiplayer mode.",
    technologies: ["Kotlin", "Android Studio", "XML"],
    github: "https://github.com/IthavinduU/Dice-Maniacs",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=70",
    imageLarge:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Prettify : Face Enhancement Application",
    description:
      "A face beautification application focused on acne detection and removal using a deep CNN model and digital inpainting. With the integration of CI-CD Pipeline, building, testing and deployment has been automated.",
    technologies: ["Python", "Dart/Flutter", "Firebase", "Docker", "Jenkins"],
    github: "https://github.com/IthavinduU/Prettify",
    image:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=600&q=70",
    imageLarge:
      "https://images.unsplash.com/photo-1524253482453-3fed8d2fe12b?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Custom-Color-Contrast-Checker",
    description:
      "Node.js package designed to check the contrast ratio between two colors and verify compliance with WCAG accessibility standards. Supports hex, rgb, rgba with JavaScript API and CLI.",
    technologies: ["Python", "Node.js", "NPM", "HTML5"],
    github: "https://github.com/IthavinduU/color-contrast-checker",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=70",
    imageLarge:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80",
  },
];

// Optimized animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: "easeIn",
    },
  },
};

//----------------------------------------------------------------------------------------------------------------------------------------------------------------

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [imageLoaded, setImageLoaded] = useState({});

  // Memoized scroll lock effect
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "auto";
      };
    }
  }, [selectedProject]);

  // Optimized handlers
  const handleProjectClick = useCallback((project) => {
    setSelectedProject(project);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProject(null);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape") {
      setSelectedProject(null);
    }
  }, []);

  // Memoized image load handler
  const handleImageLoad = useCallback((projectTitle) => {
    setImageLoaded((prev) => ({ ...prev, [projectTitle]: true }));
  }, []);

  // Memoized project cards
  const projectCards = useMemo(
    () =>
      projects.map((project, index) => (
        <motion.div
          key={project.title}
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="transition-transform cursor-pointer h-full will-change-transform"
          onClick={() => handleProjectClick(project)}
          aria-label={`View details for project ${project.title}`}
        >
          <WobbleCard
            containerClassName={cn(
              "h-full bg-white dark:bg-[#112D3B] border border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            )}
          >
            <div className="relative">
              <img
                src={project.image}
                alt={`${project.title} preview`}
                loading="lazy"
                className={cn(
                  "w-full h-48 object-cover rounded-t-2xl transition-opacity duration-300",
                  imageLoaded[project.title] ? "opacity-100" : "opacity-0"
                )}
                onLoad={() => handleImageLoad(project.title)}
                decoding="async"
              />
              {!imageLoaded[project.title] && (
                <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse rounded-t-2xl" />
              )}
            </div>

            <div className="relative z-10 p-6 flex flex-col flex-grow justify-between">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed line-clamp-3">
                  {project.description}
                </p>
              </div>

              <div className="mt-4">
                <p className="text-xs font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Technologies:
                </p>
                <div className="flex flex-wrap gap-1">
                  {project.technologies.slice(0, 4).map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-white rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-md">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 px-3 py-2 text-xs bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
                >
                  <Github className="w-3 h-3" />
                  GitHub
                </a>
              </div>
            </div>
          </WobbleCard>
        </motion.div>
      )),
    [projects, handleProjectClick, handleImageLoad, imageLoaded]
  );

  return (
    <>
      <section
        id="projects"
        className="py-16 px-4 sm:px-6 md:px-8 relative z-10"
      >
        <div className="container mx-auto max-w-6xl">
          {/* Section Title - Matching Road Map styling */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-16">
              <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white group relative text-center">
                    <span className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
                      <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
                        Featured Projects{" "}
                      </span>
                    </span>
                  </h2>
                </span>
              </span>
            </h2>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 auto-rows-fr"
          >
            {projectCards}
          </motion.div>

          {/* Bottom Text - Fixed with better visibility */}
          <div className="mt-12 text-center">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-base md:text-lg text-gray-100 dark:text-gray-200 font-medium"
              style={{
                textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
              }}
            >
              Want to see more?{" "}
              <a
                href="https://github.com/IthavinduU"
                className="text-cyan-400 hover:text-cyan-300 dark:text-cyan-400 dark:hover:text-cyan-300 transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-cyan-300"
                style={{
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                }}
                target="_blank"
                rel="noopener noreferrer"
              >
                Check out my GitHub
              </a>
            </motion.p>
          </div>
        </div>
      </section>

      {/* Optimized Modal */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleCloseModal}
            onKeyDown={handleKeyDown}
            tabIndex={-1}
          >
            <motion.div
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white dark:bg-[#0B1F2E] max-w-lg w-full rounded-xl p-6 relative shadow-2xl border dark:border-gray-700 overflow-y-auto max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                aria-label="Close modal"
                onClick={handleCloseModal}
                className="absolute top-4 right-4 text-gray-700 dark:text-gray-300 hover:text-red-500 transition-colors duration-200 p-1"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 pr-8">
                {selectedProject.title}
              </h3>

              <img
                src={selectedProject.imageLarge}
                alt={`${selectedProject.title} large preview`}
                loading="lazy"
                className="rounded-lg w-full mb-4 object-cover max-h-48"
                decoding="async"
              />

              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {selectedProject.description}
              </p>

              <div className="mb-6">
                <p className="text-sm font-medium mb-2 text-gray-600 dark:text-gray-400">
                  Technologies Used:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2 py-1 text-xs bg-emerald-100 dark:bg-emerald-700 text-emerald-900 dark:text-white rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg transition-colors duration-200"
                >
                  <Github className="w-4 h-4" />
                  View on GitHub
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
