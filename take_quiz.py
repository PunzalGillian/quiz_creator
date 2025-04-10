# Ask the user for the quiz file name
# Try to open the quiz file
    # If file not found, print error and exit

# Initialize empty list to store parsed questions
# Initialize score counter to 0

# Parse the quiz file:
    # Read the file line by line
    # Group lines into question blocks
    # For each block, extract:
        # Question text
        # Options a, b, c, d
        # Correct answer
    # Store each parsed question in the list

# Start the quiz:
    # For each question in the parsed list:
        # Display question text
        # Show all options
        # Ask user for their answer (a/b/c/d)
        # Validate input is a, b, c or d
        # Check if answer matches correct answer
        # If correct, increment score and provide feedback
        # If incorrect, provide feedback with correct answer

# After all questions:
    # Print final score (X out of Y questions)

# Ask if user wants to take quiz again
    # If yes, reset score and restart quiz
    # If no, exit program
