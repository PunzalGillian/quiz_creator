from fastapi import FastAPI
import uvicorn
import os
from dotenv import load_dotenv
from .routes.quizzes import router as quiz_router

# Load environment variables from .env file
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Quiz API",
    description="API for creating and taking quizzes",
    version="1.0.0",
)

# Include routers
app.include_router(quiz_router)

@app.get("/")
async def root():
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

if __name__ == "__main__":
    host = os.getenv("HOST", "0.0.0.0")
    port = int(os.getenv("PORT", "8000"))
    debug = os.getenv("DEBUG", "False").lower() == "true"
    
    # Run the app
    uvicorn.run("app.main:app", host=host, port=port, reload=debug)