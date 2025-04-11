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

  // Handle quiz name change
  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  // Handle changes to question fields
  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  // Add a new question
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

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const quizData = {
      quiz_name: quizName,
      questions: questions,
    };

    console.log(quizData); // Replace with API call to save quiz
    alert("Quiz created successfully!");
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-[412px] h-[917px] bg-white">
        <div className="relative h-[917px] bg-[#c3d5d4]">
          {/* Header */}
          <div className="absolute top-[92px] left-1/2 transform -translate-x-1/2 font-bold text-black text-3xl whitespace-nowrap">
            QUIZ MAKER
          </div>

          {/* Form Container */}
          <form
            onSubmit={handleSubmit}
            className="w-[349px] absolute top-[152px] left-[31px]"
          >
            {/* Quiz Name */}
            <div className="mb-6">
              <label className="block text-[21px] mb-2">Quiz Name:</label>
              <input
                type="text"
                value={quizName}
                onChange={handleQuizNameChange}
                placeholder="Enter Quiz Name"
                className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
                required
              />
            </div>

            {/* Questions */}
            {questions.map((question, index) => (
              <div key={index} className="mb-6 pb-4 border-b border-gray-200">
                <div className="mb-4">
                  <label className="block text-[21px] mb-2">
                    {index === 0 ? "Add a Question:" : `Question ${index + 1}:`}
                  </label>
                  <input
                    type="text"
                    value={question.question}
                    onChange={(e) =>
                      handleQuestionChange(index, "question", e.target.value)
                    }
                    placeholder="Enter a Question"
                    className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
                    required
                  />
                </div>

                {/* Option A */}
                <div className="mb-3">
                  <label className="block text-[21px] mb-2">Option A:</label>
                  <input
                    type="text"
                    value={question.option_a}
                    onChange={(e) =>
                      handleQuestionChange(index, "option_a", e.target.value)
                    }
                    placeholder="Enter Option A"
                    className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
                    required
                  />
                </div>

                {/* Option B */}
                <div className="mb-3">
                  <label className="block text-[21px] mb-2">Option B:</label>
                  <input
                    type="text"
                    value={question.option_b}
                    onChange={(e) =>
                      handleQuestionChange(index, "option_b", e.target.value)
                    }
                    placeholder="Enter Option B"
                    className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
                    required
                  />
                </div>

                {/* Option C */}
                <div className="mb-3">
                  <label className="block text-[21px] mb-2">Option C:</label>
                  <input
                    type="text"
                    value={question.option_c}
                    onChange={(e) =>
                      handleQuestionChange(index, "option_c", e.target.value)
                    }
                    placeholder="Enter Option C"
                    className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
                    required
                  />
                </div>

                {/* Option D */}
                <div className="mb-3">
                  <label className="block text-[21px] mb-2">Option D:</label>
                  <input
                    type="text"
                    value={question.option_d}
                    onChange={(e) =>
                      handleQuestionChange(index, "option_d", e.target.value)
                    }
                    placeholder="Enter Option D"
                    className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
                    required
                  />
                </div>

                {/* Correct Answer */}
                <div className="mb-3">
                  <label className="block text-[21px] mb-2">
                    Correct Answer:
                  </label>
                  <select
                    value={question.correct_answer}
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correct_answer",
                        e.target.value
                      )
                    }
                    className="w-full h-[49px] bg-[#efefef] rounded-[10px] px-4 py-2"
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

            {/* Add Question Button */}
            <div
              className="w-full h-[49px] bg-[#efefef] rounded-[10px] mt-4 mb-4 flex justify-center items-center cursor-pointer"
              onClick={addQuestion}
            >
              <span className="text-[42px] font-light">+</span>
            </div>

            {/* Create Quiz Button */}
            <button
              type="submit"
              className="w-full h-[49px] bg-[#3b82f6] text-white rounded-[10px] text-xl"
            >
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuizMakerPage;
