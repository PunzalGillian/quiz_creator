import asyncio
import pytest
from fastapi.testclient import TestClient
import sys
import os

# Add the parent directory to the path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

# Import your app only once
from backend.app.main import app

# This fixture provides a new event loop for each test function
@pytest.fixture(scope="function")
def event_loop():
    """Create a new event loop for each test."""
    loop = asyncio.get_event_loop_policy().new_event_loop()
    yield loop
    loop.close()

# Provide the client as a fixture
@pytest.fixture
def client():
    """Create a test client for the FastAPI app."""
    with TestClient(app) as test_client:
        yield test_client

# Add a fixture for test data
@pytest.fixture
def sample_quiz():
    return {
        "quiz_name": "Test Quiz",
        "questions": [
            {
                "question": "What is 2+2?",
                "option_a": "3",
                "option_b": "4", 
                "option_c": "5",
                "option_d": "6",
                "correct_answer": "b"
            }
        ]
    }