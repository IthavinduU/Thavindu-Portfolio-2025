"use client";

import { motion } from "framer-motion";
import {
  RxDesktop,
  RxPencil2,
  RxMobile,
  RxReader,
  RxRocket,
} from "react-icons/rx";
import {
  SiPython,
  SiKotlin,
  SiGo,
  SiRust,
  SiPhp,
  SiGnubash,
  SiJavascript,
  SiFlutter,
  SiCplusplus,
  SiReact,
  SiVuedotjs,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiLaravel,
  SiDocker,
  SiKubernetes,
  SiGit,
  SiBitbucket,
  SiJenkins,
  SiPostman,
  SiLinux,
  SiMongodb,
  SiPostgresql,
  SiKaggle,
  SiPycharm,
} from "react-icons/si";

const services = [
  {
    icon: <RxDesktop className="w-12 h-12 sm:w-32 sm:h-32" />,
    title: "Web Development",
    description:
      "Creating responsive, functional websites tailored to your needs, from front-end to back-end.",
  },
  {
    icon: <RxPencil2 className="w-12 h-12 sm:w-32 sm:h-32" />,
    title: "UI/UX Design",
    description:
      "Designing intuitive, user-friendly interfaces that enhance user experience and engagement.",
  },
  {
    icon: <RxMobile className="w-12 h-12 sm:w-32 sm:h-32" />,
    title: "Mobile Development",
    description:
      "Building mobile apps for iOS and Android, ensuring seamless user experiences across platforms.",
  },
  {
    icon: <RxReader className="w-12 h-12 sm:w-32 sm:h-32" />,
    title: "Article Writing",
    description:
      "Delivering well-crafted articles that communicate your message effectively and resonate with your audience.",
  },
  {
    icon: <RxRocket className="w-12 h-12 sm:w-32 sm:h-32" />,
    title: "IT Consultation",
    description:
      "Offering expert IT advice to optimize your technology strategies and drive business growth.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Tools and Technologies Section
const techSections = [
  {
    title: "Programming Languages",
    techs: [
      { name: "Python", icon: <SiPython className="text-yellow-400" /> },
      { name: "Kotlin", icon: <SiKotlin className="text-purple-500" /> },
      { name: "Golang", icon: <SiGo className="text-blue-500" /> },
      { name: "Rust", icon: <SiRust className="text-orange-600" /> },
      { name: "PHP", icon: <SiPhp className="text-indigo-500" /> },
      { name: "Bash", icon: <SiGnubash className="text-green-600" /> },
      {
        name: "JavaScript",
        icon: <SiJavascript className="text-yellow-300" />,
      },
      { name: "Dart/Flutter", icon: <SiFlutter className="text-cyan-500" /> },
      { name: "C++", icon: <SiCplusplus className="text-blue-700" /> },
    ],
  },
  {
    title: "Frontend Technologies",
    techs: [
      { name: "React", icon: <SiReact className="text-blue-400" /> },
      { name: "Vue", icon: <SiVuedotjs className="text-green-400" /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
    ],
  },
  {
    title: "Backend & Frameworks",
    techs: [
      { name: "Node.js", icon: <SiNodedotjs className="text-green-500" /> },
      { name: "Express", icon: <SiExpress /> },
      { name: "Laravel", icon: <SiLaravel className="text-red-500" /> },
    ],
  },
  {
    title: "DevOps & Tools",
    techs: [
      { name: "Docker", icon: <SiDocker className="text-blue-400" /> },
      { name: "Kubernetes", icon: <SiKubernetes className="text-blue-500" /> },
      { name: "Git", icon: <SiGit className="text-orange-600" /> },
      { name: "Bitbucket", icon: <SiBitbucket className="text-blue-600" /> },
      { name: "Jenkins", icon: <SiJenkins className="text-red-600" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-400" /> },
      { name: "Linux", icon: <SiLinux className="text-yellow-500" /> },
    ],
  },
  {
    title: "Cloud & Databases",
    techs: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-700" /> },
      { name: "SQL", icon: <SiPostgresql className="text-blue-600" /> },
    ],
  },
  {
    title: "Others",
    techs: [
      { name: "Kaggle", icon: <SiKaggle className="text-blue-500" /> },
      { name: "PyCharm", icon: <SiPycharm className="text-green-400" /> },
    ],
  },
];

export default function Services() {
  return (
    <div
      id="services"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50 dark:bg-[#092537]"
    >
      {/* Services Section */}
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white group relative text-center">
        <span className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
          I Offer
        </span>
      </h2>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-xl text-center">
        Specialized services designed to exceed your expectations.
        Precision-driven results crafted with affordable, transparent pricing
        and reliable timelines that ensure your project is delivered promptly,
        along with ongoing support.
      </p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="flex flex-wrap justify-center max-w-5xl gap-8"
      >
        {services.map((service) => (
          <motion.a
            key={service.title}
            variants={cardVariants}
            className="group relative bg-white dark:bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-200 dark:border-gray-700/50 hover:border-teal-500/50 transition-all duration-300 hover:-translate-y-2 shadow-lg dark:shadow-xl hover:shadow-teal-500/20 dark:hover:shadow-teal-500/10 flex flex-col items-center w-full max-w-xs px-6 py-8 text-black dark:text-white hover:no-underline dark:hover:bg-white dark:hover:bg-opacity-10"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500/0 via-teal-500/50 to-teal-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="text-teal-500 dark:text-teal-400 mb-4">
              {service.icon}
            </div>
            <div className="font-semibold text-black dark:text-white mb-2 text-center">
              {service.title}
            </div>
            <div className="text-sm opacity-75 text-center">
              {service.description}
            </div>
            <div className="absolute inset-0 rounded-xl bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.a>
        ))}
      </motion.div>

      {/* Tools & Technologies Section */}
      <div className="mt-24 w-full text-center">
        <h3 className="text-2xl md:text-3xl font-bold mb-10 text-gray-900 dark:text-white">
          <span className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
            Tools & Technologies I Use
          </span>
        </h3>

        <div className="flex flex-col gap-16">
          {techSections.map((section) => (
            <motion.div
              key={section.title}
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col items-center"
            >
              <h4 className="text-xl font-semibold mb-6 text-teal-500 dark:text-teal-400">
                {section.title}
              </h4>
              <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
                {section.techs.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={cardVariants}
                    className="flex flex-col items-center justify-center gap-2 p-4 w-24 h-24 sm:w-28 sm:h-28 rounded-xl border bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-teal-500 transition-all shadow-sm dark:shadow-md"
                  >
                    <div className="text-3xl">{tech.icon}</div>
                    <span className="text-sm text-gray-800 dark:text-gray-200">
                      {tech.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
