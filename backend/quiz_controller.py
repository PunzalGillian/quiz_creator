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
    answers: str
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
# API Endpoints