// import React, { useState, useEffect } from "react";
// import { useSelector } from "react-redux";
// import { apiConnector } from "../../services/apis";
// import { notificationEndpoints } from "../../services/apis";
// import { toast } from "react-hot-toast";
// import IconBtn from "../common/IconBtn";

// function NotificationManager() {
//   const { token } = useSelector((state) => state.auth);
//   const [title, setTitle] = useState("");
//   const [message, setMessage] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [targetAudience, setTargetAudience] = useState("all");
//   const [notificationHistory, setNotificationHistory] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [historyLoading, setHistoryLoading] = useState(false);

//   useEffect(() => {
//     fetchNotificationHistory();
//   }, []);

//   const fetchNotificationHistory = async () => {
//     try {
//       setHistoryLoading(true);
//       const response = await apiConnector(
//         "GET",
//         notificationEndpoints.GET_NOTIFICATION_HISTORY_API,
//         null,
//         {
//           Authorization: `Bearer ${token}`,
//         }
//       );

//       if (response.data.success) {
//         setNotificationHistory(response.data.data);
//       }
//     } catch (error) {
//       console.error("Error fetching notification history:", error);
//       toast.error("Failed to load notification history");
//     } finally {
//       setHistoryLoading(false);
//     }
//   };

//   const handleSendNotification = async (e) => {
//     e.preventDefault();

//     if (!title || !message) {
//       toast.error("Title and message are required");
//       return;
//     }

//     try {
//       setLoading(true);
//       const payload = {
//         title,
//         body: message,
//         imageUrl: imageUrl || undefined,
//       };

//       let response;
//       if (targetAudience === "all") {
//         response = await apiConnector(
//           "POST",
//           notificationEndpoints.SEND_TO_ALL_API,
//           payload,
//           {
//             Authorization: `Bearer ${token}`,
//           }
//         );
//       } else {
//         response = await apiConnector(
//           "POST",
//           notificationEndpoints.SEND_TO_GROUP_API,
//           {
//             ...payload,
//             userType: targetAudience,
//           },
//           {
//             Authorization: `Bearer ${token}`,
//           }
//         );
//       }

//       if (response.data.success) {
//         toast.success("Notification sent successfully");
//         setTitle("");
//         setMessage("");
//         setImageUrl("");
//         setTargetAudience("all");
//         fetchNotificationHistory();
//       } else {
//         toast.error(response.data.message || "Failed to send notification");
//       }
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       toast.error("Failed to send notification");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col p-6">
//       <h1 className="text-2xl font-bold mb-6 text-richblack-5">
//         Notification Manager
//       </h1>

//       {/* Notification Form */}
//       <div className="bg-richblack-800 p-6 rounded-md mb-8">
//         <h2 className="text-xl font-semibold mb-4 text-richblack-5">
//           Send New Notification
//         </h2>
//         <form onSubmit={handleSendNotification}>
//           {/* Title Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="title"
//               className="block text-sm font-medium text-richblack-100 mb-1"
//             >
//               Notification Title *
//             </label>
//             <input
//               type="text"
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               placeholder="Enter notification title"
//               className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
//               required
//             />
//           </div>

//           {/* Message Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="message"
//               className="block text-sm font-medium text-richblack-100 mb-1"
//             >
//               Notification Message *
//             </label>
//             <textarea
//               id="message"
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               placeholder="Enter notification message"
//               className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50 min-h-[100px]"
//               required
//             />
//           </div>

//           {/* Image URL Input */}
//           <div className="mb-4">
//             <label
//               htmlFor="imageUrl"
//               className="block text-sm font-medium text-richblack-100 mb-1"
//             >
//               Image URL (Optional)
//             </label>
//             <input
//               type="url"
//               id="imageUrl"
//               value={imageUrl}
//               onChange={(e) => setImageUrl(e.target.value)}
//               placeholder="Enter image URL for notification"
//               className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
//             />
//           </div>

//           {/* Target Audience Select */}
//           <div className="mb-6">
//             <label
//               htmlFor="targetAudience"
//               className="block text-sm font-medium text-richblack-100 mb-1"
//             >
//               Target Audience
//             </label>
//             <select
//               id="targetAudience"
//               value={targetAudience}
//               onChange={(e) => setTargetAudience(e.target.value)}
//               className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-richblack-5 focus:outline-none focus:ring-1 focus:ring-yellow-50"
//             >
//               <option value="all">All Users</option>
//               <option value="Student">Students Only</option>
//               <option value="Instructor">Instructors Only</option>
//             </select>
//           </div>

//           {/* Submit Button */}
//           <IconBtn
//             type="submit"
//             text="Send Notification"
//             disabled={loading}
//             customClasses="w-full bg-yellow-50 text-black hover:bg-yellow-100"
//           >
//             {loading && <span className="animate-spin mr-2">⟳</span>}
//           </IconBtn>
//         </form>
//       </div>

//       {/* Notification History */}
//       <div className="bg-richblack-800 p-6 rounded-md">
//         <h2 className="text-xl font-semibold mb-4 text-richblack-5">
//           Notification History
//         </h2>

//         {historyLoading ? (
//           <div className="flex justify-center p-4">
//             <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-50"></div>
//           </div>
//         ) : notificationHistory.length > 0 ? (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-richblack-700 rounded-md">
//               <thead>
//                 <tr>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-richblack-100">
//                     Title
//                   </th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-richblack-100">
//                     Message
//                   </th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-richblack-100">
//                     Sent To
//                   </th>
//                   <th className="py-3 px-4 text-left text-xs font-medium text-richblack-100">
//                     Sent At
//                   </th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {notificationHistory.map((notification) => (
//                   <tr
//                     key={notification.id}
//                     className="border-t border-richblack-600"
//                   >
//                     <td className="py-4 px-4 text-sm text-richblack-5">
//                       {notification.title}
//                     </td>
//                     <td className="py-4 px-4 text-sm text-richblack-5">
//                       {notification.body}
//                     </td>
//                     <td className="py-4 px-4 text-sm text-richblack-5">
//                       {notification.sentTo}
//                     </td>
//                     <td className="py-4 px-4 text-sm text-richblack-5">
//                       {new Date(notification.sentAt).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         ) : (
//           <p className="text-center text-richblack-300 py-4">
//             No notification history available.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default NotificationManager;

// claude updated

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { apiConnector } from "././../../services/apiconnector";
import { notificationEndpoints } from "./../../services/apis";
import toast from "react-hot-toast";
import IconBtn from "../common/IconBtn";

function NotificationManager() {
  const { token } = useSelector((state) => state.auth);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [targetAudience, setTargetAudience] = useState("all");
  const [notificationHistory, setNotificationHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchNotificationHistory();
  }, []);

  const fetchNotificationHistory = async () => {
    try {
      setHistoryLoading(true);
      const response = await apiConnector(
        "GET",
        notificationEndpoints.GET_NOTIFICATION_HISTORY_API,
        null,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      if (response.data.success) {
        setNotificationHistory(response.data.notifications);
      }
    } catch (error) {
      console.error("Error fetching notification history:", error);
      toast.error("Failed to load notification history");
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSendNotification = async (e) => {
    e.preventDefault();

    if (!title || !message) {
      toast.error("Title and message are required");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        title,
        body: message,
        imageUrl: imageUrl || undefined,
        data: {
          // Add any additional data for deep linking
          timestamp: new Date().toISOString(),
        },
      };

      let response;
      if (targetAudience === "all") {
        response = await apiConnector(
          "POST",
          notificationEndpoints.SEND_TO_ALL_API,
          payload,
          {
            Authorization: `Bearer ${token}`,
          }
        );
      } else {
        response = await apiConnector(
          "POST",
          notificationEndpoints.SEND_TO_GROUP_API,
          {
            ...payload,
            userType: targetAudience,
          },
          {
            Authorization: `Bearer ${token}`,
          }
        );
      }

      // if (response.data.success) {
      //   toast.success(
      //     `Notification sent successfully to ${response.data.message
      //       .split(" ")
      //       .pop()} devices`
      //   );
      if (response.data.success) {
        toast.success(`Notification sent successfully to devices`);
        setTitle("");
        setMessage("");
        setImageUrl("");
        setTargetAudience("all");
        fetchNotificationHistory();
      } else {
        toast.error(response.data.message || "Failed to send notification");
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      toast.error("Failed to send notification");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-6 bg-richblack-900 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-black">
        Notification Manager
      </h1>

      {/* Notification Form */}
      <div className="bg-richblack-800 p-6 rounded-md mb-8 shadow-md">
        <h2 className="text-xl font-semibold mb-6 text-black">
          Send New Notification
        </h2>
        <form onSubmit={handleSendNotification}>
          {/* Title Input */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-richblack-100 mb-2"
            >
              Notification Title *
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notification title"
              className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-yellow-50"
              required
            />
          </div>

          {/* Message Input */}
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-sm font-medium text-richblack-100 mb-2"
            >
              Notification Message *
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter notification message"
              className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-yellow-50 min-h-[120px]"
              required
            />
          </div>

          {/* Image URL Input */}
          {/* <div className="mb-4">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-richblack-100 mb-2"
            >
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="Enter image URL for notification"
              className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-yellow-50"
            />
          </div> */}

          {/* Target Audience Select */}
          <div className="mb-6">
            <label
              htmlFor="targetAudience"
              className="block text-sm font-medium text-richblack-100 mb-2"
            >
              Target Audience
            </label>
            <select
              id="targetAudience"
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full p-3 bg-richblack-700 border border-richblack-600 rounded-md text-black focus:outline-none focus:ring-1 focus:ring-yellow-50"
            >
              <option value="all">All Users</option>
              {/* <option value="Student">Students Only</option> */}
              {/* <option value="Instructor">Instructors Only</option> */}
              {/* <option value="Admin">Admins Only</option> */}
            </select>
          </div>

          {/* Submit Button */}
          <IconBtn
            type="submit"
            text={loading ? "Sending..." : "Send Notification"}
            disabled={loading}
            customClasses="w-full bg-yellow-50 text-black hover:bg-yellow-100 py-3"
          >
            {loading && <span className="animate-spin mr-2">⟳</span>}
          </IconBtn>
        </form>
      </div>

      {/* Notification History */}
      <div className="bg-richblack-800 p-6 rounded-md shadow-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-black">
            Notification History
          </h2>
          <IconBtn
            text="Refresh"
            onclick={fetchNotificationHistory}
            disabled={historyLoading}
            customClasses="bg-richblack-700 text-richblack-50 hover:bg-richblack-600"
          />
        </div>

        {historyLoading ? (
          <div className="flex justify-center p-6">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-50"></div>
          </div>
        ) : notificationHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-richblack-700 rounded-md">
              <thead>
                <tr className="border-b border-richblack-600">
                  <th className="py-3 px-4 text-left text-xs font-medium text-black-100">
                    Title
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black-100">
                    Message
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black-100">
                    Sent To
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black-100">
                    Success/Failure
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium text-black-100">
                    Sent At
                  </th>
                </tr>
              </thead>
              <tbody>
                {notificationHistory.map((notification) => (
                  <tr
                    key={notification.id}
                    className="border-b border-richblack-600 hover:bg-richblack-600"
                  >
                    <td className="py-4 px-4 text-sm text-black">
                      {notification.title}
                    </td>
                    <td className="py-4 px-4 text-sm text-black">
                      {notification.body}
                    </td>
                    <td className="py-4 px-4 text-sm text-black">
                      {notification.sentTo}
                    </td>
                    <td className="py-4 px-4 text-sm text-black">
                      <span className="text-green-500">
                        {notification.successCount}
                      </span>
                      {" / "}
                      <span className="text-red-500">
                        {notification.failureCount}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-black">
                      {new Date(notification.sentAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-center text-richblack-300 py-6">
            No notification history available.
          </p>
        )}
      </div>
    </div>
  );
}

export default NotificationManager;
