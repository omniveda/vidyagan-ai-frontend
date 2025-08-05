import React from "react";
import IconBtn from "../common/IconBtn";
import { FaBell } from "react-icons/fa";

function NotificationPermission() {
  // const { isPermissionGranted, requestPermission } = useNotification();

  // if (isPermissionGranted) {
  //   return null; // Don't show if permission is already granted
  // }

  return (
    <div className="bg-richblack-800 border border-richblack-700 rounded-md p-4 mb-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="text-yellow-50 p-2 bg-richblack-700 rounded-full">
          <FaBell size={20} />
        </div>
        <div>
          <h3 className="text-black-5 font-medium">Enable Notifications</h3>
          <p className="text-black-300 text-sm">
            Stay updated with course announcements, new content, and important
            updates
          </p>
        </div>
      </div>
      <IconBtn
        text="Enable"
        onclick={() => {
          // requestPermission(); // This line was removed as per the edit hint
        }}
        customClasses="bg-yellow-50 text-black hover:bg-yellow-100"
      />
    </div>
  );
}

export default NotificationPermission;
