


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const searchHandler = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/course/search?query=${searchQuery}`);
    }
    setSearchQuery("");
  };

  return (
    <div className="relative bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 dark:from-gray-800 dark:via-gray-900 dark:to-black py-28 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        {/* Hero Title */}
        <h1 className="text-6xl font-extrabold text-white mb-6 leading-tight drop-shadow-md">
          Elevate Your Skills with Top Courses
        </h1>
        <p className="text-lg text-gray-200 dark:text-gray-400 mb-8">
          Discover, Learn, and Grow with our expertly curated courses.
        </p>

        {/* Search Bar */}
        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-2xl overflow-hidden max-w-2xl mx-auto mb-8"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for courses..."
            className="flex-grow border-none focus:ring-0 focus:outline-none px-6 py-4 text-gray-900 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold px-8 py-4 rounded-r-full hover:from-blue-600 hover:to-indigo-700 transition-all duration-300"
          >
            Search
          </button>
        </form>

        {/* Explore Courses Button */}
        <button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-white px-8 py-4 font-semibold rounded-full shadow-lg hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300"
        >
          Explore Courses
        </button>
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full blur-3xl opacity-30 transform -translate-x-12 -translate-y-12"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-blue-800 rounded-full blur-3xl opacity-30 transform translate-x-12 translate-y-12"></div>
    </div>
  );
};

export default Hero;