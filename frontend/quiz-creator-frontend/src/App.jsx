import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import CreateQuizPage from "./pages/CreateQuizPage";
import TakeQuizPage from "./pages/TakeQuizPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="create" element={<CreateQuizPage />} />
          <Route path="take" element={<TakeQuizPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
