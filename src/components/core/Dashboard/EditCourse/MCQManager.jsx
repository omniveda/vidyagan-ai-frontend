import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlus, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { createMCQ, getMCQsByCourse, updateMCQ, deleteMCQ } from "../../../../services/operations/mcqAPI";

const MCQManager = ({ courseId, subsectionId }) => {
  const { token } = useSelector((state) => state.auth);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMcq, setEditingMcq] = useState(null);
  const [formData, setFormData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: 0
  });

  useEffect(() => {
    fetchMCQs();
  }, [courseId, subsectionId]);

  const fetchMCQs = async () => {
    try {
      setLoading(true);
      if (!subsectionId) {
        setMcqs([]);
        setLoading(false);
        return;
      }
      const response = await getMCQsByCourse(token, courseId, subsectionId);
      if (response.success) {
        setMcqs(response.data);
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e, index = null) => {
    const { name, value } = e.target;
    
    if (name.startsWith("option")) {
      const optionIndex = parseInt(name.replace("option", ""));
      const newOptions = [...formData.options];
      newOptions[optionIndex] = value;
      setFormData({ ...formData, options: newOptions });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mcqData = {
        ...formData,
        courseId,
        subsectionId,
        correctAnswer: parseInt(formData.correctAnswer)
      };

      let response;
      if (editingMcq) {
        response = await updateMCQ(token, editingMcq._id, mcqData);
      } else {
        response = await createMCQ(token, mcqData);
      }

      if (response.success) {
        setShowAddForm(false);
        setEditingMcq(null);
        setFormData({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: 0
        });
        fetchMCQs();
      }
    } catch (error) {
      console.error("Error saving MCQ:", error);
    }
  };

  const handleEdit = (mcq) => {
    setEditingMcq(mcq);
    setFormData({
      question: mcq.question,
      options: [...mcq.options],
      correctAnswer: mcq.correctAnswer
    });
    setShowAddForm(true);
  };

  const handleDelete = async (mcqId) => {
    if (window.confirm("Are you sure you want to delete this MCQ?")) {
      try {
        const response = await deleteMCQ(token, mcqId);
        if (response.success) {
          fetchMCQs();
        }
      } catch (error) {
        console.error("Error deleting MCQ:", error);
      }
    }
  };

  const cancelEdit = () => {
    setShowAddForm(false);
    setEditingMcq(null);
    setFormData({
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    });
  };

  return (
    <div className="bg-[white] p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">MCQ Management</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-blue-600 text-[white] px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
        >
          <FaPlus /> Add MCQ
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h3 className="text-lg font-semibold mb-4">
            {editingMcq ? "Edit MCQ" : "Add New MCQ"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Question
              </label>
              <input
                type="text"
                name="question"
                value={formData.question}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              {formData.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    name="correctAnswer"
                    value={index}
                    checked={parseInt(formData.correctAnswer) === index}
                    onChange={handleInputChange}
                    className="h-4 w-4"
                  />
                  <input
                    type="text"
                    name={`option${index}`}
                    value={option}
                    onChange={(e) => handleInputChange(e, index)}
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder={`Option ${index + 1}`}
                    required
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
              >
                {editingMcq ? "Update" : "Create"} MCQ
              </button>
              <button
                type="button"
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">Loading MCQs...</div>
      ) : (
        <div className="space-y-4">
          {mcqs.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No MCQs found for this course. Add your first MCQ to get started.
            </div>
          ) : (
            mcqs.map((mcq) => (
              <div key={mcq._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold text-gray-800">{mcq.question}</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(mcq)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(mcq._id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
                <div className="space-y-1">
                  {mcq.options.map((option, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-2 ${
                        index === mcq.correctAnswer ? "text-green-600 font-medium" : "text-gray-600"
                      }`}
                    >
                      {index === mcq.correctAnswer ? (
                        <FaCheck className="h-3 w-3" />
                      ) : (
                        <FaTimes className="h-3 w-3" />
                      )}
                      <span>{option}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MCQManager;
