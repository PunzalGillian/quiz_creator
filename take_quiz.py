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

quiz_name = input("Enter the name of the quiz to take: ")
quiz_file = f"{quiz_name}.txt"

try:
    with open(quiz_file, "r") as file:
        content = file.read()
except FileNotFoundError:
    print(f"Error: The file '{quiz_file}' cannot be found")
    exit()

parsed_questions = []
score = 0

question_blocks = content.strip().split("\n\n")

for block in question_blocks:
    lines = block.strip().split("\n")

    question = lines[0]
    options = lines[1:5]

    correct_line = lines[5]
    correct_answer = correct_line.split(": ")[1].strip()

    parsed_questions.append({
        "question": question,
        "options": options,
        "correct_answer": correct_answer
    })

total_questions = len(parsed_questions)
print(f"\nStarting quiz: {quiz_name}...\n")

for count, question in enumerate(parsed_questions, 1):
    print(f"Question {count}: {question['question']}")

    for option in question["options"]:
        print(option)

