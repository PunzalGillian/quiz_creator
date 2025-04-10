import os
from fastapi import APIRouter, HTTPException
from typing import List
from ..models import QuizCreate, QuizInfo, QuizSubmission, QuizResult
from ..database import (
    get_all_quizzes, 
    get_quiz, 
    save_quiz_to_db,
    delete_quiz_from_db
)
from bson import ObjectId

router = APIRouter(
    prefix="/quizzes",
    tags=["quizzes"],
    responses={404: {"description": "Quiz not found"}},
)

@router.get("/", response_model=List[QuizInfo])
async def list_quizzes():
    """Get a list of all available quizzes"""
    quizzes = await get_all_quizzes()
    return [
        {
            "quiz_name": quiz["quiz_name"],
            "total_questions": len(quiz.get("questions", [])) 
        }
        for quiz in quizzes if quiz
    ]

@router.post("/", status_code=201)
async def create_quiz(quiz: QuizCreate):
    """Create a new quiz"""
    quiz_name = quiz.quiz_name
    
    # Check if quiz already exists
    existing_quiz = await get_quiz(quiz_name)
    if existing_quiz:
        raise HTTPException(status_code=409, detail=f"Quiz '{quiz_name}' already exists")
    
    # Validate correct_answer is a, b, c, or d
    for i, question in enumerate(quiz.questions):
        if question.correct_answer not in ["a", "b", "c", "d"]:
            raise HTTPException(
                status_code=400,
                detail=f"Question {i+1}: correct_answer must be one of: a, b, c, d"
            )
    
    # Save the quiz to MongoDB
    quiz_data = quiz.dict()
    inserted_id = await save_quiz_to_db(quiz_data)
    
    return {
        "message": f"Quiz '{quiz_name}' created successfully",
        "id": str(inserted_id)
    }

@router.get("/{quiz_name}")
async def get_quiz_by_name(quiz_name: str):
    """Get a specific quiz (without correct answers)"""
    quiz = await get_quiz(quiz_name)
    
    if not quiz:
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")
    
    # Create a copy of the questions without correct answers
    questions_for_client = []
    for q in quiz["questions"]:
        # Create a copy of the question without correct_answer
        q_copy = {k: v for k, v in q.items() if k != "correct_answer"}
        questions_for_client.append(q_copy)
    
    return {
        "quiz_name": quiz["quiz_name"],
        "questions": questions_for_client,
        "total_questions": len(questions_for_client)
    }

@router.post("/{quiz_name}/submit", response_model=QuizResult)
async def submit_quiz(quiz_name: str, submission: QuizSubmission):
    """Submit answers for a quiz and get results"""
    quiz = await get_quiz(quiz_name)
    
    if not quiz:
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")
    
    # Validate answers
    answers = submission.answers
    questions = quiz["questions"]
    
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
    # Check if quiz exists
    quiz = await get_quiz(quiz_name)
    if not quiz:
        raise HTTPException(status_code=404, detail=f"Quiz '{quiz_name}' not found")
    
    # Delete the quiz
    success = await delete_quiz_from_db(quiz_name)
    if success:
        return {"message": f"Quiz '{quiz_name}' deleted successfully"}
    else:
        raise HTTPException(status_code=500, detail=f"Failed to delete quiz '{quiz_name}'")