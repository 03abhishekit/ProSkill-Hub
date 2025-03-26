

import React from "react";
import Course from "./Course";
// import { useLoadUserQuery } from "@/features/api/authApi";

const MyLearning = () => { 
   const  data = "abhi"
   const isLoading = true;
//   const { data, isLoading } = useLoadUserQuery();
  const myLearning = data?.user?.enrolledCourses || [];
   
  return (
    <div className="max-w-6xl mx-auto my-12 px-6">
      
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-gray-800 dark:text-white text-center">
        My Learning
      </h1>

      {/* Courses Section */}
      <div className="mt-8">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <p className="text-center text-lg text-gray-600 dark:text-gray-300">
            You are not enrolled in any course.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: 4 }).map((_, index) => (
      <div
        key={index}
        className="bg-gray-200 dark:bg-gray-700 rounded-lg h-48 animate-pulse"
      ></div>
    ))}
  </div>
);

