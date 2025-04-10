import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="text-center max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Welcome to Quiz Creator</h1>
      <p className="mb-8">
        Create and take quizzes with this simple application.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Create a Quiz</h2>
          <p className="mb-4 text-gray-600">
            Create your own quiz with multiple-choice questions.
          </p>
          <Link
            to="/create"
            className="inline-block bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
          >
            Create Quiz
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-bold mb-3">Take a Quiz</h2>
          <p className="mb-4 text-gray-600">
            Test your knowledge by taking a quiz.
          </p>
          <Link
            to="/take"
            className="inline-block bg-green-500 text-white py-2 px-6 rounded hover:bg-green-600"
          >
            Take Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
