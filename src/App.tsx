import React, { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Projects from "./components/Projects";
import RoadMap from "./components/RoadMap";
import Services from "./components/Services";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Refs for sections with scroll handlers
  const articlesRef = useRef(null);
  const roadmapRef = useRef(null);

  // Scroll handlers to pass to Header
  const scrollToArticles = () => {
    articlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToRoadMap = () => {
    roadmapRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#092537] text-white">
      <Header
        onArticlesClick={scrollToArticles}
        onRoadMapClick={scrollToRoadMap}
      />
      <main>
        <Hero />       {/* Home */}
        <About />
        <Projects />
        {/* Attach ref to RoadMap */}
        <div ref={roadmapRef}>
          <RoadMap />
        </div>
        <Services />
        {/* Attach ref to Articles */}
        <div ref={articlesRef}>
          <Articles />
        </div>
        <Contact />
        <Footer />
      </main>
    </div>
  );
}

export default App;
