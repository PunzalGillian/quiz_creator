import React, { useState, useEffect } from "react";

const QuizTakerPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Fetch available quizzes
  useEffect(() => {
    const fetchQuizzes = async () => {
      setIsLoading(true);
      setError("");

      try {
        // Use the proxy defined in vite.config.js
        const response = await fetch("/api/quizzes");

        if (!response.ok) {
          throw new Error(`Failed to fetch quizzes: ${response.status}`);
        }

        let data = await response.json();
        console.log("Raw quiz data:", data);

        // Normalize data structure
        if (!Array.isArray(data)) {
          if (data.quizzes && Array.isArray(data.quizzes)) {
            data = data.quizzes;
          } else {
            data = [data]; // If it's a single quiz object, wrap it in array
          }
        }

        // Ensure each quiz has a questions property that's an array
        const normalizedQuizzes = data.map((quiz) => ({
          ...quiz,
          questions: Array.isArray(quiz.questions) ? quiz.questions : [],
        }));

        console.log("Normalized quizzes:", normalizedQuizzes);
        setQuizzes(normalizedQuizzes);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  const handleSelectQuiz = async (quizId) => {
    setIsLoading(true);
    setError("");

    try {
      console.log(`Fetching quiz with ID: ${quizId}`);

      // Direct API call for troubleshooting
      const apiUrl = `https://fast-api-quiz-creator.onrender.com/quizzes/${quizId}`;
      console.log(`API URL: ${apiUrl}`);

      // For fetching by ID
      const response = await fetch(`/api/quizzes/id/${quizId}`);

      // For fetching by name
      const responseByName = await fetch(`/api/quizzes/name/${quizName}`);

      console.log(`Response status: ${response.status}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: ${response.status}`);
      }

      let data = await response.json();
      console.log("Full quiz data:", data);

      // If the API returns the quiz with an ID property instead of directly
      if (data && data.id === quizId) {
        // We have the correct quiz object

        // Ensure questions property exists
        if (!data.questions) {
          console.log("Quiz has no questions property, adding empty array");
          data.questions = [];
        } else if (!Array.isArray(data.questions)) {
          console.log("Questions is not an array, converting");
          data.questions = [data.questions];
        }
      } else if (Array.isArray(data)) {
        // API might be returning an array of quizzes, find the one we want
        console.log("Received array response, searching for matching quiz");
        const matchingQuiz = data.find((q) => q.id == quizId);
        if (matchingQuiz) {
          data = matchingQuiz;
          // Ensure questions property exists
          if (!data.questions) {
            data.questions = [];
          } else if (!Array.isArray(data.questions)) {
            data.questions = [data.questions];
          }
        } else {
          throw new Error("Quiz not found in response");
        }
      } else {
        console.error("Unexpected API response format:", data);
        throw new Error("Unexpected API response format");
      }

      if (data.questions && data.questions.length === 0) {
        console.log("Quiz has no questions");
        setError("This quiz doesn't have any questions yet.");
      } else {
        console.log(`Quiz has ${data.questions.length} questions`);
      }

      setCurrentQuiz(data);
      setCurrentQuestionIndex(0);
      setSelectedAnswers({});
      setShowResults(false);
    } catch (err) {
      console.error("Error fetching quiz details:", err);
      setError("Failed to load quiz details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectAnswer = (questionIndex, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleNextQuestion = () => {
    if (!currentQuiz?.questions) return;

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
      setShowResults(true);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const calculateScore = () => {
    if (!currentQuiz?.questions) return 0;

    let correctCount = 0;
    currentQuiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        correctCount++;
      }
    });

    setScore(correctCount);
    return correctCount;
  };

  const resetQuiz = () => {
    setCurrentQuiz(null);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#c3d5d4]">
        <div className="w-full max-w-sm p-6 bg-white rounded-md shadow-md text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#1B191D] mx-auto mb-4"></div>
          <p className="text-xl font-bold">Loading...</p>
        </div>
      </div>
    );
  }

  // Quiz selection screen
  if (!currentQuiz) {
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-[#c3d5d4]">
        <div className="w-full max-w-sm bg-white min-h-[917px] flex flex-col items-center p-6">
          <h1 className="text-[30px] font-bold mt-6 text-center">QUIZ TAKER</h1>

          {error && (
            <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md w-full">
              {error}
            </div>
          )}

          {quizzes.length > 0 ? (
            <div className="w-full mt-8 space-y-4">
              <h2 className="text-xl font-semibold">Select a Quiz:</h2>
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id || Math.random().toString()}
                  className="p-4 bg-[#efefef] rounded-lg cursor-pointer hover:bg-gray-200"
                  onClick={() => handleSelectQuiz(quiz.id)}
                >
                  <h3 className="text-lg font-medium">{quiz.quiz_name}</h3>
                  <p className="text-sm text-gray-600">
                    {quiz.questions && Array.isArray(quiz.questions)
                      ? `${quiz.questions.length} questions`
                      : "Questions will load when selected"}
                  </p>
                  <button
                    className="mt-2 px-4 py-1 bg-[#1B191D] text-white rounded-md text-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectQuiz(quiz.id);
                    }}
                  >
                    Start Quiz
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-4">
                No quizzes available. Create a quiz first!
              </p>
              <button
                className="px-6 py-2 bg-[#1B191D] text-white rounded-lg"
                onClick={() => (window.location.href = "/quiz-maker")}
              >
                Create Quiz
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Show error if quiz has no questions
  if (
    currentQuiz &&
    (!currentQuiz.questions || currentQuiz.questions.length === 0)
  ) {
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-[#c3d5d4]">
        <div className="w-full max-w-sm bg-white min-h-[400px] flex flex-col items-center p-6">
          <h1 className="text-[30px] font-bold mt-6 text-center">QUIZ TAKER</h1>
          <div className="mt-10 text-center">
            <p className="text-xl font-bold mb-2">{currentQuiz.quiz_name}</p>
            <p className="text-red-600 mb-6">
              This quiz doesn't have any questions yet.
            </p>
            <button
              className="px-6 py-2 bg-[#1B191D] text-white rounded-lg"
              onClick={resetQuiz}
            >
              Back to Quiz Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = currentQuiz?.questions?.[currentQuestionIndex];

  // Show error if current question can't be found
  if (!currentQuestion) {
    return (
      <div className="flex flex-col items-center w-full min-h-screen bg-[#c3d5d4]">
        <div className="w-full max-w-sm bg-white min-h-[400px] flex flex-col items-center p-6">
          <h1 className="text-[30px] font-bold mt-6 text-center">QUIZ TAKER</h1>
          <div className="mt-10 text-center">
            <p className="text-red-600 mb-6">Unable to load question.</p>
            <button
              className="px-6 py-2 bg-[#1B191D] text-white rounded-lg"
              onClick={resetQuiz}
            >
              Back to Quiz Selection
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Rest of your component for showing questions and results...
  // (keep your existing code for showing questions and results)

  return (
    <div className="flex flex-col items-center w-full min-h-screen">
      <div className="w-full max-w-sm bg-white min-h-[917px] flex flex-col">
        {/* Question section */}
        <div className="bg-[#c3d5d4] h-[400px] flex items-center justify-center p-6">
          <p className="text-3xl font-bold text-center">
            {currentQuestion.question}
          </p>
        </div>

        {/* Options section */}
        <div className="p-6 space-y-4">
          {/* Option A */}
          <div
            className={`p-5 rounded-[19px] cursor-pointer ${
              selectedAnswers[currentQuestionIndex] === "a"
                ? "bg-[#1a191c] text-white"
                : "bg-[#efefef] text-black"
            }`}
            onClick={() => handleSelectAnswer(currentQuestionIndex, "a")}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl">A. {currentQuestion.option_a}</p>
              {selectedAnswers[currentQuestionIndex] === "a" && (
                <div className="w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          </div>

          {/* Option B */}
          <div
            className={`p-5 rounded-[19px] cursor-pointer ${
              selectedAnswers[currentQuestionIndex] === "b"
                ? "bg-[#1a191c] text-white"
                : "bg-[#efefef] text-black"
            }`}
            onClick={() => handleSelectAnswer(currentQuestionIndex, "b")}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl">B. {currentQuestion.option_b}</p>
              {selectedAnswers[currentQuestionIndex] === "b" && (
                <div className="w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          </div>

          {/* Option C */}
          <div
            className={`p-5 rounded-[19px] cursor-pointer ${
              selectedAnswers[currentQuestionIndex] === "c"
                ? "bg-[#1a191c] text-white"
                : "bg-[#efefef] text-black"
            }`}
            onClick={() => handleSelectAnswer(currentQuestionIndex, "c")}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl">C. {currentQuestion.option_c}</p>
              {selectedAnswers[currentQuestionIndex] === "c" && (
                <div className="w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          </div>

          {/* Option D */}
          <div
            className={`p-5 rounded-[19px] cursor-pointer ${
              selectedAnswers[currentQuestionIndex] === "d"
                ? "bg-[#1a191c] text-white"
                : "bg-[#efefef] text-black"
            }`}
            onClick={() => handleSelectAnswer(currentQuestionIndex, "d")}
          >
            <div className="flex justify-between items-center">
              <p className="text-xl">D. {currentQuestion.option_d}</p>
              {selectedAnswers[currentQuestionIndex] === "d" && (
                <div className="w-6 h-6 flex items-center justify-center">
                  ✓
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              className={`px-6 py-2 rounded-lg ${
                currentQuestionIndex === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-800 text-white"
              }`}
              onClick={handlePrevQuestion}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </button>

            <span className="py-2">
              {currentQuestionIndex + 1} / {currentQuiz.questions.length}
            </span>

            <button
              className="px-6 py-2 bg-[#1B191D] text-white rounded-lg"
              onClick={handleNextQuestion}
            >
              {currentQuestionIndex === currentQuiz.questions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizTakerPage;
