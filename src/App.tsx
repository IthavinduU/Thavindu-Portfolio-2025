import React, { useRef } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Projects from "./components/Projects";
import Articles from "./components/Articles";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import RoadMap from "./components/RoadMap";

function App() {
  React.useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  // Ref for Articles section
  const articlesRef = useRef(null);

  // Scroll handler to pass to Header
  const scrollToArticles = () => {
    articlesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#092537] text-white">
      {/* Pass scroll handler as prop */}
      <Header onArticlesClick={scrollToArticles} />
      <main>
        <Hero />
        <About />
        <Services />
        <RoadMap />
        <Projects />
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
