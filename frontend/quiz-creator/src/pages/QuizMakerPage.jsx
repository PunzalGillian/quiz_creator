import React, { useState } from "react";

const QuizMakerPage = () => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([
    {
      question: "",
      option_a: "",
      option_b: "",
      option_c: "",
      option_d: "",
      correct_answer: "",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        option_a: "",
        option_b: "",
        option_c: "",
        option_d: "",
        correct_answer: "",
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/quizzes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quiz_name: quizName, questions }),
      });

      if (!response.ok) throw new Error("Failed to create quiz");

      alert("Quiz created successfully!");
      setQuizName("");
      setQuestions([
        {
          question: "",
          option_a: "",
          option_b: "",
          option_c: "",
          option_d: "",
          correct_answer: "",
        },
      ]);
    } catch (error) {
      console.error(error);
      setError("Error creating quiz. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-[#c3d5d4]">
      <div className="w-full max-w-sm bg-white h-[917px] flex flex-col items-center">
        {/* Title */}
        <h1 className="text-[30px] font-bold mt-6 text-center">QUIZ MAKER</h1>

        {/* Form Group */}
        <form onSubmit={handleSubmit} className="w-[90%] mt-10 space-y-6">
          {/* Quiz Name */}
          <div>
            <label className="text-[21px] font-normal">Quiz Name</label>
            <div className="mt-1 bg-[#efefef] rounded-[10px] h-[49px] flex items-center px-4">
              <input
                type="text"
                placeholder="Enter quiz name"
                value={quizName}
                onChange={(e) => setQuizName(e.target.value)}
                className="bg-transparent w-full text-[20px] focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Questions */}
          {questions.map((q, index) => (
            <div
              key={index}
              className="mb-6 p-4 bg-gray-100 rounded-lg shadow-md border border-gray-300"
            >
              {/* Question Header */}
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Question {index + 1}
              </h2>

              {/* Question Input */}
              <div className="mb-4">
                <label className="text-[21px] font-normal">Question</label>
                <div className="mt-1 bg-[#efefef] rounded-[10px] h-[49px] flex items-center px-4">
                  <input
                    type="text"
                    placeholder="Enter question"
                    value={q.question}
                    onChange={(e) =>
                      handleInputChange(index, "question", e.target.value)
                    }
                    className="bg-transparent w-full text-[20px] focus:outline-none"
                    required
                  />
                </div>
              </div>

              {/* Options */}
              {["a", "b", "c", "d"].map((opt) => (
                <div key={opt} className="mb-4">
                  <label className="text-[21px] font-normal">
                    Option {opt.toUpperCase()}
                  </label>
                  <div className="mt-1 bg-[#efefef] rounded-[10px] h-[49px] flex items-center px-4">
                    <input
                      type="text"
                      placeholder={`Option ${opt.toUpperCase()}`}
                      value={q[`option_${opt}`]}
                      onChange={(e) =>
                        handleInputChange(
                          index,
                          `option_${opt}`,
                          e.target.value
                        )
                      }
                      className="bg-transparent w-full text-[20px] focus:outline-none"
                      required
                    />
                  </div>
                </div>
              ))}

              {/* Correct Answer */}
              <div>
                <label className="text-[21px] font-normal">
                  Correct Answer
                </label>
                <div className="mt-1 bg-#efefef rounded-[10px] h-[49px] flex items-center px-4">
                  <select
                    value={q.correct_answer}
                    onChange={(e) =>
                      handleInputChange(index, "correct_answer", e.target.value)
                    }
                    className="bg-transparent w-full text-[20px] focus:outline-none"
                    required
                  >
                    <option value="">Select Correct Answer</option>
                    <option value="a">A</option>
                    <option value="b">B</option>
                    <option value="c">C</option>
                    <option value="d">D</option>
                  </select>
                </div>
              </div>
            </div>
          ))}

          {/* Add Question Button */}
          <div className="mt-10 w-[90%]">
            <div
              onClick={addQuestion}
              className="h-[49px] w-full flex justify-center items-center bg-[#efefef] rounded-[10px] cursor-pointer"
            >
              <span className="text-[42px] font-light text-black">+</span>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-4 w-[90%]">
            <button
              type="submit"
              className="w-full h-[49px] bg-[#1B191D] text-white rounded-[10px] flex justify-center items-center text-[20px] font-normal hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? "Creating..." : "Submit Quiz"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuizMakerPage;
