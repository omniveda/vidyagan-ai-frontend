// // // // import "./App.css";
// // // // import React, { useState, useEffect } from "react";
// // // // import { Route, Routes, useNavigate } from "react-router-dom";
// // // // import Home from "./pages/Home";
// // // // import Admin from './pages/Admin';
// // // // import AdminDashboard from './pages/AdminDashboard';
// // // // import AdminLogin from './pages/AdminLogin';
// // // // import Navbar from "./components/common/Navbar";
// // // // import OpenRoute from "./components/core/Auth/OpenRoute";
// // // // import Login from "./pages/Login";
// // // // import Signup from "./pages/Signup";
// // // // import ForgotPassword from "./pages/ForgotPassword";
// // // // import UpdatePassword from "./pages/UpdatePassword";
// // // // import VerifyEmail from "./pages/VerifyEmail";
// // // // import Rateus from "./pages/Rateus";
// // // // import About from "./pages/About";
// // // // import Contact from "./pages/Contact";
// // // // import MyProfile from "./components/core/Dashboard/MyProfile";
// // // // import Dashboard from "./pages/Dashboard";
// // // // import PrivateRoute from "./components/core/Auth/PrivateRoute";
// // // // import Error from "./pages/Error";
// // // // import Settings from "./components/core/Dashboard/Settings";
// // // // import { useDispatch, useSelector } from "react-redux";
// // // // import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
// // // // import Cart from "./components/core/Dashboard/Cart";
// // // // import { ACCOUNT_TYPE } from "./utils/constants";
// // // // import AddCourse from "./components/core/Dashboard/AddCourse";
// // // // import MyCourses from "./components/core/Dashboard/MyCourses";
// // // // import EditCourse from "./components/core/Dashboard/EditCourse";
// // // // import Catalog from "./pages/Catalog";
// // // // import CourseDetails from "./pages/CourseDetails";
// // // // import ViewCourse from "./pages/ViewCourse";
// // // // import VideoDetails from "./components/core/ViewCourse/VideoDetails";
// // // // import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
// // // // import BackToTop from "./components/common/BackToTop";

// // // // import PrivacyPolicy from "./pages/privacypolicy";
// // // // import TermsAndConditions from "./pages/TermsAndConditions";

// // // // import CookiePolicy from "./pages/CookiePolicy";
// // // // import Report from "./pages/Report";

// // // // import Loading from "./components/common/Loading";
// // // // import Project from "./pages/Project";
// // // // import Chatbot from "./pages/Chatbot";

// // // // function App() {
// // // //   const dispatch = useDispatch();
// // // //   const navigate = useNavigate();
// // // //   const { user } = useSelector((state) => state.profile);
// // // //   const [loading, setLoading] = useState(true);

// // // //   useEffect(() => {
// // // //     // Simulate a loading time for demonstration
// // // //     setTimeout(() => {
// // // //       setLoading(false);
// // // //     }, 2000); // Adjust the time as needed
// // // //   }, []);

// // // //   if (loading) {
// // // //     return (
// // // //       <div>
// // // //         <Loading />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   return (
// // // //     <div className="flex-1 w-screen bg-richblack-900 flex flex-col font-inter">
// // // //       <Navbar />
// // // //       <Routes>
// // // //         <Route path="/" element={<Home />} />
// // // //         <Route path="catalog/:catalogName" element={<Catalog />} />
// // // //         <Route path="courses/:courseId" element={<CourseDetails />} />
// // // //         <Route
// // // //           path="signup"
// // // //           element={
// // // //             <OpenRoute>
// // // //               <Signup />
// // // //             </OpenRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="login"
// // // //           element={
// // // //             <OpenRoute>
// // // //               <Login />
// // // //             </OpenRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="forgot-password"
// // // //           element={
// // // //             <OpenRoute>
// // // //               <ForgotPassword />
// // // //             </OpenRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="verify-email"
// // // //           element={
// // // //             <OpenRoute>
// // // //               <VerifyEmail />
// // // //             </OpenRoute>
// // // //           }
// // // //         />
// // // //         <Route
// // // //           path="update-password/:id"
// // // //           element={
// // // //             <OpenRoute>
// // // //               <UpdatePassword />
// // // //             </OpenRoute>
// // // //           }
// // // //         />
// // // //         <Route path="/Admin" element={<Admin />} />
// // // //         <Route path="/AdminLogin" element={<AdminLogin />} />
// // // //         <Route path="/AdminDashboard" element={<AdminDashboard />} />
// // // //         <Route path="/about" element={<About />} />
// // // //         <Route path="/contact" element={<Contact />} />
// // // //         <Route path="/project" element={<Project />} />
// // // //         <Route path="/rateus" element={<Rateus />} />

// // // //         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
// // // //         <Route path="/terms" element={<TermsAndConditions />} />

// // // //         <Route path="/cookie-policy" element={<CookiePolicy />} />
// // // //         <Route path="/report" element={<Report />} />

// // // //         <Route
// // // //           element={
// // // //             <PrivateRoute>
// // // //               <Dashboard />
// // // //             </PrivateRoute>
// // // //           }
// // // //         >
// // // //           <Route path="dashboard/my-profile" element={<MyProfile />} />
// // // //           <Route path="dashboard/settings" element={<Settings />} />
// // // //           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
// // // //             <>
// // // //               <Route path="dashboard/cart" element={<Cart />} />
// // // //               <Route
// // // //                 path="dashboard/enrolled-courses"
// // // //                 element={<EnrolledCourses />}
// // // //               />
// // // //             </>
// // // //           )}
// // // //           {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
// // // //             <>
// // // //               <Route path="dashboard/instructor" element={<Instructor />} />
// // // //               <Route path="dashboard/add-course" element={<AddCourse />} />
// // // //               <Route path="dashboard/my-courses" element={<MyCourses />} />
// // // //               <Route
// // // //                 path="dashboard/edit-course/:courseId"
// // // //                 element={<EditCourse />}
// // // //               />
// // // //             </>
// // // //           )}
// // // //         </Route>
// // // //         <Route
// // // //           element={
// // // //             <PrivateRoute>
// // // //               <ViewCourse />
// // // //             </PrivateRoute>
// // // //           }
// // // //         >
// // // //           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
// // // //             <>
// // // //               <Route
// // // //                 path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
// // // //                 element={<VideoDetails />}
// // // //               />
// // // //             </>
// // // //           )}
// // // //         </Route>
// // // //         <Route path="*" element={<Error />} />
// // // //       </Routes>
// // // //       <BackToTop />
// // // //       <Chatbot/>
// // // //     </div>
// // // //   );
// // // // }

// // // // export default App;

// // // import "./App.css";
// // // import React, { useState, useEffect } from "react";
// // // import { Route, Routes, useNavigate } from "react-router-dom";
// // // import Home from "./pages/Home";
// // // import Navbar from "./components/common/Navbar";
// // // import OpenRoute from "./components/core/Auth/OpenRoute";
// // // import Login from "./pages/Login";
// // // import Signup from "./pages/Signup";
// // // import ForgotPassword from "./pages/ForgotPassword";
// // // import UpdatePassword from "./pages/UpdatePassword";
// // // import VerifyEmail from "./pages/VerifyEmail";
// // // import Rateus from "./pages/Rateus";
// // // import About from "./pages/About";
// // // import Contact from "./pages/Contact";
// // // import MyProfile from "./components/core/Dashboard/MyProfile";
// // // import Dashboard from "./pages/Dashboard";
// // // import PrivateRoute from "./components/core/Auth/PrivateRoute";
// // // import Error from "./pages/Error";
// // // import Settings from "./components/core/Dashboard/Settings";
// // // import { useDispatch, useSelector } from "react-redux";
// // // import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
// // // import Cart from "./components/core/Dashboard/Cart";
// // // import { ACCOUNT_TYPE } from "./utils/constants";
// // // import AddCourse from "./components/core/Dashboard/AddCourse";
// // // import MyCourses from "./components/core/Dashboard/MyCourses";
// // // import EditCourse from "./components/core/Dashboard/EditCourse";
// // // import Catalog from "./pages/Catalog";
// // // import CourseDetails from "./pages/CourseDetails";
// // // import ViewCourse from "./pages/ViewCourse";
// // // import VideoDetails from "./components/core/ViewCourse/VideoDetails";
// // // import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
// // // import BackToTop from "./components/common/BackToTop";
// // // import PrivacyPolicy from "./pages/privacypolicy";
// // // import TermsAndConditions from "./pages/TermsAndConditions";
// // // import Loading from "./components/common/Loading";
// // // import Project from "./pages/Project";
// // // import Chatbot from "./pages/Chatbot";

// // // import AddCategory from "./pages/AddCategory";
// // // import AdminDashboard from "./pages/AdminDashboard"

// // // function App() {
// // //   const dispatch = useDispatch();
// // //   const navigate = useNavigate();
// // //   const { user } = useSelector((state) => state.profile);
// // //   const [loading, setLoading] = useState(true);

// // //   useEffect(() => {
// // //     // Simulate a loading time for demonstration
// // //     setTimeout(() => {
// // //       setLoading(false);
// // //     }, 2000); // Adjust the time as needed
// // //   }, []);

// // //   if (loading) {
// // //     return (
// // //       <div>
// // //         <Loading />
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="flex-1 w-screen bg-richblack-900 flex flex-col font-inter">
// // //       <Navbar />
// // //       <Routes>
// // //         <Route path="/" element={<Home />} />
// // //         <Route path="catalog/:catalogName" element={<Catalog />} />
// // //         <Route path="courses/:courseId" element={<CourseDetails />} />
// // //         <Route
// // //           path="signup"
// // //           element={
// // //             <OpenRoute>
// // //               <Signup />
// // //             </OpenRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="login"
// // //           element={
// // //             <OpenRoute>
// // //               <Login />
// // //             </OpenRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="forgot-password"
// // //           element={
// // //             <OpenRoute>
// // //               <ForgotPassword />
// // //             </OpenRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="verify-email"
// // //           element={
// // //             <OpenRoute>
// // //               <VerifyEmail />
// // //             </OpenRoute>
// // //           }
// // //         />
// // //         <Route
// // //           path="update-password/:id"
// // //           element={
// // //             <OpenRoute>
// // //               <UpdatePassword />
// // //             </OpenRoute>
// // //           }
// // //         />
// // //         <Route path="/about" element={<About />} />
// // //         <Route path="/contact" element={<Contact />} />
// // //         <Route path="/project" element={<Project />} />
// // //         <Route path="/rateus" element={<Rateus />} />
// // //         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
// // //         <Route path="/termsandconditions" element={<TermsAndConditions />} />

// // //         <Route
// // //           element={
// // //             <PrivateRoute>
// // //               <Dashboard />
// // //             </PrivateRoute>
// // //           }
// // //         >
// // //           <Route path="dashboard/my-profile" element={<MyProfile />} />
// // //           <Route path="dashboard/settings" element={<Settings />} />
// // //           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
// // //             <>
// // //               <Route path="dashboard/cart" element={<Cart />} />
// // //               <Route
// // //                 path="dashboard/enrolled-courses"
// // //                 element={<EnrolledCourses />}
// // //               />
// // //             </>
// // //           )}
// // //           {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
// // //             <>
// // //               <Route path="dashboard/instructor" element={<Instructor />} />
// // //               <Route path="dashboard/add-course" element={<AddCourse />} />
// // //               <Route path="dashboard/my-courses" element={<MyCourses />} />
// // //               <Route
// // //                 path="dashboard/edit-course/:courseId"
// // //                 element={<EditCourse />}
// // //               />
// // //             </>
// // //           )}
// // //         </Route>
// // //         <Route
// // //           element={
// // //             <PrivateRoute>
// // //               <ViewCourse />
// // //             </PrivateRoute>
// // //           }
// // //         >
// // //           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
// // //             <>
// // //               <Route
// // //                 path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
// // //                 element={<VideoDetails />}
// // //               />
// // //             </>
// // //           )}
// // //         </Route>

// // //         {/* Conditionally render the admin route */}
// // //         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
// // //           <Route
// // //             path="createCategory"
// // //             element={
// // //               <PrivateRoute>
// // //                 <AddCategory />
// // //               </PrivateRoute>
// // //             }
// // //           />
// // //         )}

// // //         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
// // //           <Route
// // //             path="adminDashboard"
// // //             element={
// // //               <PrivateRoute>
// // //                 <AdminDashboard />
// // //               </PrivateRoute>
// // //             }
// // //           />
// // //         )}

// // //         <Route path="*" element={<Error />} />
// // //       </Routes>
// // //       <BackToTop />
// // //       <Chatbot />
// // //     </div>
// // //   );
// // // }

// // // export default App;

// // import "./App.css";
// // import React, { useState, useEffect } from "react";
// // import { Route, Routes, useNavigate } from "react-router-dom";
// // import Home from "./pages/Home";
// // import Navbar from "./components/common/Navbar";
// // import OpenRoute from "./components/core/Auth/OpenRoute";
// // import Login from "./pages/Login";
// // import Signup from "./pages/Signup";
// // import ForgotPassword from "./pages/ForgotPassword";
// // import UpdatePassword from "./pages/UpdatePassword";
// // import VerifyEmail from "./pages/VerifyEmail";
// // import Rateus from "./pages/Rateus";
// // import About from "./pages/About";
// // import Contact from "./pages/Contact";
// // import MyProfile from "./components/core/Dashboard/MyProfile";
// // import Dashboard from "./pages/Dashboard";
// // import PrivateRoute from "./components/core/Auth/PrivateRoute";
// // import Error from "./pages/Error";
// // import Settings from "./components/core/Dashboard/Settings";
// // import { useDispatch, useSelector } from "react-redux";
// // import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
// // import Cart from "./components/core/Dashboard/Cart";
// // import { ACCOUNT_TYPE } from "./utils/constants";
// // import AddCourse from "./components/core/Dashboard/AddCourse";
// // import MyCourses from "./components/core/Dashboard/MyCourses";
// // import EditCourse from "./components/core/Dashboard/EditCourse";
// // import Catalog from "./pages/Catalog";
// // import CourseDetails from "./pages/CourseDetails";
// // import ViewCourse from "./pages/ViewCourse";
// // import VideoDetails from "./components/core/ViewCourse/VideoDetails";
// // import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
// // import BackToTop from "./components/common/BackToTop";
// // import PrivacyPolicy from "./pages/privacypolicy";
// // import TermsAndConditions from "./pages/TermsAndConditions";
// // import CookiePolicy from "./pages/CookiePolicy";
// // import Report from "./pages/Report";
// // import Loading from "./components/common/Loading";
// // import Project from "./pages/Project";
// // import Chatbot from "./pages/Chatbot";

// // // Import the ShowAllCoursesPage
// // import ShowAllCoursesPage from "./pages/ShowAllCoursesPage"; // Adjust the path based on your file structure

// // import AddCategory from "./pages/AddCategory";
// // import AdminDashboard from "./pages/AdminDashboard";

// // import EditPage from "./pages/EditPage"; // Import the EditPage component

// // function App() {
// //   const dispatch = useDispatch();
// //   const navigate = useNavigate();
// //   const { user } = useSelector((state) => state.profile);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     // Simulate a loading time for demonstration
// //     setTimeout(() => {
// //       setLoading(false);
// //     }, 2000); // Adjust the time as needed
// //   }, []);

// //   if (loading) {
// //     return (
// //       <div>
// //         <Loading />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex-1 w-screen bg-richblack-900 flex flex-col font-inter">
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="catalog/:catalogName" element={<Catalog />} />
// //         <Route path="courses/:courseId" element={<CourseDetails />} />

// //         {/* Add route for ShowAllCoursesPage */}
// //         <Route path="/show-all-courses" element={<ShowAllCoursesPage />} />

// //         <Route
// //           path="signup"
// //           element={
// //             <OpenRoute>
// //               <Signup />
// //             </OpenRoute>
// //           }
// //         />
// //         <Route
// //           path="login"
// //           element={
// //             <OpenRoute>
// //               <Login />
// //             </OpenRoute>
// //           }
// //         />
// //         <Route
// //           path="forgot-password"
// //           element={
// //             <OpenRoute>
// //               <ForgotPassword />
// //             </OpenRoute>
// //           }
// //         />
// //         <Route
// //           path="verify-email"
// //           element={
// //             <OpenRoute>
// //               <VerifyEmail />
// //             </OpenRoute>
// //           }
// //         />
// //         <Route
// //           path="update-password/:id"
// //           element={
// //             <OpenRoute>
// //               <UpdatePassword />
// //             </OpenRoute>
// //           }
// //         />
// //         <Route path="/about" element={<About />} />
// //         <Route path="/contact" element={<Contact />} />
// //         <Route path="/project" element={<Project />} />
// //         <Route path="/rateus" element={<Rateus />} />
// //         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
// //         <Route path="/terms" element={<TermsAndConditions />} />
// //         <Route path="/cookie-policy" element={<CookiePolicy />} />
// //         <Route path="/report" element={<Report />} />

// //         {/* EditPage route (accessible to admins only) */}
// //         <Route path="/edit-pages" element={<EditPage />} />

// //         <Route
// //           element={
// //             <PrivateRoute>
// //               <Dashboard />
// //             </PrivateRoute>
// //           }
// //         >
// //           <Route path="dashboard/my-profile" element={<MyProfile />} />
// //           <Route path="dashboard/settings" element={<Settings />} />
// //           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
// //             <>
// //               <Route path="dashboard/cart" element={<Cart />} />
// //               <Route
// //                 path="dashboard/enrolled-courses"
// //                 element={<EnrolledCourses />}
// //               />
// //             </>
// //           )}
// //           {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
// //             <>
// //               <Route path="dashboard/instructor" element={<Instructor />} />
// //               <Route path="dashboard/add-course" element={<AddCourse />} />
// //               <Route path="dashboard/my-courses" element={<MyCourses />} />
// //               <Route
// //                 path="dashboard/edit-course/:courseId"
// //                 element={<EditCourse />}
// //               />
// //             </>
// //           )}
// //         </Route>
// //         <Route
// //           element={
// //             <PrivateRoute>
// //               <ViewCourse />
// //             </PrivateRoute>
// //           }
// //         >
// //           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
// //             <>
// //               <Route
// //                 path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
// //                 element={<VideoDetails />}
// //               />
// //             </>
// //           )}
// //         </Route>

// //         {/* Conditionally render the admin route */}
// //         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
// //           <Route
// //             path="createCategory"
// //             element={
// //               <PrivateRoute>
// //                 <AddCategory />
// //               </PrivateRoute>
// //             }
// //           />
// //         )}

// //         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
// //           <Route
// //             path="adminDashboard"
// //             element={
// //               <PrivateRoute>
// //                 <AdminDashboard />
// //               </PrivateRoute>
// //             }
// //           />
// //         )}

// //         <Route path="*" element={<Error />} />
// //       </Routes>
// //       <BackToTop />
// //       <Chatbot />
// //     </div>
// //   );
// // }

// // export default App;

// // notification claude changes

// import "./App.css";
// import React, { useState, useEffect } from "react";
// import { Route, Routes, useNavigate } from "react-router-dom";
// import Home from "./pages/Home";
// import Navbar from "./components/common/Navbar";
// import OpenRoute from "./components/core/Auth/OpenRoute";
// import Login from "./pages/Login";
// import Signup from "./pages/Signup";
// import ForgotPassword from "./pages/ForgotPassword";
// import UpdatePassword from "./pages/UpdatePassword";
// import VerifyEmail from "./pages/VerifyEmail";
// import Rateus from "./pages/Rateus";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
// import MyProfile from "./components/core/Dashboard/MyProfile";
// import Dashboard from "./pages/Dashboard";
// import PrivateRoute from "./components/core/Auth/PrivateRoute";
// import Error from "./pages/Error";
// import Settings from "./components/core/Dashboard/Settings";
// import { useDispatch, useSelector } from "react-redux";
// import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
// import Cart from "./components/core/Dashboard/Cart";
// import { ACCOUNT_TYPE } from "./utils/constants";
// import AddCourse from "./components/core/Dashboard/AddCourse";
// import MyCourses from "./components/core/Dashboard/MyCourses";
// import EditCourse from "./components/core/Dashboard/EditCourse";
// import Catalog from "./pages/Catalog";
// import CourseDetails from "./pages/CourseDetails";
// import ViewCourse from "./pages/ViewCourse";
// import VideoDetails from "./components/core/ViewCourse/VideoDetails";
// import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
// import BackToTop from "./components/common/BackToTop";
// import PrivacyPolicy from "./pages/privacypolicy";
// import TermsAndConditions from "./pages/TermsAndConditions";
// import CookiePolicy from "./pages/CookiePolicy";
// import Report from "./pages/Report";
// import Loading from "./components/common/Loading";
// import Project from "./pages/Project";
// // import Chatbot from "./pages/Chatbot";

// // Import the ShowAllCoursesPage
// import ShowAllCoursesPage from "./pages/ShowAllCoursesPage"; // Adjust the path based on your file structure

// import AddCategory from "./pages/AddCategory";
// import AdminDashboard from "./pages/AdminDashboard";

// import EditPage from "./pages/EditPage"; // Import the EditPage component
// import NotificationManager from "../src/components/admin/NotificationManager"; // Import the NotificationManager component

// function App() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { user } = useSelector((state) => state.profile);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Simulate a loading time for demonstration
//     setTimeout(() => {
//       setLoading(false);
//     }, 2000); // Adjust the time as needed
//   }, []);

//   if (loading) {
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   }

//   return (
//     <div className="flex-1 w-screen bg-richblack-900 flex flex-col font-inter">
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="catalog/:catalogName" element={<Catalog />} />
//         <Route path="courses/:courseId" element={<CourseDetails />} />

//         {/* Add route for ShowAllCoursesPage */}
//         <Route path="/show-all-courses" element={<ShowAllCoursesPage />} />

//         <Route
//           path="signup"
//           element={
//             <OpenRoute>
//               <Signup />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="login"
//           element={
//             <OpenRoute>
//               <Login />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="forgot-password"
//           element={
//             <OpenRoute>
//               <ForgotPassword />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="verify-email"
//           element={
//             <OpenRoute>
//               <VerifyEmail />
//             </OpenRoute>
//           }
//         />
//         <Route
//           path="update-password/:id"
//           element={
//             <OpenRoute>
//               <UpdatePassword />
//             </OpenRoute>
//           }
//         />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/project" element={<Project />} />
//         <Route path="/rateus" element={<Rateus />} />
//         <Route path="/privacy-policy" element={<PrivacyPolicy />} />
//         <Route path="/terms" element={<TermsAndConditions />} />
//         <Route path="/cookie-policy" element={<CookiePolicy />} />
//         <Route path="/report" element={<Report />} />

//         {/* EditPage route (accessible to admins only) */}
//         <Route path="/edit-pages" element={<EditPage />} />

//         {/* NotificationManager route (accessible to admins only) */}
//         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
//           <Route
//             path="notification-manager"
//             element={
//               <PrivateRoute>
//                 <NotificationManager />
//               </PrivateRoute>
//             }
//           />
//         )}

//         <Route
//           element={
//             <PrivateRoute>
//               <Dashboard />
//             </PrivateRoute>
//           }
//         >
//           <Route path="dashboard/my-profile" element={<MyProfile />} />
//           <Route path="dashboard/settings" element={<Settings />} />
//           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
//             <>
//               <Route path="dashboard/cart" element={<Cart />} />
//               <Route
//                 path="dashboard/enrolled-courses"
//                 element={<EnrolledCourses />}
//               />
//             </>
//           )}
//           {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
//             <>
//               <Route path="dashboard/instructor" element={<Instructor />} />
//               <Route path="dashboard/add-course" element={<AddCourse />} />
//               <Route path="dashboard/my-courses" element={<MyCourses />} />
//               <Route
//                 path="dashboard/edit-course/:courseId"
//                 element={<EditCourse />}
//               />
//             </>
//           )}
//         </Route>
//         <Route
//           element={
//             <PrivateRoute>
//               <ViewCourse />
//             </PrivateRoute>
//           }
//         >
//           {user?.accountType === ACCOUNT_TYPE.STUDENT && (
//             <>
//               <Route
//                 path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
//                 element={<VideoDetails />}
//               />
//             </>
//           )}
//         </Route>

//         {/* Conditionally render the admin route */}
//         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
//           <Route
//             path="createCategory"
//             element={
//               <PrivateRoute>
//                 <AddCategory />
//               </PrivateRoute>
//             }
//           />
//         )}

//         {user?.accountType === ACCOUNT_TYPE.ADMIN && (
//           <Route
//             path="adminDashboard"
//             element={
//               <PrivateRoute>
//                 <AdminDashboard />
//               </PrivateRoute>
//             }
//           />
//         )}

//         <Route path="*" element={<Error />} />
//       </Routes>
//       <BackToTop />
//       {/* <Chatbot /> */}
//     </div>
//   );
// }

// export default App;

// dashboard update

import "./App.css";
import React, { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import OpenRoute from "./components/core/Auth/OpenRoute";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import Rateus from "./pages/Rateus";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/Dashboard/MyProfile";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Error from "./pages/Error";
import Settings from "./components/core/Dashboard/Settings";
import { useDispatch, useSelector } from "react-redux";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/Dashboard/AddCourse";
import MyCourses from "./components/core/Dashboard/MyCourses";
import EditCourse from "./components/core/Dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/ViewCourse/VideoDetails";
import Instructor from "./components/core/Dashboard/InstructorDashboard/Instructor";
import BackToTop from "./components/common/BackToTop";
import PrivacyPolicy from "./pages/privacypolicy";
import TermsAndConditions from "./pages/TermsAndConditions";
import CookiePolicy from "./pages/CookiePolicy";
import Report from "./pages/Report";
import Loading from "./components/common/Loading";
import Project from "./pages/Project";
import ShowAllCoursesPage from "./pages/ShowAllCoursesPage";
import StudentDashboard from "./components/core/Dashboard/StudentDashboard";
import AddCategory from "./pages/AddCategory";
import AdminDashboard from "./pages/AdminDashboard";
import EditPage from "./pages/EditPage";
import NotificationManager from "../src/components/admin/NotificationManager";
import Footer from "../src/components/common/Footer";
import Navbar from "./components/common/Navbar";
import Vnavbar from "./components/common/Vnavbar";
import DashboardLayout from "./layouts/DashboardLayout";
import Testimonials from "./pages/Testimonials";
import Copyright from "./pages/Copyright";

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time for demonstration
    setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <div className="flex-1 w-screen bg-[#F3F4F6] flex flex-col font-inter">
      {user ? null : <Navbar/> }
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="catalog/:catalogName" element={<Catalog />} />
        <Route path="courses/:courseId" element={<CourseDetails />} />

        {/* Show all courses route */}
        <Route path="/show-all-courses" element={<ShowAllCoursesPage />} />

        <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
        <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />
        <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword />
            </OpenRoute>
          }
        />
        <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail />
            </OpenRoute>
          }
        />
        <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword />
            </OpenRoute>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/testimonials" element={<Testimonials/>}/>
        <Route path="/contact" element={<Contact />} />
        <Route path="/project" element={<Project />} />
        <Route path="/rateus" element={<Rateus />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsAndConditions />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/copyright" element={<Copyright/>}/>
        <Route path="/report" element={<Report />} />

        {/* EditPage route (accessible to admins only) */}
        <Route path="/edit-pages" element={<EditPage />} />

        {/* NotificationManager route (accessible to admins only) */}
        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <Route
            path="notification-manager"
            element={
              <PrivateRoute>
                <NotificationManager />
              </PrivateRoute>
            }
          />
        )}

<Route
  element={
    <PrivateRoute>
      <DashboardLayout>
        <Dashboard />
      </DashboardLayout>
    </PrivateRoute>
  }
>
          {/* Student dashboard as the default route for students */}
  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <Route path="dashboard" element={<StudentDashboard />} />
  )}

  <Route path="dashboard/my-profile" element={<MyProfile />} />
  <Route path="dashboard/profile" element={<Settings />} />

  {user?.accountType === ACCOUNT_TYPE.STUDENT && (
    <>
      <Route path="dashboard/cart" element={<Cart />} />
      <Route
        path="dashboard/enrolled-courses"
        element={<EnrolledCourses />}
      />
      <Route path="dashboard/student" element={<StudentDashboard />} />
    </>
  )}

        {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
          <>
            <Route path="dashboard/instructor" element={<Instructor />} />
            <Route path="dashboard/add-course" element={<AddCourse />} />
            <Route path="dashboard/my-courses" element={<MyCourses />} />
            <Route
              path="dashboard/edit-course/:courseId"
              element={<EditCourse />}
              />
          </>
        )}
        </Route>

        <Route
          path="view-course/:courseId"
          element={
            <PrivateRoute>
              <ViewCourse />
            </PrivateRoute>
          }
        >
          <Route
            path="section/:sectionId/sub-section/:subSectionId"
            element={<VideoDetails />}
          />
        </Route>

        {/* Conditionally render the admin route */}
        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <Route
            path="createCategory"
            element={
              <PrivateRoute>
                <AddCategory />
              </PrivateRoute>
            }
          />
        )}

        {user?.accountType === ACCOUNT_TYPE.ADMIN && (
          <Route
            path="adminDashboard"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
        )}

        <Route path="*" element={<Error />} />
      </Routes>
      <BackToTop />
      {/* <Chatbot /> */}
      {user ? null : <Footer/>}
    </div>
  );
}

export default App;
