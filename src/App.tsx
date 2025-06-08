import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence } from "framer-motion";

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
    const timer = setTimeout(() => setLoading(false), 2000); // 2 sec
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
        </div>
      )}
    </AnimatePresence>
  );
}

export default App;
