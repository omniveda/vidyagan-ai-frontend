import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import {
    VscDashboard,
    VscSignOut,
    VscAccount,
    VscVm,
    VscAdd,
    VscHome,
  } from "react-icons/vsc";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdReceipt } from "react-icons/md";
import ProfileDropdown from "../core/Auth/ProfileDropDown";
import { logout } from "../../services/operations/authAPI";
import { NavbarLinks } from "../../data/navbar-links";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/vidimg/vidyagan-ailogo.png";
import {useRef, useState, useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import NotificationBell from "../common/NotificationBell";
import ReceiptModal from "./ReceiptModal";
import { resetCourseState } from "../../slices/courseSlice";
import { getUserEnrolledCourses } from "../../services/operations/profileAPI";
import { downloadCertificate } from "../../services/operations/studentFeaturesAPI";
import { hasUserReviewedCourse } from "../../services/operations/studentFeaturesAPI";
import CourseReviewModal from "../core/ViewCourse/CourseReviewModal";

import { ACCOUNT_TYPE } from "../../utils/constants";

const Vnavbar = () => {
    const { user } = useSelector((state) => state.profile);
    const ref = useRef(null);
    const { totalItems } = useSelector((state) => state.cart);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isReceiptModalOpen, setIsReceiptModalOpen] = useState(false);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [hasCompletedCourse, setHasCompletedCourse] = useState(false);
    const [showCertificateModal, setShowCertificateModal] = useState(false);
    const { token } = useSelector((state) => state.auth);
    const [reviewedCourses, setReviewedCourses] = useState({});
    const [reviewModalCourseId, setReviewModalCourseId] = useState(null);

    useEffect(() => {
      async function fetchEnrolledCourses() {
        if (user?.accountType === ACCOUNT_TYPE.STUDENT) {
          try {
            const token = JSON.parse(localStorage.getItem("token"));
            const courses = await getUserEnrolledCourses(token);
            setEnrolledCourses(courses);
            setHasCompletedCourse(
              Array.isArray(courses) && courses.some(c => c.progressPercentage === 100)
            );
            // Check which completed courses are reviewed
            const reviewed = {};
            for (const c of courses) {
              if (c.progressPercentage === 100) {
                reviewed[c._id] = await hasUserReviewedCourse(c._id, token);
              }
            }
            setReviewedCourses(reviewed);
          } catch (err) {
            setEnrolledCourses([]);
            setHasCompletedCourse(false);
            setReviewedCourses({});
          }
        }
      }
      fetchEnrolledCourses();
    }, [user]);

    const handleLinkClick = () => {
        dispatch(resetCourseState());
      };

    const handleDownloadCertificate = () => {
      // Placeholder: Open modal or trigger download for all completed courses
      setShowCertificateModal(true);
    };

  return (
    <nav className="h-full bg-[white] flex flex-col  justify-between px-4 py-6 pb-16">
      {/* Logo */}
      <div className="items-center">
        <img
          src={logo}
          alt="Logo"
          className="h-10 w-auto mb-6 mx-4"
        />
        <div
        >
          {/* Dashboard Link */}
          {/* <Link
            to={getDashboardLink()}
            onClick={handleLinkClick}
            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 hover:bg-blue-700 hover:text-white transition-colors duration-200"
          >
            <VscDashboard className="text-lg" />
            Dashboard
          </Link> */}

          {/* My Profile Link */}
          <Link
            to="/dashboard/my-profile"
            onClick={handleLinkClick}
            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
          >
            <VscHome className="text-lg" />
            Dashboard
          </Link>
          <Link
            to="/dashboard/profile"
            onClick={handleLinkClick}
            className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
          >
            <VscAccount className="text-lg" />
            My Profile
          </Link>

          {/* Instructor-specific Links */}
          {user.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Link
                to="/dashboard/my-courses"
                onClick={handleLinkClick}
                className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
              >
                <VscVm className="text-lg" />
                My Courses
              </Link>

              <Link
                to="/dashboard/add-course"
                onClick={handleLinkClick}
                className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
              >
                <VscAdd className="text-lg" />
                Add Course
              </Link>
            </>
          )}

          {/* Student-specific Links */}
          {user.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Link
                to="/dashboard/enrolled-courses"
                onClick={handleLinkClick}
                className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
              >
                <VscVm className="text-lg" />
                Enrolled Courses
              </Link>

              <Link
                to="/dashboard/cart"
                onClick={handleLinkClick}
                className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
              >
                <VscVm className="text-lg" />
                Your Cart
              </Link>

              <button
                onClick={() => setIsReceiptModalOpen(true)}
                className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-blue-700 hover:text-[white] transition-colors duration-200"
              >
                <MdReceipt className="text-lg" />
                Download Receipts
              </button>
              {hasCompletedCourse && (
                <button
                  onClick={handleDownloadCertificate}
                  className="flex w-full items-center gap-x-2 py-3 px-4 text-sm text-gray-700 rounded-xl hover:bg-green-700 hover:text-[white] transition-colors duration-200"
                >
                  <span role="img" aria-label="certificate">🎓</span>
                  Download Certificate
                </button>
              )}
            </>
          )}

          {/* Settings Link */}
          

          
        </div>
      </div>

      {/* Bottom Items */}
      <div className="space-y-6">
        <div className="flex items-center mx-2 hover:text-yellow-50 cursor-pointer gap-4">
                <Link
                  to="/dashboard/cart"
                  className="relative flex"
                >
                  <AiOutlineShoppingCart className="text-2xl text-black mr-4 hover:text-yellow-50 cursor-pointer" /> Cart
                  {totalItems > 0 && (
                      <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-500">
                      {totalItems}
                    </span>
                  )}
                </Link>
        </div>
        <div className="flex items-center gap-4 hover:text-yellow-50 cursor-pointer">
            <NotificationBell />
        </div>
      </div>
      {/* Logout Option */}
      <div
            onClick={() => {
              dispatch(logout(navigate));
            }}
            className="flex w-full items-center gap-x-2 py-3 border border-[red] px-4 text-sm text-gray-700 rounded-xl hover:bg-[#F05252] hover:text-[white] transition-colors duration-200 cursor-pointer"
          >
            <VscSignOut className="text-lg" />
            Logout
          </div>

      {/* Receipt Modal */}
      <ReceiptModal 
        isOpen={isReceiptModalOpen} 
        onClose={() => setIsReceiptModalOpen(false)} 
      />
          
      {/* Certificate Modal (placeholder) */}
      {showCertificateModal && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-[white] p-8 rounded-lg shadow-lg max-w-md w-full">
              <h2 className="text-xl font-bold mb-4">Download Certificates</h2>
              <ul className="mb-4">
                {enrolledCourses.filter(c => c.progressPercentage === 100).map(c => (
                  <li key={c._id} className="mb-2 flex items-center justify-between">
                    <span>{c.courseName}</span>
                    {reviewedCourses[c._id] ? (
                      <button
                        className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={() => downloadCertificate(c._id, token)}
                      >
                        Download
                      </button>
                    ) : (
                      <button
                        className="ml-4 px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700"
                        onClick={() => setReviewModalCourseId(c._id)}
                      >
                        Submit Review to Download
                      </button>
                    )}
                  </li>
                ))}
              </ul>
              <button
                className="mt-2 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-600"
                onClick={() => setShowCertificateModal(false)}
              >
                Close
              </button>
            </div>
          </div>
          {reviewModalCourseId && (
            <CourseReviewModal
              setReviewModal={() => {
                setReviewModalCourseId(null);
                // After closing, refresh reviewedCourses
                (async () => {
                  const reviewed = { ...reviewedCourses };
                  reviewed[reviewModalCourseId] = await hasUserReviewedCourse(reviewModalCourseId, token);
                  setReviewedCourses(reviewed);
                })();
              }}
              courseId={reviewModalCourseId}
            />
          )}
        </>
      )}
          
    </nav>
  );
};

export default Vnavbar;
