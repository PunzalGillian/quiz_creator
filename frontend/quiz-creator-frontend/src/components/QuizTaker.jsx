import React, { useState, useEffect } from "react";
import { getQuizzes, getQuizDetails, submitQuiz } from "../services/api";

export default function QuizTaker() {
  const [quizList, setQuizList] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch quiz list when component loads
  useEffect(() => {
    fetchQuizzes();
  }, []);

  // Get all available quizzes
  const fetchQuizzes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await getQuizzes();
      setQuizList(data);
    } catch (err) {
      console.error("Error fetching quizzes:", err);
      setError("Failed to load quiz list. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Load a specific quiz
  const handleQuizSelect = async (quizName) => {
    try {
      setIsLoading(true);
      setError(null);
      setResults(null);

      const data = await getQuizDetails(quizName);
      setQuizData(data);
      setSelectedQuiz(quizName);
      // Initialize empty answers array
      setAnswers(new Array(data.questions.length).fill(""));
    } catch (err) {
      console.error("Error loading quiz:", err);
      setError(`Failed to load quiz "${quizName}". Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  // Record user's answers
  const handleAnswerSelect = (questionIndex, answer) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  // Submit answers for grading
  const handleSubmit = async () => {
    // Check if all questions are answered
    if (answers.some((answer) => !answer)) {
      setError("Please answer all questions before submitting.");
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Format answers for API
      const formattedAnswers = answers.map((answer) => ({ answer }));

      const data = await submitQuiz(selectedQuiz, formattedAnswers);
      setResults(data);
    } catch (err) {
      console.error("Error submitting answers:", err);
      setError("Failed to submit answers. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // Reset and select another quiz
  const handleReset = () => {
    setSelectedQuiz(null);
    setQuizData(null);
    setAnswers([]);
    setResults(null);
  };

  // Retake the current quiz
  const handleRetake = () => {
    setAnswers(new Array(quizData.questions.length).fill(""));
    setResults(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      {/* Error Display */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {/* Loading Spinner */}
      {isLoading && (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Quiz Selection Screen */}
      {!isLoading && !selectedQuiz && (
        <div>
          <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
            Take a Quiz
          </h2>

          {quizList.length === 0 ? (
            <p className="text-gray-500">
              No quizzes available. Create a quiz first!
            </p>
          ) : (
            <>
              <p className="mb-4 text-gray-600">Select a quiz to begin:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {quizList.map((quiz) => (
                  <div
                    key={quiz.quiz_name}
                    className="border p-4 rounded-lg hover:bg-blue-50 cursor-pointer transition"
                    onClick={() => handleQuizSelect(quiz.quiz_name)}
                  >
                    <h3 className="font-medium text-blue-600">
                      {quiz.quiz_name}
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      {quiz.total_questions} question
                      {quiz.total_questions !== 1 && "s"}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Quiz Questions */}
      {!isLoading && selectedQuiz && quizData && !results && (
        <div>
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              {quizData.quiz_name}
            </h2>
            <button
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to quiz list
            </button>
          </div>

          {quizData.questions.map((question, index) => (
            <div key={index} className="mb-8 pb-6 border-b">
              <h3 className="text-lg font-medium mb-4">
                Question {index + 1}: {question.question}
              </h3>

              <div className="space-y-3">
                {["a", "b", "c", "d"].map((option) => (
                  <label
                    key={option}
                    className={`flex items-center p-3 rounded border cursor-pointer
                      ${
                        answers[index] === option
                          ? "bg-blue-50 border-blue-300"
                          : "hover:bg-gray-50"
                      }`}
                  >
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={option}
                      checked={answers[index] === option}
                      onChange={() => handleAnswerSelect(index, option)}
                      className="mr-2"
                    />
                    <span className="font-medium mr-2">
                      {option.toUpperCase()}.
                    </span>
                    {question[`option_${option}`]}
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="mt-6">
            <button
              onClick={handleSubmit}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
            >
              Submit Answers
            </button>
          </div>
        </div>
      )}

      {/* Results Display */}
      {!isLoading && results && (
        <div>
          <div className="flex justify-between items-center mb-6 border-b pb-2">
            <h2 className="text-2xl font-bold text-gray-800">
              Quiz Results: {results.quiz_name}
            </h2>
            <button
              onClick={handleReset}
              className="text-gray-600 hover:text-gray-800"
            >
              ← Back to quiz list
            </button>
          </div>

          {/* Score Summary */}
          <div className="bg-blue-50 p-6 rounded-lg mb-8 text-center">
            <div className="text-4xl font-bold mb-1 text-blue-800">
              {results.percentage}%
            </div>
            <div className="text-xl mb-4">
              Score: {results.score} / {results.total_questions}
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-600 h-3 rounded-full"
                style={{ width: `${results.percentage}%` }}
              ></div>
            </div>
          </div>

          {/* Detailed Results */}
          <h3 className="font-medium text-lg mb-4">Question Results:</h3>
          <div className="space-y-4 mb-8">
            {results.results.map((result, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg ${
                  result.is_correct ? "bg-green-50" : "bg-red-50"
                }`}
              >
                <div className="flex justify-between">
                  <div className="font-medium">Question {index + 1}</div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      result.is_correct
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {result.is_correct ? "Correct" : "Incorrect"}
                  </span>
                </div>

                <div className="mt-2">
                  Your answer:{" "}
                  <span className="font-medium">
                    {result.answer.toUpperCase()}
                  </span>
                </div>

                {!result.is_correct && (
                  <div className="mt-1 text-red-700">
                    Correct answer:{" "}
                    <span className="font-medium">
                      {result.correct_answer.toUpperCase()}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleRetake}
              className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
            >
              Retake Quiz
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-200 text-gray-800 py-2 px-6 rounded hover:bg-gray-300"
            >
              Choose Another Quiz
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
