



import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "../../features/api/authApi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user.enrolledCourses || [];

  return (
    <div className="max-w-7xl mx-auto my-16 px-8">
      {/* Title */}
      <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 text-center">
        My Learning
      </h1>

      {/* Courses Section */}
      <div className="mt-10">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            You are not enrolled in any course.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton loader for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-gray-200 to-gray-400 dark:from-gray-700 dark:to-gray-800 rounded-xl h-56 shadow-xl animate-pulse transform hover:scale-105 transition-transform duration-300"
      ></div>
    ))}
  </div>
);