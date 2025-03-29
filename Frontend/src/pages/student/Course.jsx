import React from "react";
import { Link } from "react-router-dom";
import image from "../../assets/image.jpg"
import { IndianRupee } from "lucide-react"
const Course = ({ course }) => {
    
  return (
    <Link to={`/course-detail/${course._id}`} className="block">
      <div className="relative overflow-hidden bg-white dark:bg-gray-900 rounded-xl shadow-lg transition-transform transform hover:scale-[1.05] duration-300 hover:shadow-2xl">
        
        {/* Course Thumbnail */}
        <div className="relative">
          <img
            src={course.courseThumbnail}
            alt="Course Thumbnail"
            className="w-full h-44 object-cover rounded-t-xl"
          />
           <span className="absolute p-4 m-4 top-2 right-2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            {course.courseLevel}
          </span>
        </div>

        {/* Course Details */}
        <div className="p-5 space-y-3">
          
          {/* Course Title */}
          <h2 className="text-lg font-bold text-gray-800 dark:text-white truncate hover:text-blue-500 transition-colors">
            {course.courseTitle}
          </h2>

          {/* Creator Info */}
          <div className="flex items-center gap-3">
          <div className="flex items-center gap-3">
                <img
                  src={course.creator?.photoURL || image}
                  alt="Creator"
                  className="w-10 h-10 rounded-full border-2 border-blue-500 shadow-sm"
                  onError={(e) => {
                    e.target.src = image; // Use the imported default image if the provided image fails
                  }}
                />
              </div>

            <h3 className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {course.creator?.name}
            </h3>
          </div>

          {/* Course Price */}
          <div className="text-lg font-bold text-blue-600">
          <IndianRupee size={32} />
            {course.coursePrice} 
          </div>

        </div>
      </div>
    </Link>
  );
};

export default Course;
