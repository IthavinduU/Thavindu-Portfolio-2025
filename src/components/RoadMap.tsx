import { motion } from "framer-motion";
import { Tooltip } from "react-tooltip";
import { FaGraduationCap, FaUserTie, FaSchool, FaPenNib } from "react-icons/fa";

// Tooltip-enabled animated icon
const Icon = ({ icon: IconComp, label }: { icon: any; label: string }) => (
  <>
    <motion.div
      whileInView={{ rotate: 360 }}
      transition={{ duration: 1.2 }}
      className="text-2xl md:text-3xl text-blue-600 dark:text-blue-400"
      data-tooltip-id={label}
    >
      <IconComp />
    </motion.div>
    <Tooltip id={label} content={label} place="top" />
  </>
);

const Card = ({
  title,
  place,
  duration,
  details,
  icons = [],
  icon: HeadingIcon,
}: {
  title: string;
  place: string;
  duration: string;
  details: string[];
  icons?: { icon: any; label: string }[];
  icon: any;
}) => (
  <motion.div
    whileInView={{ opacity: 1, y: 0 }}
    initial={{ opacity: 0, y: 40 }}
    transition={{ duration: 0.5 }}
    className="bg-white dark:bg-[#123] shadow-md rounded-lg p-5 relative mb-10 border-l-4 border-blue-500"
  >
    <div className="absolute -left-[26px] top-3 bg-blue-500 text-white p-2 rounded-full">
      <HeadingIcon className="text-xl" />
    </div>
    <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
      {title}
    </h4>
    <p className="text-sm text-gray-600 dark:text-gray-300">{place}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{duration}</p>
    <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
      {details.map((item, idx) => (
        <li key={idx}>{item}</li>
      ))}
    </ul>
    <div className="flex gap-3 mt-3">
      {icons.map(({ icon, label }, idx) => (
        <Icon key={idx} icon={icon} label={label} />
      ))}
    </div>
  </motion.div>
);

const RoadMap = () => {
  const education = [
    {
      title: "BSc. (Hons) Computer Science",
      place: "University of Westminster - United Kingdom",
      duration: "2021 - 2025",
      details: [
        "Major in Backend Development",
        "Final Year Research Project: AI-based Student Monitoring System",
      ],
      icon: FaGraduationCap,
    },
    {
      title: "BSc.(Hons) Physical Science (On Hold)",
      place: "South Eastern University - Sri Lanka",
      duration: "2022 - 2026",
      details: ["Major in Computer Engineering"],
      icon: FaGraduationCap,
    },
    {
      title: "G.C.E. Advanced Level (Physical Science Stream)",
      place: "Kingswood College - Kandy",
      duration: "2007 - 2020",
      details: [
        "Completed GCE Advanced Levels in physical science stream with 3 passes",
      ],
      icon: FaSchool,
    },
  ];

  const experience = [
    {
      title: "Software Engineering Intern",
      place: "Petvisor - United Kingdom",
      duration: "June 2023 - June 2024",
      details: [
        "Worked on a real-time appointment booking system running on a PHP(Phalcon) back-end and Vue front-end.",
      ],

      icon: FaUserTie,
    },
    {
      title: "Freelance Developer",
      place: "Upwork - Remote",
      duration: "2020 - Present",
      details: [
        "Delivering high-quality, streamlined software and web solutions tailored to diverse client requirements.",
      ],
      icon: FaUserTie,
    },
    {
      title: "Technical Writer",
      place: "Medium",
      duration: "2023 - Present",
      details: [
        "Contributing to the community with the knowledge I pursue throughout my technical journey.",
      ],
      icon: FaPenNib,
    },
  ];

  return (
    <section id="roadmap" className="py-20 bg-gray-50 dark:bg-[#092537]">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-gray-800 dark:text-white mb-16">
          <span className="bg-gradient-to-r from-blue-500 to-teal-500 text-transparent bg-clip-text">
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
              Road Map{" "}
            </span>
          </span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Education Column */}
          <div className="relative">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
              Education
            </h3>
            <div className="absolute left-3 top-10 h-full w-1 bg-blue-300 dark:bg-blue-600" />
            {education.map((edu, idx) => (
              <Card key={idx} {...edu} />
            ))}
          </div>

          {/* Experience Column */}
          <div className="relative">
            <h3 className="text-2xl font-semibold mb-8 text-gray-800 dark:text-white">
              Professional Experience
            </h3>
            <div className="absolute left-3 top-10 h-full w-1 bg-blue-300 dark:bg-blue-600" />
            {experience.map((exp, idx) => (
              <Card key={idx} {...exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadMap;
