import { apiConnector } from '../apiconnector';
import { liveSessionEndpoints } from '../apis';
import { toast } from 'react-hot-toast';

const {
  CREATE_LIVE_SESSION_API,
  GET_COURSE_LIVE_SESSIONS_API,
  GET_LIVE_SESSION_API,
  UPDATE_SESSION_STATUS_API,
  ENROLL_IN_SESSION_API,
  UNENROLL_FROM_SESSION_API,
  DELETE_LIVE_SESSION_API,
  GET_UPCOMING_SESSIONS_API
} = liveSessionEndpoints;

// Create a new live session
export const createLiveSession = async (token, sessionData) => {
  const toastId = toast.loading("Creating live session...");
  try {
    const response = await apiConnector("POST", CREATE_LIVE_SESSION_API, sessionData, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Live session created successfully");
    return response.data;
  } catch (error) {
    console.log("CREATE_LIVE_SESSION_API API ERROR............", error);
    toast.error(error.response?.data?.message || "Failed to create live session");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get all live sessions for a course
export const getCourseLiveSessions = async (token, courseId) => {
  try {
    const response = await apiConnector("GET", GET_COURSE_LIVE_SESSIONS_API + `/${courseId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.log("GET_COURSE_LIVE_SESSIONS_API API ERROR............", error);
    throw error;
  }
};

// Get a specific live session
export const getLiveSession = async (token, sessionId) => {
  try {
    const response = await apiConnector("GET", GET_LIVE_SESSION_API + `/${sessionId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.log("GET_LIVE_SESSION_API API ERROR............", error);
    throw error;
  }
};

// Update session status
export const updateSessionStatus = async (token, sessionId, status) => {
  const toastId = toast.loading("Updating session status...");
  try {
    const response = await apiConnector("PATCH", UPDATE_SESSION_STATUS_API + `/${sessionId}/status`, { status }, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Session status updated successfully");
    return response.data;
  } catch (error) {
    console.log("UPDATE_SESSION_STATUS_API API ERROR............", error);
    toast.error(error.response?.data?.message || "Failed to update session status");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Enroll in a live session
export const enrollInSession = async (token, sessionId) => {
  const toastId = toast.loading("Enrolling in session...");
  try {
    const response = await apiConnector("POST", ENROLL_IN_SESSION_API + `/${sessionId}/enroll`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Successfully enrolled in live session");
    return response.data;
  } catch (error) {
    console.log("ENROLL_IN_SESSION_API API ERROR............", error);
    toast.error(error.response?.data?.message || "Failed to enroll in session");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Unenroll from a live session
export const unenrollFromSession = async (token, sessionId) => {
  const toastId = toast.loading("Unenrolling from session...");
  try {
    const response = await apiConnector("POST", UNENROLL_FROM_SESSION_API + `/${sessionId}/unenroll`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Successfully unenrolled from live session");
    return response.data;
  } catch (error) {
    console.log("UNENROLL_FROM_SESSION_API API ERROR............", error);
    toast.error(error.response?.data?.message || "Failed to unenroll from session");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Delete a live session
export const deleteLiveSession = async (token, sessionId) => {
  const toastId = toast.loading("Deleting live session...");
  try {
    const response = await apiConnector("DELETE", DELETE_LIVE_SESSION_API + `/${sessionId}`, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    toast.success("Live session deleted successfully");
    return response.data;
  } catch (error) {
    console.log("DELETE_LIVE_SESSION_API API ERROR............", error);
    toast.error(error.response?.data?.message || "Failed to delete live session");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }
};

// Get upcoming sessions for user
export const getUpcomingSessions = async (token) => {
  try {
    const response = await apiConnector("GET", GET_UPCOMING_SESSIONS_API, null, {
      Authorization: `Bearer ${token}`,
    });

    if (!response.data.success) {
      throw new Error(response.data.message);
    }

    return response.data;
  } catch (error) {
    console.log("GET_UPCOMING_SESSIONS_API API ERROR............", error);
    throw error;
  }
}; 