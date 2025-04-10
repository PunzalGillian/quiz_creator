import React, { useState } from "react";
import { createQuiz } from "../services/api";

export default function QuizMaker() {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    option_a: "",
    option_b: "",
    option_c: "",
    option_d: "",
    correct_answer: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  // Handle input changes for the current question
  const handleQuestionChange = (field, value) => {
    setCurrentQuestion({
      ...currentQuestion,
      [field]: value,
    });
  };

  // Add question to the list
  const addQuestion = () => {
    // Validate all fields are completed
    if (
      !currentQuestion.question ||
      !currentQuestion.option_a ||
      !currentQuestion.option_b ||
      !currentQuestion.option_c ||
      !currentQuestion.option_d ||
      !currentQuestion.correct_answer
    ) {
      setError("Please fill all fields for the question");
      return;
    }

    // Validate correct_answer is one of a, b, c, d
    if (
      !["a", "b", "c", "d"].includes(
        currentQuestion.correct_answer.toLowerCase()
      )
    ) {
      setError("Correct answer must be one of: a, b, c, d");
      return;
    }

    // Add question to list
    setQuestions([...questions, { ...currentQuestion }]);

    // Clear form for next question
    setCurrentQuestion({
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "",
    });

    setError(null);
    setMessage("Question added successfully!");

    // Clear message after 3 seconds
    setTimeout(() => setMessage(null), 3000);
  };

  // Remove question from the list
  const removeQuestion = (index) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
  };

  // Submit quiz to API
  const handleCreateQuiz = async () => {
    // Validate quiz name
    if (!quizName.trim()) {
      setError("Please enter a quiz name");
      return;
    }

    // Validate at least one question
    if (questions.length === 0) {
      setError("Please add at least one question to the quiz");
      return;
    }

    // Format questions for API
    const formattedQuiz = {
      quiz_name: quizName,
      questions: questions,
    };

    try {
      setIsLoading(true);
      setError(null);
      await createQuiz(formattedQuiz);
      setMessage("Quiz created successfully!");

      // Reset the form
      setQuizName("");
      setQuestions([]);

      // Clear success message after 5 seconds
      setTimeout(() => setMessage(null), 5000);
    } catch (err) {
      console.error("Error creating quiz:", err);
      setError(err.message || "Failed to create quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
        Create Quiz
      </h2>

      {/* Error and Success Messages */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {message && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
          <p>{message}</p>
        </div>
      )}

      {/* Quiz Name Input */}
      <div className="mb-4">
        <label
          htmlFor="quiz-name"
          className="block text-gray-700 font-medium mb-2"
        >
          Quiz Name
        </label>
        <input
          id="quiz-name"
          type="text"
          value={quizName}
          onChange={(e) => setQuizName(e.target.value)}
          className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter quiz name"
        />
      </div>

      {/* Questions List */}
      {questions.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">
            Questions ({questions.length})
          </h3>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-md border relative"
              >
                <button
                  onClick={() => removeQuestion(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <div className="font-medium">
                  Question {index + 1}: {q.question}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2 text-sm">
                  <div>A: {q.option_a}</div>
                  <div>B: {q.option_b}</div>
                  <div>C: {q.option_c}</div>
                  <div>D: {q.option_d}</div>
                </div>
                <div className="mt-1 text-green-600">
                  Correct: {q.correct_answer.toUpperCase()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Question Form */}
      <div className="bg-gray-50 p-4 rounded-md mb-6">
        <h3 className="text-lg font-medium mb-3">Add Question</h3>

        <div className="mb-3">
          <label className="block text-gray-700 text-sm mb-1">Question</label>
          <input
            type="text"
            value={currentQuestion.question}
            onChange={(e) => handleQuestionChange("question", e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Enter your question"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="block text-gray-700 text-sm mb-1">Option A</label>
            <input
              type="text"
              value={currentQuestion.option_a}
              onChange={(e) => handleQuestionChange("option_a", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Option A"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Option B</label>
            <input
              type="text"
              value={currentQuestion.option_b}
              onChange={(e) => handleQuestionChange("option_b", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Option B"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Option C</label>
            <input
              type="text"
              value={currentQuestion.option_c}
              onChange={(e) => handleQuestionChange("option_c", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Option C"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm mb-1">Option D</label>
            <input
              type="text"
              value={currentQuestion.option_d}
              onChange={(e) => handleQuestionChange("option_d", e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Option D"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm mb-1">
            Correct Answer
          </label>
          <select
            value={currentQuestion.correct_answer}
            onChange={(e) =>
              handleQuestionChange("correct_answer", e.target.value)
            }
            className="w-full p-2 border rounded"
          >
            <option value="">Select correct answer</option>
            <option value="a">A</option>
            <option value="b">B</option>
            <option value="c">C</option>
            <option value="d">D</option>
          </select>
        </div>

        <button
          onClick={addQuestion}
          className="bg-blue-500 text-white py-1 px-4 rounded hover:bg-blue-600"
        >
          Add Question
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-between items-center">
        <button
          onClick={handleCreateQuiz}
          disabled={isLoading || questions.length === 0}
          className={`${
            isLoading || questions.length === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          } text-white font-medium py-2 px-6 rounded`}
        >
          {isLoading ? "Creating..." : "Create Quiz"}
        </button>

        <span className="text-sm text-gray-500">
          {questions.length} question{questions.length !== 1 && "s"} added
        </span>
      </div>
    </div>
  );
}
