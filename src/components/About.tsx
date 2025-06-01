import React, { useEffect, useState } from "react";
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
  const [githubStats, setGithubStats] = useState({
    followers: 0,
    public_repos: 0,
    stars: 0,
  });

  useEffect(() => {
    async function fetchGithubStats() {
      try {
        const username = "IthavinduU";

        const userRes = await fetch(`https://api.github.com/users/${username}`);
        const userData = await userRes.json();

        const reposRes = await fetch(
          `https://api.github.com/users/${username}/repos?per_page=100`
        );
        const reposData = await reposRes.json();

        const totalStars = reposData.reduce(
          (acc, repo) => acc + repo.stargazers_count,
          0
        );

        setGithubStats({
          followers: userData.followers,
          public_repos: userData.public_repos,
          stars: totalStars,
        });
      } catch (error) {
        console.error("Failed to fetch GitHub stats:", error);
      }
    }

    fetchGithubStats();
  }, []);

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-[#092537]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          {/* Blinking Cursor Title */}
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

        {/* Grid Layout */}
        <div className="grid md:grid-cols-2 gap-12 items-start mt-5">
          {/* GitHub Stats & Visuals */}
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="w-full flex flex-col items-center md:items-center space-y-6 px-4"
          >
            {/* Stats Block with Tooltips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-white/[0.1] rounded-xl p-6 shadow-xl w-full max-w-md"
            >
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                GitHub Stats
              </h3>
              <div className="flex justify-between text-sm text-gray-700 dark:text-gray-300 font-mono">
                <div className="flex flex-col items-center" title="Total Followers on GitHub">
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {githubStats.followers}
                  </span>
                  <span>Followers</span>
                </div>
                <div className="flex flex-col items-center" title="Public repositories count">
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {githubStats.public_repos}
                  </span>
                  <span>Repos</span>
                </div>
                <div className="flex flex-col items-center" title="Total stars across all repos">
                  <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                    {githubStats.stars}
                  </span>
                  <span>Stars</span>
                </div>
              </div>
            </motion.div>

            {/* Animated GitHub Visuals */}
            <motion.div
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-col items-center gap-4 w-full max-w-md"
            >
              {[
                {
                  src: "https://github-readme-stats.vercel.app/api?username=IthavinduU&show_icons=true&theme=tokyonight&hide_title=true",
                  alt: "GitHub Stats",
                },
                {
                  src: "https://github-readme-stats.vercel.app/api/top-langs/?username=IthavinduU&layout=compact&theme=tokyonight",
                  alt: "Top Languages",
                },
                {
                  src: "https://github-readme-streak-stats.herokuapp.com/?user=IthavinduU&theme=tokyonight",
                  alt: "GitHub Streak",
                },
              ].map(({ src, alt }, index) => (
                <motion.img
                  key={index}
                  src={src}
                  alt={alt}
                  variants={item}
                  className="rounded-xl shadow-md w-full"
                />
              ))}
            </motion.div>

            {/* Contribution Graph / Trophy */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="w-full max-w-md"
            >
              <img
                src="https://github-profile-trophy.vercel.app/?username=IthavinduU&theme=tokyonight&margin-w=10&no-bg=true"
                alt="GitHub Trophies"
                className="rounded-xl shadow-md w-full"
              />
            </motion.div>
          </motion.div>

          {/* About Text & Skills */}
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
              applications. Proficient in JavaScript, React, Node.js, and Python, I enjoy solving
              complex problems and building innovative solutions.
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
          </div>
        </div>
      </div>
    </section>
  );
}
