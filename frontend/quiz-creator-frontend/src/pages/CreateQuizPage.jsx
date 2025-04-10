import React from "react";
import QuizMaker from "../components/QuizMaker";

function CreateQuizPage() {
  return (
    <>
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">
        Create a New Quiz
      </h1>
      <QuizMaker />
    </>
  );
}

export default CreateQuizPage;
