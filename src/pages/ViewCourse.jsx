import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";

import CourseReviewModal from "../components/core/ViewCourse/CourseReviewModal";
import VideoDetailsSidebar from "../components/core/ViewCourse/VideoDetailsSidebar";
import { getFullDetailsOfCourse } from "../services/operations/courseDetailsAPI";
import {
  setCompletedLectures,
  setCourseSectionData,
  setEntireCourseData,
  setTotalNoOfLectures,
} from "../slices/viewCourseSlice";

export default function ViewCourse() {
  const { courseId } = useParams();
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [reviewModal, setReviewModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      setError("");
      try {
        const courseData = await getFullDetailsOfCourse(courseId, token);
        if (!courseData || !courseData.courseDetails || !courseData.courseDetails.courseContent) {
          setError("Course data not found or failed to load. Please check your course or contact support.");
        } else {
          dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
          dispatch(setEntireCourseData(courseData.courseDetails));
          dispatch(setCompletedLectures(courseData.completedVideos));
          let lectures = 0;
          courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length;
          });
          dispatch(setTotalNoOfLectures(lectures));
        }
      } catch (err) {
        setError("Failed to load course data. Please try again later.");
      }
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
        <p className="mt-4 text-lg text-gray-600">Loading course data...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="text-center">
          <p className="text-xl text-red-500 font-semibold">{error}</p>
          <p className="text-gray-500 mt-2">If the problem persists, please contact support.</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="relative flex flex-col min-h-[calc(100vh-3.5rem)] md:flex-row">
        {/* Sidebar */}
        <VideoDetailsSidebar setReviewModal={setReviewModal} />

        {/* Main content: Video description first, then the video */}
        <div className="flex-1 overflow-auto h-[calc(100vh-3.5rem)]">
          <div className="mx-4 md:mx-6 mt-4 md:mt-0">
            <Outlet />
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  );
}
