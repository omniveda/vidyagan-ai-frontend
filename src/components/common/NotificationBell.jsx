import React, { useState, useRef, useEffect } from "react";
// import { useNotification } from "../../context/NotificationContext";
import { IoMdNotificationsOutline } from "react-icons/io";

function NotificationBell() {
  // const { notifications, notificationCount, markAsRead, markAllAsRead } =
  //   useNotification();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNotificationClick = (id) => {
    // markAsRead(id); // This line was removed as per the edit hint
    // You can add navigation logic here if needed
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="relative py-2 pl-2 flex text-black hover:text-yellow-50 focus:outline-none"
        onClick={toggleDropdown}
        aria-label="Notifications"
      >
        <IoMdNotificationsOutline size={24} />
        <span className="ml-4">Notifications</span>
        {/* {notificationCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-mwhite bg-red-600 rounded-full">
            {notificationCount > 9 ? "9+" : notificationCount}
          </span>
        )} */}
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 z-10 mt-2 w-80 bg-richblack-800 border border-richblack-700 rounded-md shadow-lg origin-top-left">
          <div className="p-2 border-b border-richblack-700 flex justify-between items-center">
            <h3 className="text-black font-medium">Notifications</h3>
            {/* {notificationCount > 0 && (
              <button
                className="text-xs text-yellow-50 hover:text-yellow-100"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
            )} */}
          </div>
          <div className="max-h-96 overflow-y-auto">
            {/* {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 border-b border-richblack-700 cursor-pointer hover:bg-richblack-700 ${
                    !notification.read ? "bg-richblack-750" : ""
                  }`}
                  onClick={() => handleNotificationClick(notification.id)}
                >
                  <div className="flex items-start">
                    {!notification.read && (
                      <div className="w-2 h-2 mt-2 mr-2 bg-yellow-50 rounded-full"></div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-black">
                        {notification.title}
                      </p>
                      <p className="text-xs text-black-300 mt-1">
                        {notification.body}
                      </p>
                      <p className="text-xs text-black-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 text-center text-black-400">
                No notifications yet
              </div>
            )} */}
          </div>
          {/* {notifications.length > 0 && (
            <div className="p-2 text-center border-t border-black-700">
              <button
                className="text-xs text-yellow-50 hover:text-yellow-100"
                onClick={() => setIsDropdownOpen(false)}
              >
                Close
              </button>
            </div>
          )} */}
        </div>
      )}
    </div>
  );
}

export default NotificationBell;
