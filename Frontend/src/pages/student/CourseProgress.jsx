import { CheckCircle, CheckCircle2, CirclePlay } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import {
  useCompleteCourseMutation,
  useGetCourseProgressQuery,
  useInCompleteCourseMutation,
  useUpdateLectureProgressMutation,
} from "@/features/api/courseProgressApi";

const CourseProgress = () => {
  const params = useParams();
  const courseId = params.courseId;
  const { data, isLoading, isError, refetch } =
    useGetCourseProgressQuery(courseId);

  const [updateLectureProgress] = useUpdateLectureProgressMutation();
  const [completeCourse, { data: markCompleteData, isSuccess: completedSuccess }] =
    useCompleteCourseMutation();
  const [inCompleteCourse, { data: markInCompleteData, isSuccess: inCompletedSuccess }] =
    useInCompleteCourseMutation();

  useEffect(() => {
    if (completedSuccess) {
      refetch();
      toast.success(markCompleteData.message);
    }
    if (inCompletedSuccess) {
      refetch();
      toast.success(markInCompleteData.message);
    }
  }, [completedSuccess, inCompletedSuccess]);

  const [currentLecture, setCurrentLecture] = useState(null);

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError) return <p className="text-center text-red-500">Failed to load course details</p>;

  const { courseDetails, progress, completed } = data.data;
  const { courseTitle } = courseDetails;

  const initialLecture = currentLecture || courseDetails.lectures?.[0];

  const isLectureCompleted = (lectureId) =>
    progress.some((prog) => prog.lectureId === lectureId && prog.viewed);

  const handleLectureProgress = async (lectureId) => {
    await updateLectureProgress({ courseId, lectureId });
    refetch();
  };

  const handleSelectLecture = (lecture) => {
    setCurrentLecture(lecture);
    handleLectureProgress(lecture._id);
  };

  const handleCompleteCourse = async () => {
    await completeCourse(courseId);
  };

  const handleInCompleteCourse = async () => {
    await inCompleteCourse(courseId);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{courseTitle}</h1>
        <button
          onClick={completed ? handleInCompleteCourse : handleCompleteCourse}
          className={`px-4 py-2 rounded-md font-medium transition ${
            completed ? "border border-gray-400 text-gray-700 bg-white" : "bg-blue-600 text-white"
          }`}
        >
          {completed ? (
            <span className="flex items-center"><CheckCircle className="h-5 w-5 mr-2" /> Completed</span>
          ) : (
            "Mark as Completed"
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-3/5 w-full bg-white shadow-md rounded-lg p-4">
          <video
            src={currentLecture?.videoUrl || initialLecture?.videoUrl}
            controls
            className="w-full rounded-md"
            onPlay={() => handleLectureProgress(currentLecture?._id || initialLecture?._id)}
          />
          <h3 className="mt-4 text-lg font-semibold">
            {`Lecture ${
              courseDetails.lectures.findIndex(lec => lec._id === (currentLecture?._id || initialLecture?._id)) + 1
            } : ${currentLecture?.lectureTitle || initialLecture?.lectureTitle}`}
          </h3>
        </div>

        <div className="md:w-2/5 w-full border-t md:border-l md:border-t-0 border-gray-200 p-4">
          <h2 className="font-semibold text-xl mb-4">Course Lectures</h2>
          <div className="space-y-3">
            {courseDetails?.lectures.map((lecture) => (
              <div
                key={lecture._id}
                className={`p-4 border rounded-lg cursor-pointer transition ${
                  lecture._id === currentLecture?._id ? "bg-gray-200" : "bg-white hover:bg-gray-100"
                }`}
                onClick={() => handleSelectLecture(lecture)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {isLectureCompleted(lecture._id) ? (
                      <CheckCircle2 className="text-green-500 mr-2" size={24} />
                    ) : (
                      <CirclePlay className="text-gray-500 mr-2" size={24} />
                    )}
                    <p className="font-medium text-lg">{lecture.lectureTitle}</p>
                  </div>
                  {isLectureCompleted(lecture._id) && (
                    <span className="px-2 py-1 text-sm font-medium text-green-600 bg-green-200 rounded-md">
                      Completed
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
