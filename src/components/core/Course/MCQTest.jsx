import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { getMCQsForStudent, validateMCQAnswers } from "../../../services/operations/mcqAPI";

const MCQTest = ({ courseId }) => {
  const { token, user } = useSelector((state) => state.auth);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    fetchMCQs();
  }, [courseId]);

  const fetchMCQs = async () => {
    try {
      setLoading(true);
      const response = await getMCQsForStudent(token, courseId);
      if (response.success) {
        setMcqs(response.data);
        // Initialize answers object
        const initialAnswers = {};
        response.data.forEach(mcq => {
          initialAnswers[mcq._id] = null;
        });
        setAnswers(initialAnswers);
      }
    } catch (error) {
      console.error("Error fetching MCQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswerSelect = (mcqId, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [mcqId]: optionIndex
    }));
  };

  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      const response = await validateMCQAnswers(token, courseId, answers);
      if (response.success) {
        setResults(response.data);
        setShowResults(true);
      }
    } catch (error) {
      console.error("Error submitting answers:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const resetTest = () => {
    setResults(null);
    setShowResults(false);
    setAnswers(prev => {
      const resetAnswers = {};
      Object.keys(prev).forEach(key => {
        resetAnswers[key] = null;
      });
      return resetAnswers;
    });
  };

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-4">Loading MCQs...</div>
      </div>
    );
  }

  if (mcqs.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="text-center py-8 text-gray-500">
          No MCQs available for this course yet.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">
        Course Quiz - Practice Test
      </h2>

      {!showResults ? (
        <>
          <div className="mb-6">
            <p className="text-gray-600 mb-2">
              Total Questions: {mcqs.length}
            </p>
            <p className="text-sm text-gray-500">
              This is a practice test. Your score will be shown temporarily and is for practice purposes only.
            </p>
          </div>

          <div className="space-y-6">
            {mcqs.map((mcq, index) => (
              <div key={mcq._id} className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-3">
                  {index + 1}. {mcq.question}
                </h3>
                <div className="space-y-2">
                  {mcq.options.map((option, optionIndex) => (
                    <label
                      key={optionIndex}
                      className={`flex items-center p-3 rounded-lg cursor-pointer transition-colors ${
                        answers[mcq._id] === optionIndex
                          ? "bg-blue-100 border-blue-300"
                          : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                      } border`}
                    >
                      <input
                        type="radio"
                        name={`mcq-${mcq._id}`}
                        value={optionIndex}
                        checked={answers[mcq._id] === optionIndex}
                        onChange={() => handleAnswerSelect(mcq._id, optionIndex)}
                        className="mr-3 h-4 w-4 text-blue-600"
                      />
                      <span className="text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              disabled={submitting || Object.values(answers).some(answer => answer === null)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {submitting ? "Submitting..." : "Submit Answers"}
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              {Object.values(answers).filter(answer => answer !== null).length} of {mcqs.length} questions answered
            </p>
          </div>
        </>
      ) : (
        <div className="text-center">
          <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">
              Test Results
            </h3>
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {results.score} / {results.totalQuestions}
            </div>
            <div className="text-lg text-gray-600">
              {results.percentage}% Correct
            </div>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-3">Question-wise Results:</h4>
            <div className="space-y-3">
              {results.results.map((result, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg ${
                    result.isCorrect ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium">Q{index + 1}: {result.question}</span>
                    {result.isCorrect ? (
                      <FaCheckCircle className="text-green-500" />
                    ) : (
                      <FaTimesCircle className="text-red-500" />
                    )}
                  </div>
                  <div className="text-sm text-gray-600">
                    Your answer: {result.options[result.studentAnswer]}
                    {!result.isCorrect && (
                      <span className="block text-green-600">
                        Correct answer: {result.options[result.correctAnswer]}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={resetTest}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-700"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default MCQTest;
