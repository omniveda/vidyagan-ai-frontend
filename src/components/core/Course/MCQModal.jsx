import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { FaCheckCircle, FaTimesCircle, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { getMCQsForStudent, validateMCQAnswers } from "../../../services/operations/mcqAPI";

const MCQModal = ({ courseId, subsectionId, isOpen, onClose }) => {
  const { token } = useSelector((state) => state.auth);
  const [mcqs, setMcqs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [answers, setAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); // 1 minute in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    if (isOpen && courseId) {
      fetchMCQs();
    }
  }, [isOpen, courseId]);

  useEffect(() => {
    if (mcqs.length > 0 && !showResults) {
      setTimeLeft(60);
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [currentQuestionIndex, mcqs.length, showResults]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < mcqs.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Last question, auto-submit
      handleSubmit();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const fetchMCQs = async () => {
    try {
      setLoading(true);
      const response = await getMCQsForStudent(token, courseId, subsectionId);
      if (response.success) {
        setMcqs(response.data);
        // Initialize answers object
        const initialAnswers = {};
        response.data.forEach(mcq => {
          initialAnswers[mcq._id] = null;
        });
        setAnswers(initialAnswers);
        setResults(null);
        setShowResults(false);
        setCurrentQuestionIndex(0);
        setTimeLeft(60);
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
      const response = await validateMCQAnswers(token, courseId, answers, subsectionId);
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
    setCurrentQuestionIndex(0);
    setTimeLeft(60);
  };

  const handleCloseModal = () => {
    resetTest();
    onClose();
  };

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[black] bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-[white] p-6 rounded-lg shadow-md w-full max-w-2xl mx-4">
          <div className="text-center py-4">Loading MCQs...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[white] p-6 rounded-lg shadow-md w-full max-w-4xl mx-4 h-3/4 overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-800">
            Course Quiz - Practice Test
          </h2>
          <button
            onClick={handleCloseModal}
            className="text-gray-500 hover:text-gray-700 text-xl"
          >
            <FaTimes />
          </button>
        </div>

        {mcqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            No MCQs available for this course yet.
          </div>
        ) : !showResults ? (
          <>
            <div className="mb-6">
              <p className="text-gray-600 mb-2">
                Total Questions: {mcqs.length}
              </p>
              <p className="text-sm text-gray-500">
                This is a practice test. Your score will be shown temporarily and is for practice purposes only.
              </p>
            </div>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">
                  Question {currentQuestionIndex + 1} of {mcqs.length}
                </span>
                <div className="text-lg font-bold text-red-600">
                  Time Left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
              {mcqs.length > 0 && (
                <div className="border border-gray-200 rounded-lg p-6">
                  <h3 className="font-semibold text-gray-800 mb-4 text-xl">
                    {mcqs[currentQuestionIndex].question}
                  </h3>
                  <div className="space-y-3">
                    {mcqs[currentQuestionIndex].options.map((option, optionIndex) => (
                      <label
                        key={optionIndex}
                        className={`flex items-center p-4 rounded-lg cursor-pointer transition-colors ${
                          answers[mcqs[currentQuestionIndex]._id] === optionIndex
                            ? "bg-blue-100 border-blue-300"
                            : "bg-gray-50 hover:bg-gray-100 border-gray-200"
                        } border`}
                      >
                        <input
                          type="radio"
                          name={`mcq-${mcqs[currentQuestionIndex]._id}`}
                          value={optionIndex}
                          checked={answers[mcqs[currentQuestionIndex]._id] === optionIndex}
                          onChange={() => handleAnswerSelect(mcqs[currentQuestionIndex]._id, optionIndex)}
                          className="mr-4 h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700 text-lg">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="sticky bottom-0 bg-[white] pt-4 border-t">
              <div className="flex justify-between items-center mb-4">
                {/* <button
                  onClick={handlePreviousQuestion}
                  disabled={currentQuestionIndex === 0}
                  className="flex items-center bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  <FaChevronLeft className="mr-2" />
                  Previous
                </button> */}
                <span className="text-sm text-gray-500">
                  {Object.values(answers).filter(answer => answer !== null).length} of {mcqs.length} answered
                </span>
                {currentQuestionIndex === mcqs.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="bg-blue-600 text-[white] py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center bg-blue-600 text-[white] py-2 px-4 rounded-lg hover:bg-blue-700"
                  >
                    Next
                    <FaChevronRight className="ml-2" />
                  </button>
                )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center">
            <div className="mb-6">
              <h3 className="text-2xl font-semibold text-[gray]-800 mb-2">
                Test Results
              </h3>
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {results.score} / {results.totalQuestions}
              </div>
              <div className="text-lg text-[gray]-600">
                {results.percentage}% Correct
              </div>
            </div>

            <div className="mb-6 p-4 bg-[gray]-50 rounded-lg max-h-64 overflow-y-auto">
              <h4 className="font-semibold mb-3">Question-wise Results:</h4>
              <div className="space-y-3">
                {results.results.map((result, index) => (
                  <div
                    key={index}
                    className={`p-3 rounded-lg ${
                      result.isCorrect ? "bg-[green]-50" : "bg-[red]-50"
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

            <div className="flex gap-4 justify-center">
              <button
                onClick={resetTest}
                className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-[gray]-700"
              >
                Try Again
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-blue-600 text-[white] py-2 px-6 rounded-lg hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQModal;
