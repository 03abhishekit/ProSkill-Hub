
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import { Loader2 } from "lucide-react";
import { useCreateCourseMutation } from "../../../features/api/courseApi";

const AddCourse = () => {
  const [courseTitle, setCourseTitle] = useState("");
  const [category, setCategory] = useState("");

  const [createCourse, { data, isLoading, error, isSuccess }] =
    useCreateCourseMutation();

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Course created successfully.");
      navigate("/admin/course");
    }
  }, [isSuccess, error]);

  const createCourseHandler = async () => {
    await createCourse({ courseTitle, category });
  };

  console.log(courseTitle);
  console.log(category);
  return (
    <div className="flex-1 mx-auto max-w-2xl p-6 bg-white shadow-md rounded-lg">
      <h1 className="font-bold text-2xl text-gray-800 mb-2">
        Add a New Course
      </h1>
      <p className="text-gray-600 text-sm mb-6">
        Enter the course title and select a category to create a new course.
      </p>

      {/* Course Title */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Course Title
        </label>
        <input
          type="text"
          value={courseTitle}
          onChange={(e) => setCourseTitle(e.target.value)}
          placeholder="Enter course title"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Course Category */}
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-1">
          Select Category
        </label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="">Choose a category</option>
          <option value="Next JS">Next JS</option>
          <option value="Data Science">Data Science</option>
          <option value="Frontend Development">Frontend Development</option>
          <option value="Fullstack Development">Fullstack Development</option>
          <option value="MERN Stack Development">MERN Stack Development</option>
          <option value="Javascript">Javascript</option>
          <option value="Python">Python</option>
          <option value="Docker">Docker</option>
          <option value="MongoDB">MongoDB</option>
          <option value="HTML">HTML</option>
        </select>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end items-center gap-3 mt-6">
        <button
          onClick={() => navigate("/admin/course")}
          className="px-4 py-2 border border-gray-400 text-gray-600 rounded-lg hover:bg-gray-100 transition-all"
        >
          Back
        </button>
        <button
          onClick={createCourseHandler}
          disabled={isLoading}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-all disabled:bg-gray-400"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </button>
      </div>
    </div>
  );
};

export default AddCourse;
