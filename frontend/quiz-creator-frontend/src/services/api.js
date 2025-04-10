const API_BASE_URL = "https://fast-api-quiz-creator.onrender.com";

export async function getQuizzes() {
  const response = await fetch(`${API_BASE_URL}/quizzes`);
  if (!response.ok) throw new Error("Failed to fetch quizzes");
  return await response.json();
}

export async function getQuizDetails(quizName) {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizName}`);
  if (!response.ok) throw new Error(`Failed to fetch quiz: ${quizName}`);
  return await response.json();
}

export async function createQuiz(quizData) {
  const response = await fetch(`${API_BASE_URL}/quizzes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(quizData),
  });
  if (!response.ok) throw new Error("Failed to create quiz");
  return await response.json();
}

export async function submitQuiz(quizName, answers) {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizName}/submit`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ answers }),
  });
  if (!response.ok) throw new Error("Failed to submit answers");
  return await response.json();
}

export async function deleteQuiz(quizName) {
  const response = await fetch(`${API_BASE_URL}/quizzes/${quizName}`, {
    method: "DELETE",
  });
  if (!response.ok) throw new Error(`Failed to delete quiz: ${quizName}`);
  return await response.json();
}
