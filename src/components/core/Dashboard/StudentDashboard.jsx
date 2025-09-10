import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import ProgressBar from "@ramonak/react-progress-bar";
import { getUserEnrolledCourses } from "../../../services/operations/profileAPI";
import { courses } from "../../../services/apis";
import axios from "axios";
import { getCourseLiveSessions } from '../../../services/operations/liveSessionAPI';
import LiveSessionCard from '../../LiveSessionCard';
import { getPdfUrl } from '../../../utils/pdfUtils';
import MCQModal from "../../core/Course/MCQModal";

export default function StudentDashboard() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const [trendingCourses, setTrendingCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [liveSessionsByCourse, setLiveSessionsByCourse] = useState({});
  const [mcqModalOpen, setMcqModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  const getEnrolledCourses = async () => {
    try {
      const res = await getUserEnrolledCourses(token);
      setEnrolledCourses(res);
    } catch (error) {
      console.log("Could not fetch enrolled courses.");
    }
  };

  const fetchTrendingCourses = async () => {
    try {
      const response = await axios.get(courses.COURSES_API);
      // Take the first 3 courses to show as trending
      setTrendingCourses(response.data.data.slice(0, 3));
    } catch (error) {
      console.log("Error fetching trending courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEnrolledCourses();
    fetchTrendingCourses();
  }, []);

  useEffect(() => {
    if (enrolledCourses && enrolledCourses.length > 0) {
      enrolledCourses.forEach(async (course) => {
        try {
          const res = await getCourseLiveSessions(token, course._id);
          setLiveSessionsByCourse((prev) => ({
            ...prev,
            [course._id]: res.data || [],
          }));
        } catch (error) {
          setLiveSessionsByCourse((prev) => ({
            ...prev,
            [course._id]: [],
          }));
        }
      });
    }
  }, [enrolledCourses, token]);

  if (loading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    
    <div className="flex flex-col gap-8 bg-[white] rounded-lg shadow-md">
      {/* Welcome Section */}
      <div className="rounded-lg text-center p-8 text-[black]">
        <h1 className="text-5xl font-semibold mb-4 relative z-10 text-shadow-2xl">Welcome, {user?.firstName}!</h1>
        <p className="text-lg z-10">Continue your learning journey today and unlock your potential.</p>
      </div>

      {/* Continue Learning Section */}
      <div className="bg-mwhite  p-6">
        <h2 className="text-3xl font-semibold text-black ">
          Continue Learning
        </h2>
        <h1 className="border border-[#76A9FA] w-[80px] h-[2px] rounded-xl bg-[#76A9FA] ml-1 mt-1 mb-6"></h1>
        {!enrolledCourses ? (
          <div className="flex justify-center">
            <div className="spinner"></div>
          </div>
        ) : !enrolledCourses.length ? (
          <div className="bg-yellow-400 border-l-4 text-center rounded-xl border-yellow-500 p-4 mb-6">
            <p className="text-[#F0F5FF] text-lg font-bold my-4">
              You haven't enrolled in any courses yet.
            </p>
            <button
              onClick={() => navigate("/show-all-courses")}
              className="mt-3 bg-[#111827] hover:bg-[#1F2937] hover:shadow-xl font-semibold hover:bg-yellow-600 text-[#F0F5FF]  py-2  px-6 mb-4 rounded-2xl transition duration-300"
            >
              Explore Courses
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Enrolled Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {enrolledCourses.map((course, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/view-course/${course?._id}/section/${course.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
                    );
                  }}
                >
                  <div className="relative">
                    <img
                      src={course.thumbnail}
                      alt={course.courseName}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <span className="text-white font-medium">
                        Progress: {course.progressPercentage || 0}%
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-black mb-2">
                      {course.courseName}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {course.courseDescription.length > 100
                        ? `${course.courseDescription.slice(0, 100)}...`
                        : course.courseDescription}
                    </p>
                    {/* <ProgressBar
                      completed={course.progressPercentage || 0}
                      height="8px"
                      isLabelVisible={false}
                      bgColor="#4F46E5"
                    /> */}
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-sm text-gray-500">
                        Duration: {course?.totalDuration || "N/A"}
                      </span>
                      <div className="flex gap-2">
                        <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                          Continue
                        </button>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedCourseId(course._id);
                            setMcqModalOpen(true);
                          }}
                          className="text-green-600 hover:text-green-800 font-medium text-sm"
                        >
                          Take Quiz
                        </button>
                      </div>
                    </div>
                    {course.ebook && (
                      <div className="mt-3">
                        <a
                          href={getPdfUrl(course.ebook)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-semibold border border-blue-600 rounded px-3 py-1 transition-colors duration-200"
                        >
                          📄 View Course Ebook
                        </a>
                      </div>
                    )}

                    {/* Live Sessions for this course */}
                    {liveSessionsByCourse[course._id] && liveSessionsByCourse[course._id].filter(session => new Date(session.endTime) > new Date()).length > 0 && (
                      <div className="mt-4">
                        <h4 className="font-semibold text-md text-[green] mb-2">Live Sessions</h4>
                        <div className="space-y-2">
                          {liveSessionsByCourse[course._id]
                            .filter(session => new Date(session.endTime) > new Date())
                            .map((session) => (
                              <LiveSessionCard
                                key={session._id}
                                session={session}
                                onJoin={() => window.open(session.zoomJoinUrl, '_blank')}
                                onWatch={() => session.recordingUrl && window.open(session.recordingUrl, '_blank')}
                                isInstructor={false}
                              />
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* See All Enrolled Courses Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={() => navigate("/dashboard/enrolled-courses")}
                className="bg-[#1A56DB] hover:bg-blue-700 text-[white] py-2 px-6 rounded-md transition duration-300"
              >
                See All Enrolled Courses
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Trending Courses Section */}
      <div className="bg-mwhite rounded-lg p-6 shadow-md">
        <h2 className="text-3xl font-semibold text-black">
          Trending Courses
        </h2>
        <h1 className="border border-[#76A9FA] w-[80px] h-[2px] rounded-xl bg-[#76A9FA] ml-1 mt-1 mb-6"></h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingCourses.map((course, index) => (
            <div
              key={index}
              className=" bg-[#F3F4F6] rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              onClick={() => navigate(`/courses/${course._id}`)}
            >
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-black mb-2">
                  {course.courseName}
                </h3>
                <p className="text-sm text-gray-600 mb-3">
                  {course.courseDescription?.length > 100
                    ? `${course.courseDescription.slice(0, 100)}...`
                    : course.courseDescription}
                </p>
                <div className="flex justify-between items-center">
                  <span className="font-medium text-black">
                    ${course.price}
                  </span>
                  <button className="text-[#1A56DB] hover:text-blue-800 font-medium text-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Explore All Courses Button */}
        <div className="flex justify-center mt-6">
          <button
            onClick={() => navigate("/show-all-courses")}
            className="bg-[#1A56DB] hover:bg-blue-700 text-[white] py-2 px-6 rounded-xl transition duration-300"
          >
            Explore All Courses
          </button>
        </div>
      </div>
      
      {/* MCQ Modal */}
      <MCQModal
        courseId={selectedCourseId}
        isOpen={mcqModalOpen}
        onClose={() => setMcqModalOpen(false)}
      />
    </div>
  );
}
