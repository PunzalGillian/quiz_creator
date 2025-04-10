import React from "react";
import QuizTaker from "../components/QuizTaker";

function TakeQuizPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Take a Quiz
      </h1>
      <QuizTaker />
    </>
  );
}

export default TakeQuizPage;
