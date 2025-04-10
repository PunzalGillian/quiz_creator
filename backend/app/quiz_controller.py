from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel
from typing import List, Dict, Optional
import os
import uvicorn
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Quiz API", description="API for creating and taking quizzes")

# Configure quiz storage directory
QUIZ_DIR = os.path.join(os.path.dirname(__file__), '..', 'quizzes')
os.makedirs(QUIZ_DIR, exist_ok=True)

# Data Models - Improved for FastAPI
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
    answer: str  # Single answer (a, b, c, or d)

class QuizSubmission(BaseModel):
    answers: List[Answer]

class QuizResultItem(BaseModel):
    question: str
    user_answer: str
    correct_answer: str
    is_correct: bool

class QuizResult(BaseModel):
    quiz_name: str
    score: int
    total_questions: int
    percentage: float
    results: List[QuizResultItem]

class QuizInfo(BaseModel):
    quiz_name: str
    total_questions: int

# Helper functions
def save_quiz(quiz_name: str, questions: List[Question]) -> str:
    """
    Save a quiz to a file
    
    Args:
        quiz_name: Name of the quiz
        questions: List of Question objects
    
    Returns:
        Path to the saved quiz file
    """
    quiz_file = os.path.join(QUIZ_DIR, f"{quiz_name}.txt")
    
    with open(quiz_file, "w") as file:
        for question in questions:
            # Format question and answers in a readable format
            question_block = f"{question.question}\n"
            question_block += f"a) {question.option_a}\n"
            question_block += f"b) {question.option_b}\n"
            question_block += f"c) {question.option_c}\n"
            question_block += f"d) {question.option_d}\n"
            question_block += f"Correct answer: {question.correct_answer}\n\n"
            file.write(question_block)
    
    return quiz_file

def load_quiz(quiz_name: str) -> List[Dict]:
    """
    Load a quiz from a file
    
    Args:
        quiz_name: Name of the quiz
    
    Returns:
        List of parsed question dictionaries
    """
    quiz_file = os.path.join(QUIZ_DIR, f"{quiz_name}.txt")
    
    if not os.path.exists(quiz_file):
        return None
    
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
        
        correct_line = lines[5]
        correct_answer = correct_line.split(": ")[1].strip()
        
        parsed_questions.append({
            "question": question,
            "options": options,
            "correct_answer": correct_answer
        })
    
    return parsed_questions

# API Routes
@app.get("/")
async def home():
    return {
        "message": "Quiz API is running",
        "endpoints": {
            "GET /quizzes": "List all available quizzes",
            "GET /quizzes/{quiz_name}": "Get quiz details",
            "POST /quizzes": "Create a new quiz",
            "POST /quizzes/{quiz_name}/submit": "Submit answers and get results",
            "DELETE /quizzes/{quiz_name}": "Delete a quiz"
        }
    }

@app.get("/quizzes", response_model=List[QuizInfo])
async def list_quizzes():
    """Get a list of all available quizzes"""
    quizzes = []
    
    for filename in os.listdir(QUIZ_DIR):
        if filename.endswith('.txt'):
            quiz_name = filename[:-4]  # Remove .txt extension
            questions = load_quiz(quiz_name)
            quizzes.append({
                "quiz_name": quiz_name,
                "total_questions": len(questions) if questions else 0
            })
    
    return quizzes

@app.post("/quizzes", status_code=201)
async def create_quiz(quiz: QuizCreate):
    """Create a new quiz"""
    quiz_name = quiz.quiz_name
    
    # Check if quiz already exists
    quiz_path = os.path.join(QUIZ_DIR, f"{quiz_name}.txt")
    if os.path.exists(quiz_path):
        raise HTTPException(status_code=409, detail=f"Quiz '{quiz_name}' already exists")
    
    # Validate correct_answer is a, b, c, or d
    for i, question in enumerate(quiz.questions):
        if question.correct_answer not in ["a", "b", "c", "d"]:
            raise HTTPException(
                status_code=400,
                detail=f"Question {i+1}: correct_answer must be one of: a, b, c, d"
            )
    
    # Save the quiz
    quiz_file = save_quiz(quiz_name, quiz.questions)
    
    return {
        "message": f"Quiz '{quiz_name}' created successfully",
        "filename": quiz_file
    }

@app.get("/quizzes/{quiz_name}")
async def get_quiz(quiz_name: str):
    """Get a specific quiz (without correct answers)"""
    questions = load_quiz(quiz_name)
    
    if questions is None:
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")
    
    # Remove correct answers before sending to client
    for question in questions:
        del question["correct_answer"]
    
    return {
        "quiz_name": quiz_name,
        "questions": questions,
        "total_questions": len(questions)
    }

@app.post("/quizzes/{quiz_name}/submit", response_model=QuizResult)
async def submit_quiz(quiz_name: str, submission: QuizSubmission):
    """Submit answers for a quiz and get results"""
    questions = load_quiz(quiz_name)
    
    if questions is None:
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")
    
    # Validate answers
    answers = submission.answers
    if len(answers) != len(questions):
        raise HTTPException(
            status_code=400,
            detail=f"Expected {len(questions)} answers, got {len(answers)}"
        )
    
    # Grade the quiz
    score = 0
    results = []
    
    for i, (question, answer) in enumerate(zip(questions, answers)):
        user_answer = answer.answer.lower()
        correct_answer = question["correct_answer"]
        is_correct = user_answer == correct_answer
        
        if is_correct:
            score += 1
        
        results.append({
            "question": question["question"],
            "user_answer": user_answer,
            "correct_answer": correct_answer,
            "is_correct": is_correct
        })
    
    percentage = (score / len(questions)) * 100 if questions else 0
    
    return {
        "quiz_name": quiz_name,
        "score": score,
        "total_questions": len(questions),
        "percentage": round(percentage, 1),
        "results": results
    }

@app.delete("/quizzes/{quiz_name}")
async def delete_quiz(quiz_name: str):
    """Delete a quiz"""
    quiz_path = os.path.join(QUIZ_DIR, f"{quiz_name}.txt")
    
    if not os.path.exists(quiz_path):
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")
    
    try:
        os.remove(quiz_path)
        return {"message": f"Quiz '{quiz_name}' deleted successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to delete quiz: {str(e)}")

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("DEBUG", "False").lower() == "true"
    
    # Use the correct import path based on where you run it from
    import sys
    if os.path.basename(os.getcwd()) == "backend":
        uvicorn.run("app.quiz_controller:app", host=host, port=port, reload=debug)
    else:
        uvicorn.run("backend.app.quiz_controller:app", host=host, port=port, reload=debug)