

import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "../../features/api/courseApi";

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();
      
  
  if (isError){
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <h1 className="text-red-500 font-semibold text-lg">
          Some error occurred while fetching courses.
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-[#141414] py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 dark:text-white mb-12">
          Our Courses
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {isLoading && Array.from({ length: 8 }).map((_, index) => (<CourseSkeleton key={index} />))}

              {!isLoading && data?.courses?.length > 0 &&
                data.courses.map((course, index) => <Course key={index} course={course} />)
              }
        </div>

      </div>
    </div>
  );
};

export default Courses;


const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden animate-pulse">
      <div className="h-44 bg-gray-300 dark:bg-gray-700 w-full"></div>
      
      <div className="p-5 space-y-4">
        <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        
        <div className="flex items-center gap-4">
          <div className="h-10 w-10 bg-gray-300 dark:bg-gray-600 rounded-full"></div>
          <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/3"></div>
        </div>

        <div className="h-5 bg-gray-300 dark:bg-gray-600 rounded w-1/4"></div>
      </div>
    </div>
  );
};
