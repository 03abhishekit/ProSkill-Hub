

import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { createCourse, createLecture, editCourse, getCourseById, getCreatorCourses } from "../controllers/courseControllers.js";
import upload from "../utils/multer.js";



const router = express.Router();


router.post("/", isAuthenticated, createCourse);
router.get("/", isAuthenticated, getCreatorCourses);
router.put("/:courseId", isAuthenticated, upload.single("courseThumbnail"),editCourse );
router.get("/:courseId",isAuthenticated, getCourseById);
router.post("/:courseId/lecture",isAuthenticated, createLecture);

// router.route("/").post(isAuthenticated,createCourse);
// router.route("/search").get(isAuthenticated, searchCourse);
// router.route("/published-courses").get( getPublishedCourse);
// router.route("/").get(isAuthenticated,getCreatorCourses);

// 

// router.route("/:courseId/lecture").get(isAuthenticated, getCourseLecture);
// router.route("/:courseId/lecture/:lectureId").post(isAuthenticated, editLecture);
// router.route("/lecture/:lectureId").delete(isAuthenticated, removeLecture);
// router.route("/lecture/:lectureId").get(isAuthenticated, getLectureById);
// router.route("/:courseId").patch(isAuthenticated, togglePublishCourse);

export { router};