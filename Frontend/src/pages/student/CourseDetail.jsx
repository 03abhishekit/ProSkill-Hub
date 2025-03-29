import BuyCourseButton from "../../components/BuyCourseButton";
import { useGetCourseDetailWithStatusQuery } from "../../features/api/purchaseApi";
import { BadgeInfo, Lock, PlayCircle } from "lucide-react";
import React from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router-dom";


const CourseDetail = () => {
  const params = useParams();
  const courseId = params.courseId;
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCourseDetailWithStatusQuery(courseId);

  if (isLoading) return <h1 className="text-center text-2xl font-bold">Loading...</h1>;
  if (isError) return <h1 className="text-center text-red-500">Failed to load course details</h1>;

  const { course, purchased } = data;
  console.log(purchased);
  

  const handleContinueCourse = () => {
    if (purchased) {
      navigate(`/course-progress/${courseId}`);
    }
  };

  return (
    <div className="space-y-5">
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col gap-2">
          <h1 className="text-3xl font-bold">{course?.courseTitle}</h1>
          <p className="text-lg">Course Sub-title</p>
          <p>Created By {" "} <span className="text-indigo-300 underline italic">{course?.creator.name}</span></p>
          <div className="flex items-center gap-2 text-sm">
            <BadgeInfo size={16} />
            <p>Last updated {course?.createdAt.split("T")[0]}</p>
          </div>
          <p>Students enrolled: {course?.enrolledStudents.length}</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto my-5 px-4 md:px-8 flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-2/3 space-y-5">
          <h1 className="text-2xl font-bold">Description</h1>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: course.description }} />
          <div className="p-4 border rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold">Course Content</h2>
            <p className="text-sm text-gray-600">{course.lectures.length} lectures</p>
            {/* <p className="text-sm text-gray-600">4 lectures</p> */}
            <div className="mt-3 space-y-2">
              {course.lectures.map((lecture, idx) => (
                <div key={idx} className="flex items-center gap-3 text-sm p-2 border-b">
                  <span>{true ? <PlayCircle size={16} /> : <Lock size={16} />}</span>
                  <p>{lecture.lectureTitle}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3">
          <div className="p-4 border rounded-lg shadow-lg">
            <div className="w-full aspect-video mb-4">
              {/* <ReactPlayer width="100%" height={"100%"} url={course?.lectures[0]?.videoUrl} controls={true} /> */}
              {course?.lectures?.length > 0 && (
                  <ReactPlayer width="100%" height="100%" url={course.lectures[0].videoUrl} controls={true} />
                )}
            </div>
            <h1 className="text-lg font-semibold">Lecture title</h1>
            <hr className="my-2" />
            <h1 className="text-xl font-semibold">Course Price</h1>
            <div className="mt-4 flex justify-center">
              {purchased ? (
                <button onClick={handleContinueCourse} className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">Continue Course</button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;


