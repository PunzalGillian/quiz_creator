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
      const response = await fetch(
        "https://fast-api-quiz-creator.onrender.com/quizzes",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quiz_name: quizName, questions }),
        }
      );

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
      alert("Error creating quiz");
    } finally {
      setIsLoading(false);
    }
  };

  const inputStyle =
    "w-[349px] h-[49px] bg-[#EFEFEF] rounded-[10px] px-4 focus:outline-none";
  const labelStyle = "font-medium mb-2";
  const buttonStyle =
    "w-[349px] h-[49px] rounded-[10px] flex justify-center items-center";

  return (
    <div className="flex justify-center bg-[#c3d5d4] min-h-screen py-10">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center space-y-8"
      >
        <h1 className="text-3xl font-bold text-center mb-4">QUIZ MAKER</h1>

        <div className="flex flex-col mb-6">
          <label className={labelStyle}>Quiz Name:</label>
          <input
            type="text"
            placeholder="Enter Quiz Name"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
            className={inputStyle}
            required
          />
        </div>

        {questions.map((q, index) => (
          <div key={index} className="flex flex-col space-y-6 mb-8">
            <h2 className="text-lg font-semibold mt-4 mb-2">Add A Question:</h2>

            <div className="flex flex-col mb-5">
              <label className={labelStyle}>Enter a question:</label>
              <input
                type="text"
                placeholder={`Question ${index + 1}`}
                value={q.question}
                onChange={(e) =>
                  handleInputChange(index, "question", e.target.value)
                }
                className={inputStyle}
                required
              />
            </div>

            {["a", "b", "c", "d"].map((opt) => (
              <div className="flex flex-col mb-5" key={opt}>
                <label
                  className={labelStyle}
                >{`Option ${opt.toUpperCase()}:`}</label>
                <input
                  type="text"
                  placeholder={`Enter option ${opt.toUpperCase()}`}
                  value={q[`option_${opt}`]}
                  onChange={(e) =>
                    handleInputChange(index, `option_${opt}`, e.target.value)
                  }
                  className={inputStyle}
                  required
                />
              </div>
            ))}

            <div className="flex flex-col mb-5">
              <label className={labelStyle}>Correct Answer:</label>
              <select
                value={q.correct_answer}
                onChange={(e) =>
                  handleInputChange(index, "correct_answer", e.target.value)
                }
                className={inputStyle}
                required
              >
                <option value="">Select correct answer</option>
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D</option>
              </select>
            </div>
          </div>
        ))}

        <div className="mt-6"></div>

        <div className="flex flex-col space-y-6 mt-4">
          <button
            type="button"
            onClick={addQuestion}
            className={`${buttonStyle} bg-[#EFEFEF] text-3xl`}
          >
            +
          </button>

          <button
            type="submit"
            className={`${buttonStyle} bg-[#1B191D] text-white text-xl`}
            disabled={isLoading}
          >
            {isLoading ? "Creating..." : "Create Quiz"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizMakerPage;
