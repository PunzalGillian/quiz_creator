from pydantic import BaseModel
from typing import List, Dict, Optional

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