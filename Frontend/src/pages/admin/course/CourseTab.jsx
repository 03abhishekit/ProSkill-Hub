

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader2 } from "lucide-react";
import RichTextEditor from "../../../components/RichTextEditor";
import { useEditCourseMutation, useGetCourseByIdQuery } from "../../../features/api/courseApi";



const CourseTab = () => {
  const [input, setInput] = useState({
    courseTitle: "",
    subTitle: "",
    description: "",
    category: "",
    courseLevel: "",
    coursePrice: "",
    courseThumbnail: "",
  });

  const params = useParams();
  const courseId = params.courseId;
  const { data: courseByIdData, isLoading: courseByIdLoading, refetch } =
    useGetCourseByIdQuery(courseId);

  // const [publishCourse] = usePublishCourseMutation();
  const [previewThumbnail, setPreviewThumbnail] = useState("");
  const navigate = useNavigate();
  const [editCourse, { isLoading, isSuccess, error }] = useEditCourseMutation();

  // ... keep all the existing useEffect hooks and handler functions unchanged ...



 

  useEffect(() => {
    if (courseByIdData?.course) {
      const course = courseByIdData?.course;
      setInput({
        courseTitle: course.courseTitle,
        subTitle: course.subTitle,
        description: course.description,
        category: course.category,
        courseLevel: course.courseLevel,
        coursePrice: course.coursePrice,
        courseThumbnail: "",
      });
    }
  }, [courseByIdData]);

  const changeEventHandler = (e) => {
    const { name, value } = e.target;
    setInput({ ...input, [name]: value });
  };

  const selectThumbnail = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setInput({ ...input, courseThumbnail: file });
      const fileReader = new FileReader();
      fileReader.onloadend = () => setPreviewThumbnail(fileReader.result);
      fileReader.readAsDataURL(file);
    }
  };

  const updateCourseHandler = async () => {
    const formData = new FormData();
    Object.keys(input).forEach((key) => formData.append(key, input[key]));
    await editCourse({ formData, courseId });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message || "Course updated successfully.");
    }
    if (error) {
      toast.error(error?.data?.message || "Failed to update course");
    }
  }, [isSuccess, error]);

  if (courseByIdLoading) return <h1 className="text-center text-xl font-semibold">Loading...</h1>;

  return (
    <div className="bg-white rounded-lg border shadow-sm">
      <div className="p-6 border-b flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-semibold">Basic Course Information</h2>
          <p className="text-sm text-gray-500 mt-1">
            Make changes to your courses here. Click save when you're done.
          </p>
        </div>
        <div className="space-x-2">
          <button
            disabled={courseByIdData?.course.lectures.length === 0}
            onClick={() => publishStatusHandler(courseByIdData?.course.isPublished ? "false" : "true")}
            className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 disabled:opacity-50"
          >
            {courseByIdData?.course.isPublished ? "Unpublished" : "Publish"}
          </button>
          <button className="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium hover:bg-red-700">
            Remove Course
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              name="courseTitle"
              value={input.courseTitle}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ex. Fullstack developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Subtitle</label>
            <input
              type="text"
              name="subTitle"
              value={input.subTitle}
              onChange={changeEventHandler}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Ex. Become a Fullstack developer from zero to hero in 2 months"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <RichTextEditor input={input} setInput={setInput} />
          </div>

          <div className="flex gap-6 flex-wrap">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={input.category}
                onChange={(e) => selectCategory(e.target.value)}
                className="w-48 px-3 py-2 border rounded-md bg-white"
              >
                <option value="">Select category</option>
                <option value="Next JS">Next JS</option>
                <option value="Data Science">Data Science</option>
                {/* Keep other options same */}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Course Level</label>
              <select
                value={input.courseLevel}
                onChange={(e) => selectCourseLevel(e.target.value)}
                className="w-48 px-3 py-2 border rounded-md bg-white"
              >
                <option value="">Select level</option>
                <option value="Beginner">Beginner</option>
                <option value="Medium">Medium</option>
                <option value="Advance">Advance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Price (INR)</label>
              <input
                type="number"
                name="coursePrice"
                value={input.coursePrice}
                onChange={changeEventHandler}
                className="w-32 px-3 py-2 border rounded-md"
                placeholder="199"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Course Thumbnail</label>
            <input
              type="file"
              onChange={selectThumbnail}
              accept="image/*"
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {previewThumbnail && (
              <img
                src={previewThumbnail}
                className="mt-2 w-64 h-32 object-cover rounded"
                alt="Course thumbnail"
              />
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => navigate("/admin/course")}
              className="px-4 py-2 border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={updateCourseHandler}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                  Saving...
                </>
              ) : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseTab;


























