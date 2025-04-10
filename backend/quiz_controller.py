from pydantic import BaseModel
from typing import List
import os

QUIZ_dir = "quizzes"
os.makedirs(QUIZ_dir, exist_ok=True)   

# Data Models
class Question(BaseModel):
    question: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_answer: str

class QuizCreate(BaseModel):
    quiz_name: str
    questions: List[Question]

class Answer(BaseModel):
    quiz_name: str
    answers: str  # This is probably meant to be a single answer or a list of answers

class QuizSubmission(BaseModel):
    quiz_name: str
    score: int

class QuizResult(BaseModel):
    quiz_name: str
    score: int
    total_questions: int

class QuizFile(BaseModel):
    quiz_name: str
    questions: List[Question]
    
# Functions to create, read, and update quiz files
def save_quiz_to_file(quiz_name: str, questions: List[Question]) -> str:
    quiz_file = os.path.join(QUIZ_dir, f"{quiz_name}.txt")

    with open(quiz_file, "w") as file:
        for question in questions:
            question_block = f"{question.question}\n"
            question_block += f"a) {question.option_a}\n"
            question_block += f"b) {question.option_b}\n"
            question_block += f"c) {question.option_c}\n"
            question_block += f"d) {question.option_d}\n"
            question_block += f"Correct answer: {question.correct_answer}\n\n"
            file.write(question_block)
        
    return quiz_file

def load_quiz_from_file(quiz_name: str) -> List[Question]:
    """load and parses the quiz file"""
    quiz_file = os.path.join(QUIZ_dir, f"{quiz_name}.txt")

    if not os.path.exists(quiz_file):
        raise FileNotFoundError(f"The file '{quiz_file}' cannot be found")
    
    with open(quiz_file, "r") as file:
        content = file.read()
    
    parsed_questions = []
    question_blocks = content.strip().split("\n\n")

    for block in question_blocks:
        lines = block.strip().split("\n")

        if not lines:
            continue

        question = lines[0]
        options = lines[1:5]

        if len(lines) < 6:
            continue

        correct_line = lines[5]
        correct_answer = correct_line.split(": ")[1].strip()

        parsed_questions.append({
            "question": question,
            "options": options,
            "correct_answer": correct_answer
        })

    return parsed_questions

# API Endpoints