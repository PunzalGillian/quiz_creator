import React, { useEffect, useState } from "react";
import axios from "axios";

const API_BASE = "https://fast-api-quiz-creator.onrender.com";

export default function QuizApp() {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [quizData, setQuizData] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [newQuiz, setNewQuiz] = useState({ name: "", questions: [] });
  const [newQuestion, setNewQuestion] = useState({});

  const fetchQuizzes = async () => {
    const res = await axios.get(`${API_BASE}/quizzes`);
    setQuizzes(res.data);
  };

  const loadQuiz = async (quizName) => {
    const res = await axios.get(`${API_BASE}/quizzes/${quizName}`);
    setQuizData(res.data);
    setAnswers(new Array(res.data.questions.length).fill(""));
    setResult(null);
  };

  const submitQuiz = async () => {
    const res = await axios.post(
      `${API_BASE}/quizzes/${quizData.quiz_name}/submit`,
      {
        answers: answers.map((a) => ({ answer: a })),
      }
    );
    setResult(res.data);
  };

  const addQuestion = () => {
    setNewQuiz({
      ...newQuiz,
      questions: [...newQuiz.questions, newQuestion],
    });
    setNewQuestion({});
  };

  const createQuiz = async () => {
    await axios.post(`${API_BASE}/quizzes`, {
      quiz_name: newQuiz.name,
      questions: newQuiz.questions,
    });
    setNewQuiz({ name: "", questions: [] });
    fetchQuizzes();
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="p-4 space-y-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold">Quiz WebApp</h1>

      {/* Create Quiz Section */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Create a Quiz</h2>
        <input
          className="border p-2 w-full mb-2"
          placeholder="Quiz Name"
          value={newQuiz.name}
          onChange={(e) => setNewQuiz({ ...newQuiz, name: e.target.value })}
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Question"
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Option A"
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, option_a: e.target.value })
          }
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Option B"
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, option_b: e.target.value })
          }
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Option C"
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, option_c: e.target.value })
          }
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Option D"
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, option_d: e.target.value })
          }
        />
        <input
          className="border p-2 w-full mb-2"
          placeholder="Correct Answer (a/b/c/d)"
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              correct_answer: e.target.value.toLowerCase(),
            })
          }
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={createQuiz}
        >
          Create Quiz
        </button>
      </div>

      {/* Quiz List */}
      <div className="border p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">Available Quizzes</h2>
        <ul className="list-disc pl-5">
          {quizzes.map((q) => (
            <li key={q}>
              <button
                className="text-blue-600 underline"
                onClick={() => loadQuiz(q)}
              >
                {q}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Quiz Viewer */}
      {quizData && (
        <div className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Quiz: {quizData.quiz_name}
          </h2>
          {quizData.questions.map((q, i) => (
            <div key={i} className="mb-4">
              <p className="font-medium">{q.question}</p>
              <div className="space-y-1 mt-2">
                {["a", "b", "c", "d"].map((opt) => (
                  <label key={opt} className="block">
                    <input
                      type="radio"
                      name={`question-${i}`}
                      value={opt}
                      checked={answers[i] === opt}
                      onChange={() => {
                        const updated = [...answers];
                        updated[i] = opt;
                        setAnswers(updated);
                      }}
                    />{" "}
                    {q[`option_${opt}`]}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            className="bg-purple-600 text-white px-4 py-2 rounded"
            onClick={submitQuiz}
          >
            Submit Answers
          </button>
        </div>
      )}

      {/* Result */}
      {result && (
        <div className="border p-4 rounded shadow bg-green-100">
          <h3 className="text-lg font-semibold">Results</h3>
          <p>
            Score: {result.score} / {result.total_questions}
          </p>
          <p>Percentage: {result.percentage}%</p>
        </div>
      )}
    </div>
  );
}
