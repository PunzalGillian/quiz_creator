from fastapi import FastAPI
import uvicorn
import os
from dotenv import load_dotenv
from .routes.quizzes import router as quiz_router
from motor.motor_asyncio import AsyncIOMotorClient

# Load environment variables from .env file
load_dotenv()

# Create FastAPI app
app = FastAPI(
    title="Quiz API",
    description="API for creating and taking quizzes",
    version="1.0.0",
)

# MongoDB connection
@app.on_event("startup")
async def startup_db_client():
    app.mongodb_client = AsyncIOMotorClient(os.getenv("MONGODB_URL", "mongodb://localhost:27017"))
    app.mongodb = app.mongodb_client[os.getenv("DB_NAME", "quizzes_db")]
    
    # Create an index on quiz_name for faster lookups
    await app.mongodb.quizzes.create_index("quiz_name", unique=True)
    
    print("Connected to MongoDB!")

@app.on_event("shutdown")
async def shutdown_db_client():
    app.mongodb_client.close()
    print("MongoDB connection closed")

# Include routers
app.include_router(quiz_router)

@app.get("/")
async def root():
    return {
        "message": "Quiz API is running with MongoDB",
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
    
    # Run the app directly
    import uvicorn
    uvicorn.run(app, host=host, port=port, reload=debug)