

import { useEditLectureMutation, useGetLectureByIdQuery, useRemoveLectureMutation } from "../../../features/api/courseApi";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const MEDIA_API = "http://localhost:8080/api/v1/media";
// const MEDIA_API = "https://proskill-hub-backend.onrender.com/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [btnDisable, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle || "");
      setIsFree(lecture.isPreviewFree || false);
      setUploadVideoInfo(lecture.videoInfo || null);
    }
  }, [lecture]); // Ensure this runs only when lecture changes
  

  const [editLecture, { data, isLoading, error, isSuccess }] = useEditLectureMutation();
  const [removeLecture, { data:removeData, isLoading:removeLoading, isSuccess:removeSuccess }] = useRemoveLectureMutation();


  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (!file) return;
  
    const maxSize = 100 * 1024 * 1024; // 100MB
    if (file.size > maxSize) {
      toast.error("File size should be under 100MB");
      return;
    }
  
    const formData = new FormData();
    formData.append("file", file);
    setMediaProgress(true);
  
    try {
      const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
        onUploadProgress: ({ loaded, total }) => {
          setUploadProgress(Math.round((loaded * 100) / total));
        },
      });
  
      if (res?.data?.success) {
        setUploadVideoInfo({
          videoUrl: res.data.data.url,
          publicId: res.data.data.public_id,
        });
        setBtnDisable(false);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Video upload failed");
    } finally {
      setMediaProgress(false);
    }
  };
  
  
  console.log(uploadVideoInfo);
  const editLectureHandler = async () => {
    if (!lectureTitle || !uploadVideoInfo?.videoUrl || !courseId || !lectureId) {
      console.warn("Missing required fields!", { lectureTitle, uploadVideoInfo, courseId, lectureId });
      toast.error("Please ensure all fields are filled before saving.");
      return;
    }
  
    console.log("Submitting lecture with:", { lectureTitle, uploadVideoInfo, isFree, courseId, lectureId });
  
    await editLecture({
      lectureTitle,
      videoInfo: uploadVideoInfo,
      isPreviewFree: isFree,
      courseId,
      lectureId,
    });
  };
  
  
  const removeLectureHandler = async () => {
    try {
      await removeLecture(lectureId);
    } catch (err) {
      console.error("Error removing lecture:", err);
      toast.error("Failed to remove lecture. Please try again.");
    }
  };
  
  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message || "Lecture updated successfully");
    }
    if (error) {
      const errorMsg = error?.data?.message || "An error occurred";
      toast.error(errorMsg);
    }
  }, [isSuccess, error]);
  
  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);



  
  return (
    <div className="border border-gray-200 shadow-md rounded-lg p-6 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Edit Lecture</h2>
          <p className="text-sm text-gray-500">Make changes and click save when done.</p>
        </div>
        <button
          disabled={removeLoading}
          onClick={removeLectureHandler}
          className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 disabled:bg-red-400 rounded-md flex items-center gap-2"
        >
          {removeLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Remove Lecture"
          )}
        </button>
      </div>

      {/* Form Fields */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:ring focus:ring-blue-200"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Video <span className="text-red-500">*</span>
          </label>
          <input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            className="mt-1 block w-full text-sm border border-gray-300 rounded-md cursor-pointer"
          />
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="isFree"
            checked={isFree}
            onChange={() => setIsFree(!isFree)}
            className="w-5 h-5 border border-gray-300 rounded-md focus:ring-blue-500"
          />
          <label htmlFor="isFree" className="text-gray-700">Is this video FREE</label>
        </div>

        {/* Upload Progress */}
        {mediaProgress && (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                className="bg-blue-600 h-2.5 rounded-full transition-all"
                style={{ width: `${uploadProgress}%` }}
              />
            </div>
            <p className="text-sm text-gray-600 mt-1">{uploadProgress}% uploaded</p>
          </div>
        )}

        {/* Update Button */}
        <button
          disabled={isLoading}
          onClick={editLectureHandler}
          className="w-full py-2 mt-3 text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 rounded-md flex justify-center items-center gap-2"
        >
          {isLoading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Please wait
            </>
          ) : (
            "Update Lecture"
          )}
        </button>
      </div>
    </div>
  );
};

export default LectureTab;
