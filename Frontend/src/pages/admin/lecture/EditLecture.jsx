import React from "react";
import { ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import LectureTab from "./LectureTab";

const EditLecture = () => {
  const params = useParams();
  const courseId = params.courseId;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <Link to={`/admin/course/${courseId}/lecture`}>
            <button className="p-2 rounded-full border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 transition-all"
            aria-label="Back to Lectures">
              <ArrowLeft size={20} />
            </button>
          </Link>
          <h1 className="font-bold text-xl text-gray-800">
            Update Your Lecture
          </h1>
        </div>
      </div>
      <LectureTab />
    </div>
  );
};

export default EditLecture;
