import os
from fastapi import APIRouter, HTTPException
from typing import List
from ..models import QuizCreate, QuizInfo, QuizSubmission, QuizResult
from ..utils import save_quiz, load_quiz, QUIZ_DIR

router = APIRouter(
    prefix="/quizzes",
    tags=["quizzes"],
    responses={404: {"description": "Quiz not found"}},
)

@router.get("/", response_model=List[QuizInfo])
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

@router.post("/", status_code=201)
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

@router.get("/{quiz_name}")
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

@router.post("/{quiz_name}/submit", response_model=QuizResult)
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

@router.delete("/{quiz_name}")
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