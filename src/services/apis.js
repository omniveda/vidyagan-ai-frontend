const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

// AUTH ENDPOINTS
export const endpoints = {
  SENDOTP_API: BASE_URL + "/auth/sendotp",
  SIGNUP_API: BASE_URL + "/auth/signup",
  // LOGIN_API: BASE_URL + "/auth/login",
  LOGIN_API: BASE_URL + "/auth/login",
  RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
  RESETPASSWORD_API: BASE_URL + "/auth/reset-password",
  GOOGLE_LOGIN_API: BASE_URL + "/auth/googlelogin",
};

// PROFILE ENDPOINTS
export const profileEndpoints = {
  GET_USER_DETAILS_API: BASE_URL + "/profile/getUserDetails",
  GET_USER_ENROLLED_COURSES_API: BASE_URL + "/profile/getEnrolledCourses",
  GET_INSTRUCTOR_DATA_API: BASE_URL + "/profile/instructorDashboard",
  DOWNLOAD_CERTIFICATE_API: BASE_URL + "/profile/certificate", // <--- add this
};

// STUDENTS ENDPOINTS
export const studentEndpoints = {
  COURSE_PAYMENT_API: BASE_URL + "/payment/capturePayment",
  COURSE_VERIFY_API: BASE_URL + "/payment/verifyPayment",
  SEND_PAYMENT_SUCCESS_EMAIL_API: BASE_URL + "/payment/sendPaymentSuccessEmail",
  GET_USER_RECEIPTS_API: BASE_URL + "/payment/receipts",
  GET_RECEIPT_BY_ID_API: BASE_URL + "/payment/receipt",
};

// COURSE ENDPOINTS
export const courseEndpoints = {
  GET_ALL_COURSE_API: BASE_URL + "/course/getAllCourses",
  COURSE_DETAILS_API: BASE_URL + "/course/getCourseDetails",
  EDIT_COURSE_API: BASE_URL + "/course/editCourse",
  COURSE_CATEGORIES_API: BASE_URL + "/course/showAllCategories",
  CREATE_COURSE_API: BASE_URL + "/course/createCourse",
  CREATE_SECTION_API: BASE_URL + "/course/addSection",
  CREATE_SUBSECTION_API: BASE_URL + "/course/addSubSection",
  UPDATE_SECTION_API: BASE_URL + "/course/updateSection",
  UPDATE_SUBSECTION_API: BASE_URL + "/course/updateSubSection",
  GET_ALL_INSTRUCTOR_COURSES_API: BASE_URL + "/course/getInstructorCourses",
  DELETE_SECTION_API: BASE_URL + "/course/deleteSection",
  DELETE_SUBSECTION_API: BASE_URL + "/course/deleteSubSection",
  DELETE_COURSE_API: BASE_URL + "/course/deleteCourse",
  GET_FULL_COURSE_DETAILS_AUTHENTICATED:
    BASE_URL + "/course/getFullCourseDetails",
  LECTURE_COMPLETION_API: BASE_URL + "/course/updateCourseProgress",
  CREATE_RATING_API: BASE_URL + "/course/createRating",
  HAS_REVIEWED_API: BASE_URL + "/course/has-reviewed", // <--- add this

  GET_COURSE_REVIEWS_API: BASE_URL + "/course/getCourseReviews", // New endpoint
};

// RATINGS AND REVIEWS
export const ratingsEndpoints = {
  REVIEWS_DETAILS_API: BASE_URL + "/course/getReviews",
};

// CATAGORIES API
export const categories = {
  CATEGORIES_API: BASE_URL + "/course/showAllCategories",
};

// CATALOG PAGE DATA
export const catalogData = {
  CATALOGPAGEDATA_API: BASE_URL + "/course/getCategoryPageDetails",
};
// CONTACT-US API
export const contactusEndpoint = {
  CONTACT_US_API: BASE_URL + "/reach/contact",
};

// SETTINGS PAGE API
export const settingsEndpoints = {
  UPDATE_DISPLAY_PICTURE_API: BASE_URL + "/profile/updateDisplayPicture",
  UPDATE_PROFILE_API: BASE_URL + "/profile/updateProfile",
  CHANGE_PASSWORD_API: BASE_URL + "/auth/changepassword",
  DELETE_PROFILE_API: BASE_URL + "/profile/deleteProfile",
};

export const courses = {
  COURSES_API: BASE_URL + "/course/getAllCourses",
};

// PAGE CONTENT ENDPOINTS
export const pageEndpoints = {
  FETCH_PAGE_CONTENT: BASE_URL + "/pages/:pageName", // Fetch page content
  UPDATE_PAGE_CONTENT: BASE_URL + "/pages/:pageName", // Update page content
};

// NOTIFICATION ENDPOINTS
export const notificationEndpoints = {
  SEND_TO_ALL_API: BASE_URL + "/notifications/send-to-all",
  SEND_TO_GROUP_API: BASE_URL + "/notifications/send-to-group",
  GET_NOTIFICATION_HISTORY_API: BASE_URL + "/notifications/history",
  REGISTER_FCM_TOKEN_API: BASE_URL + "/notifications/register-token",
};

// LIVE SESSION ENDPOINTS
export const liveSessionEndpoints = {
  CREATE_LIVE_SESSION_API: BASE_URL + "/live-sessions/create",
  GET_COURSE_LIVE_SESSIONS_API: BASE_URL + "/live-sessions/course",
  GET_LIVE_SESSION_API: BASE_URL + "/live-sessions",
  UPDATE_SESSION_STATUS_API: BASE_URL + "/live-sessions",
  ENROLL_IN_SESSION_API: BASE_URL + "/live-sessions",
  UNENROLL_FROM_SESSION_API: BASE_URL + "/live-sessions",
  DELETE_LIVE_SESSION_API: BASE_URL + "/live-sessions",
  GET_UPCOMING_SESSIONS_API: BASE_URL + "/live-sessions/upcoming/all",
};
