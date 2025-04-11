import "./App.css";
import { Routes, Route } from "react-router-dom";
import QuizMakerPage from "./pages/QuizMakerPage";

function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<QuizMakerPage />} />
        <Route path="/quiz-maker" element={<QuizMakerPage />} />
      </Routes>
    </div>
  );
}

export default App;
