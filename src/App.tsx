import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react"; 
import { SpeedInsights } from "@vercel/speed-insights/react"

import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import RoadMap from "./components/RoadMap";
import Services from "./components/Services";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Loader from "./components/Loader";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark");
    const timer = setTimeout(() => setLoading(false), 3000); 
    return () => clearTimeout(timer);
  }, []);

  const articlesRef = useRef(null);
  const roadmapRef = useRef(null);

  const scrollToArticles = () => {
    articlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRoadMap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>Thavindu Liyanage | Software Engineer Portfolio</title>
        <meta
          name="description"
          content="Final-year Software Engineering student specializing in full-stack and backend development. View projects, skills, and experience."
        />
        <meta
          name="keywords"
          content="Thavindu Liyanage, software engineer, portfolio, backend, full-stack, React, Node.js, TypeScript, developer"
        />
        <meta name="author" content="Thavindu Liyanage" />

        {/* Open Graph */}
        <meta property="og:title" content="Thavindu Liyanage | Software Engineer Portfolio" />
        <meta
          property="og:description"
          content="Explore projects, skills, and experience of Thavindu Liyanage, a passionate software engineer."
        />
        <meta property="og:image" content="https://thavindu.me/preview.png" />
        <meta property="og:url" content="https://thavindu.me" />
        <meta property="og:type" content="website" />
      </Helmet>

      <AnimatePresence mode="wait">
        {loading ? (
          <Loader key="loader" />
        ) : (
          <div
            key="main-content"
            className="min-h-screen bg-gray-50 dark:bg-[#092537] text-white"
          >
            <Header
              onArticlesClick={scrollToArticles}
              onRoadMapClick={scrollToRoadMap}
            />
            <main>
              <Hero />
              <About />
              <Projects />
              <div ref={roadmapRef}>
                <RoadMap />
              </div>
              <Services />
              <div ref={articlesRef}>
                <Articles />
              </div>
              <Contact />
              <Footer />
            </main>
            <Analytics />
            <SpeedInsights/> 
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
