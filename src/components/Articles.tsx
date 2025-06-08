// App.tsx
import React from "react";
import ArticlesSlider from "./ArticlesSlider";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-4 px-4 md:px-8">
      <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-10">
        <span className="relative z-10 bg-gradient-to-r from-teal-500 to-blue-500 bg-clip-text text-transparent hover:from-teal-600 hover:to-blue-600 transition-all duration-300">
          Latest Articles
        </span>
      </h1>

      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 md:p-10 transition-all duration-300">
        <ArticlesSlider />
      </div>
    </div>
  );
}

export default App;
