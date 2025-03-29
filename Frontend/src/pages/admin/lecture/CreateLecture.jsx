
import { useCreateLectureMutation, useGetCourseLectureQuery } from "../../../features/api/courseApi";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Lecture from "./Lecture";


const CreateLecture = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();

  const [createLecture, { data, isLoading, isSuccess, error }] =
    useCreateLectureMutation();

  const {
    data: lectureData = {},
    isLoading: lectureLoading,
    isError: lectureError,
    refetch,
  } = useGetCourseLectureQuery(courseId);

  const createLectureHandler = async () => {
    await createLecture({ lectureTitle, courseId });
  };

  
  useEffect(() => {
    if (isSuccess && data) {
      refetch();
      toast.success(data.message);
    }
    if (error) {
      toast.error(error.data.message);
    }
  }, [isSuccess, error, data]);


  console.log(lectureData);

  return (
    <div className="flex-1 mx-10">
      <div className="mb-4">
        <h1 className="font-bold text-2xl text-gray-800">
          Create Your Lecture: Share Knowledge, Inspire Minds
        </h1>
        <p className="text-sm text-gray-600">
          Provide the essential details for your lecture. Fill out the fields below
          to make it insightful and engaging for your audience.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            placeholder="Your Title Name"
            className="mt-2 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-4">
          <button
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100"
            onClick={() => navigate(`/admin/course/${courseId}`)}
          >
            Back to course
          </button>
          <button
            disabled={isLoading}
            onClick={createLectureHandler}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 flex items-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
              </>
            ) : (
              "Create lecture"
            )}
          </button>
        </div>
        <div className="mt-10">
          {lectureLoading ? (
            <p className="text-gray-700">Loading lectures...</p>
          ) : lectureError ? (
            <p className="text-red-500">Failed to load lectures.</p>
          ) : lectureData.lectures.length === 0 ? (
            <p className="text-gray-700">No lectures available</p>
          ) : (
            lectureData.lectures.map((lecture, index) => (
              <Lecture
                key={lecture._id}
                lecture={lecture}
                courseId={courseId}
                index={index}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateLecture;
