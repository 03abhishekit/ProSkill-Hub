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
    <div className="relative bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-gray-800 dark:to-gray-900 py-24 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-white text-5xl font-extrabold mb-6 leading-tight">
          Find the Best Courses for You
        </h1>
        <p className="text-gray-200 dark:text-gray-400 text-lg mb-8">
          Discover, Learn, and Upskill with our wide range of courses.
        </p>

        <form
          onSubmit={searchHandler}
          className="flex items-center bg-white dark:bg-gray-800 rounded-full shadow-lg overflow-hidden max-w-xl mx-auto mb-6"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Courses"
            className="flex-grow border-none focus:ring-0 focus:outline-none px-6 py-3 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 bg-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 dark:bg-blue-700 text-white px-6 py-3 font-semibold rounded-r-full hover:bg-blue-700 dark:hover:bg-blue-800 transition duration-300"
          >
            Search
          </button>
        </form>
        
        <button
          onClick={() => navigate(`/course/search?query`)}
          className="bg-white dark:bg-gray-800 text-blue-600 font-semibold px-6 py-3 rounded-full shadow-md hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
        >
          Explore Courses
        </button>
      </div>
    </div>
  );
};

export default Hero;
