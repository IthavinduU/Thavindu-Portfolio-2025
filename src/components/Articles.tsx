import React from "react";
import ArticlesSlider from "./ArticlesSlider";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 md:px-8">
      {/* Header */}
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        Latest Articles
      </h1>

      {/* Card View Container */}
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-300">
        <ArticlesSlider />
      </div>

      {/* Footer or more sections here */}
    </div>
  );
}

export default App;
