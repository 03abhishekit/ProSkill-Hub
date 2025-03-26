import React from "react";
import { Link } from "react-router-dom";

const SearchResult = ({ course }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-300 py-4 gap-4">
      <Link
        to={`/course-detail/${course._id}`}
        className="flex flex-col md:flex-row gap-4 w-full md:w-auto"
      >
        <img
          src={course.courseThumbnail}
          alt="course-thumbnail"
          className="h-32 w-full md:w-56 object-cover rounded-lg shadow-md"
        />
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-lg md:text-xl text-gray-900">{course.courseTitle}</h1>
          <p className="text-sm text-gray-600">{course.subTitle}</p>
          <p className="text-sm text-gray-700">
            Instructor: <span className="font-bold text-gray-800">{course.creator?.name}</span>
          </p>
          <span className="px-3 py-1 mt-2 text-xs font-semibold text-white bg-blue-600 rounded-full w-fit">
            {course.courseLevel}
          </span>
        </div>
      </Link>
      <div className="mt-4 md:mt-0 md:text-right w-full md:w-auto">
        <h1 className="font-bold text-lg md:text-xl text-gray-900">₹{course.coursePrice}</h1>
      </div>
    </div>
  );
};

export default SearchResult;
