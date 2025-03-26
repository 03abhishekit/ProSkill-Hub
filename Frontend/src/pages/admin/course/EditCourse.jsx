import React from "react";
import { Link } from "react-router-dom";
import CourseTab from "./CourseTab";

const EditCourse = () => {
  return (
    <div className="flex-1 p-5 bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6 border-b pb-3">
        <h1 className="font-bold text-2xl text-gray-800">
          Add Detail Information Regarding Course
        </h1>
        
        <Link to="lecture">
          <button className="px-4 py-2 text-blue-600 border border-blue-600 rounded-md 
            hover:bg-blue-600 hover:text-white transition duration-300">
            Go to Lectures Page
          </button>
        </Link>
      </div>

      {/* CourseTab Section */}
      <div className="bg-white p-6 shadow-md rounded-lg">
        <CourseTab />
      </div>
    </div>
  );
};

export default EditCourse;
