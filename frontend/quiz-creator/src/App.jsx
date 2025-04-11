import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import QuizMakerPage from "./pages/QuizMakerPage";
import QuizTakerPage from "./pages/QuizTakerPage";

function App() {
  return (
    <div className="app-container">
      <nav className="bg-[#1B191D] text-white p-4">
        <div className="container mx-auto flex justify-center space-x-8">
          <Link to="/quiz-maker" className="hover:underline">
            Create Quiz
          </Link>
          <Link to="/quiz-taker" className="hover:underline">
            Take Quiz
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<QuizMakerPage />} />
        <Route path="/quiz-maker" element={<QuizMakerPage />} />
        <Route path="/quiz-taker" element={<QuizTakerPage />} />
      </Routes>
    </div>
  );
}

export default App;
