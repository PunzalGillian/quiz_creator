import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateTestPage from "./pages/CreateTestPage";
import TakeTestPage from "./pages/TakeTestPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-quiz" element={<CreateTestPage />} />
        <Route path="/take-quiz" element={<TakeTestPage />} />
      </Routes>
    </div>
  );
}

export default App;
