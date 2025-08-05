// // import { useSelector } from "react-redux";
// // import { Outlet, useNavigate } from "react-router-dom";
// // import Sidebar from "../components/core/Dashboard/Sidebar";
// // import IconBtn from "../components/common/IconBtn";

// // import NotificationPermission from "../components/common/NotificationPermission";

// // function Dashboard() {
// //   const navigate = useNavigate();
// //   const { loading: profileLoading, user } = useSelector(
// //     (state) => state.profile
// //   );
// //   const { loading: authLoading } = useSelector((state) => state.auth);

// //   if (profileLoading || authLoading) {
// //     return (
// //       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
// //         <div className="spinner"></div>
// //       </div>
// //     );
// //   }

// //   const showSidebar =
// //     user?.accountType === "Instructor" || user?.accountType === "Admin";

// //   return (
// //     <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
// //       {/* Conditionally render Sidebar */}
// //       {showSidebar && <Sidebar />}
// //       <div className={`flex-1 overflow-auto ${showSidebar ? "" : "w-full"}`}>
// //         <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
// //           {/* Add the notification permission component */}
// //           {/* <NotificationPermission /> */}

// //           {/* My Profile Title */}
// //           {/* <h2 className="text-2xl font-bold text-richblack-900 mb-4">
// //             My Profile
// //           </h2> */}

// //           {/* Outlet to render other pages inside Dashboard */}
// //           <Outlet />

// //           {user?.accountType === "Admin" && (
// //             <div className="mb-6 flex gap-4">
// //               <IconBtn
// //                 text="Statistics"
// //                 onclick={() => navigate("/adminDashboard")}
// //                 customClasses="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
// //               />
// //               <IconBtn
// //                 text="Create Category"
// //                 onclick={() => navigate("/createcategory")}
// //                 customClasses="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
// //               />
// //               <IconBtn
// //                 text="Edit Pages"
// //                 onclick={() => navigate("/edit-pages")}
// //                 customClasses="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
// //               />
// //               <IconBtn
// //                 text="Notifications"
// //                 onclick={() => navigate("/notification-manager")}
// //                 customClasses="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2"
// //               />
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // export default Dashboard;

// // dashboard update

// import { useSelector } from "react-redux";
// import { Outlet, useNavigate, Navigate } from "react-router-dom";
// import Sidebar from "../components/core/Dashboard/Sidebar";
// import IconBtn from "../components/common/IconBtn";
// import { ACCOUNT_TYPE } from "../utils/constants";
// import { useEffect } from "react";

// function Dashboard() {
//   const navigate = useNavigate();
//   const { loading: profileLoading, user } = useSelector(
//     (state) => state.profile
//   );
//   const { loading: authLoading } = useSelector((state) => state.auth);

//   if (profileLoading || authLoading) {
//     return (
//       <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
//         <div className="spinner"></div>
//       </div>
//     );
//   }

//   // If the user is a student and they're at exactly /dashboard, redirect to the student dashboard
//   // if (
//   //   user?.accountType === ACCOUNT_TYPE.STUDENT &&
//   //   window.location.pathname === "/dashboard"
//   // ) {
//   //   return <Navigate to="/dashboard/student" replace />;
//   // }
//   // In Dashboard.jsx
//   useEffect(() => {
//     // When component mounts, check if at /dashboard route and redirect if student
//     if (
//       user?.accountType === ACCOUNT_TYPE.STUDENT &&
//       (window.location.pathname === "/dashboard" ||
//         window.location.pathname === "/dashboard/my-profile")
//     ) {
//       navigate("/dashboard/student", { replace: true });
//     }
//   }, [user, navigate]);

//   const showSidebar =
//     user?.accountType === ACCOUNT_TYPE.INSTRUCTOR ||
//     user?.accountType === ACCOUNT_TYPE.ADMIN;

//   return (
//     <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row">
//       {/* Conditionally render Sidebar */}
//       {showSidebar && <Sidebar />}
//       <div className={`flex-1 overflow-auto ${showSidebar ? "" : "w-full"}`}>
//         <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
//           {/* Outlet to render other pages inside Dashboard */}
//           <Outlet />

//           {user?.accountType === ACCOUNT_TYPE.ADMIN && (
//             <div className="mb-6 flex flex-wrap gap-4">
//               <IconBtn
//                 text="Statistics"
//                 onclick={() => navigate("/adminDashboard")}
//                 customClasses="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
//               />
//               <IconBtn
//                 text="Create Category"
//                 onclick={() => navigate("/createcategory")}
//                 customClasses="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
//               />
//               <IconBtn
//                 text="Edit Pages"
//                 onclick={() => navigate("/edit-pages")}
//                 customClasses="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
//               />
//               <IconBtn
//                 text="Notifications"
//                 onclick={() => navigate("/notification-manager")}
//                 customClasses="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2"
//               />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;

import { useSelector } from "react-redux";
import { Outlet, useNavigate, Navigate } from "react-router-dom";
import Sidebar from "../components/core/Dashboard/Sidebar";
import IconBtn from "../components/common/IconBtn";
import { ACCOUNT_TYPE } from "../utils/constants";
import { useEffect } from "react";

function Dashboard() {
  const navigate = useNavigate();
  const { loading: profileLoading, user } = useSelector(
    (state) => state.profile
  );
  const { loading: authLoading } = useSelector((state) => state.auth);

  if (profileLoading || authLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    );
  }

  // Redirect logic for different user types
  // if (
  //   user?.accountType === ACCOUNT_TYPE.STUDENT &&
  //   window.location.pathname === "/dashboard"
  // ) {
  //   return <Navigate to="/dashboard/student" replace />;
  // }

  // In Dashboard.jsx
  useEffect(() => {
    // When component mounts, check if at /dashboard route and redirect if student
    if (
      user?.accountType === ACCOUNT_TYPE.STUDENT &&
      (window.location.pathname === "/dashboard" ||
        window.location.pathname === "/dashboard/my-profile")
    ) {
      navigate("/dashboard/student", { replace: true });
    }
  }, [user, navigate]);

  // if (
  //   user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
  //   window.location.pathname === "/dashboard"
  // ) {
  //   return <Navigate to="/dashboard/instructor" replace />;
  // }
  useEffect(() => {
    // When component mounts, check if at /dashboard route and redirect if student
    if (
      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR &&
      (window.location.pathname === "/dashboard" ||
        window.location.pathname === "/dashboard/my-profile")
    ) {
      navigate("/dashboard/instructor", { replace: true });
    }
  }, [user, navigate]);

  // Only show sidebar for admin - not for instructor anymore
  const showSidebar = user?.accountType === ACCOUNT_TYPE.ADMIN;

  return (
    <div className="relative flex min-h-[calc(100vh-3.5rem)] flex-col md:flex-row bg-[#F3F4F6]">
      {/* Conditionally render Sidebar only for admin */}
      {showSidebar && <Sidebar />}

      <div className={`flex-1 overflow-auto ${showSidebar ? "" : "w-full"}`}>
        <div className="mx-auto w-full max-w-[1000px] py-10 px-4 sm:px-6 lg:px-8">
          {/* Outlet to render other pages inside Dashboard */}
          <Outlet />

          {user?.accountType === ACCOUNT_TYPE.ADMIN && (
            <div className="mb-6 flex flex-wrap gap-4">
              <IconBtn
                text="Statistics"
                onclick={() => navigate("/adminDashboard")}
                customClasses="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              />
              <IconBtn
                text="Create Category"
                onclick={() => navigate("/createcategory")}
                customClasses="bg-green-600 hover:bg-green-700 text-white px-6 py-2"
              />
              <IconBtn
                text="Edit Pages"
                onclick={() => navigate("/edit-pages")}
                customClasses="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2"
              />
              <IconBtn
                text="Notifications"
                onclick={() => navigate("/notification-manager")}
                customClasses="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
