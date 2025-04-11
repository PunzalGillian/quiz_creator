import "./App.css";

// Temporarily import the component directly without routing
import QuizMakerPage from "./pages/QuizMakerPage";


function App() {

  return (
    <div className="app-container">
      <QuizMakerPage />
    </div>

    <Routes>
      <Route path="/quiz-maker" element={<QuizMakerPage />} />s
    </Routes>
  );
};

export default App;
