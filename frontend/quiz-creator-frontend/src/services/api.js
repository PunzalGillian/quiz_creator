// services/api.js
export async function getQuizzes() {
  const response = await fetch(
    "https://fast-api-quiz-creator.onrender.com/quizzes"
  );
  if (!response.ok) throw new Error("Failed to fetch quizzes");
  return await response.json();
}

export async function getQuizDetails(quizName) {
  const response = await fetch(
    `https://fast-api-quiz-creator.onrender.com/quizzes/${quizName}`
  );
  if (!response.ok) throw new Error(`Failed to fetch quiz: ${quizName}`);
  return await response.json();
}

export async function submitQuiz(quizName, answers) {
  const response = await fetch(
    `https://fast-api-quiz-creator.onrender.com/quizzes/${quizName}/submit`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ answers }),
    }
  );
  if (!response.ok) throw new Error("Failed to submit answers");
  return await response.json();
}

export async function createQuiz(quizData) {
  const response = await fetch(
    "https://fast-api-quiz-creator.onrender.com/quizzes",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quizData),
    }
  );
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create quiz");
  }
  return await response.json();
}
