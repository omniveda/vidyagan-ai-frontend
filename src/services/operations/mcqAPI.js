import api from "../../lib/axios";

// Create MCQ
export const createMCQ = async (token, mcqData) => {
  try {
    const response = await api.post("/api/v1/mcq/create", mcqData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating MCQ:", error);
    throw error;
  }
};

// Get MCQs for a course or subsection (instructor)
export const getMCQsByCourse = async (token, courseId, subsectionId = null) => {
  try {
    const url = subsectionId
      ? `/api/v1/mcq/course/${courseId}/${subsectionId}`
      : `/api/v1/mcq/course/${courseId}`;
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching MCQs:", error);
    throw error;
  }
};

// Get MCQs for student by course or subsection
export const getMCQsForStudent = async (token, courseId, subsectionId = null) => {
  try {
    const url = subsectionId
      ? `/api/v1/mcq/student/course/${courseId}/${subsectionId}`
      : `/api/v1/mcq/student/course/${courseId}`;
    const response = await api.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching MCQs for student:", error);
    throw error;
  }
};

// Update MCQ
export const updateMCQ = async (token, mcqId, mcqData) => {
  try {
    const response = await api.put(`/api/v1/mcq/${mcqId}`, mcqData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating MCQ:", error);
    throw error;
  }
};

// Delete MCQ
export const deleteMCQ = async (token, mcqId) => {
  try {
    const response = await api.delete(`/api/v1/mcq/${mcqId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting MCQ:", error);
    throw error;
  }
};

// Validate student answers by course or subsection
export const validateMCQAnswers = async (token, courseId, answers, subsectionId = null) => {
  try {
    const url = subsectionId
      ? `/api/v1/mcq/validate/${courseId}/${subsectionId}`
      : `/api/v1/mcq/validate/${courseId}`;
    const response = await api.post(
      url,
      { answers },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error validating answers:", error);
    throw error;
  }
};
