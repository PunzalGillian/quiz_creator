import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import QuizMaker from "./components/QuizMaker";
import QuizTaker from "./components/QuizTaker";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-blue-600 text-white shadow-md">
          <div className="container mx-auto p-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold">Quiz Creator</h1>
              <nav>
                <ul className="flex space-x-6">
                  <li>
                    <Link to="/" className="hover:text-blue-200 transition">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/create"
                      className="hover:text-blue-200 transition"
                    >
                      Create Quiz
                    </Link>
                  </li>
                  <li>
                    <Link to="/take" className="hover:text-blue-200 transition">
                      Take Quiz
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="container mx-auto py-8 px-4">
          <Routes>
            <Route
              path="/"
              element={
                <div className="text-center max-w-2xl mx-auto">
                  <h1 className="text-3xl font-bold mb-6">
                    Welcome to Quiz Creator
                  </h1>
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
              }
            />
            <Route path="/create" element={<QuizMaker />} />
            <Route path="/take" element={<QuizTaker />} />
          </Routes>
        </main>

        <footer className="bg-gray-800 text-white py-4 mt-auto">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; {new Date().getFullYear()} Quiz Creator App</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
