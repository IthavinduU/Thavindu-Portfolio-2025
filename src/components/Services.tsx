import React from 'react';
import { Globe, Smartphone, Database, PenTool } from 'lucide-react';
import { motion } from 'framer-motion';
import { RxDesktop, RxPencil2, RxMobile, RxReader, RxRocket } from 'react-icons/rx';


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
  {
    icon: <Database className="w-12 h-12 sm:w-32 sm:h-32" />,
    title: "Backend Development",
    description: "Developing scalable server-side solutions and APIs.",
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
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

export default function Services() {
  return (
    <div
      id="services"
      className="min-h-screen flex flex-col justify-center items-center p-6 bg-gray-50 dark:bg-[#092537]"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900 dark:text-white group relative text-center">
        <span className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
          I Offer
        </span>
      </h2>
      <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-xl text-center">
        Specialized services designed to exceed your expectations. Precision-driven
        results crafted with affordable, transparent pricing and reliable timelines
        that ensure your project is delivered promptly, along with ongoing support.
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
            <div className="text-sm opacity-75 text-center">{service.description}</div>
            <div className="absolute inset-0 rounded-xl bg-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
