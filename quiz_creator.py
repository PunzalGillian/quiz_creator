"""
Quiz Creator - A program that allows users to create quizzes with multiple choice questions.

This script prompts the user for:
- Quiz name
- Questions
- Multiple choice options (a, b, c, d)
- Correct answers
The quiz is saved to a text file with the quiz name.
"""

# Ask user for a quiz name
quiz_name = input("Enter the name of the quiz: ")
quiz_file = f"{quiz_name}.txt"

questions = []

while True:
    question = input("Enter the question: ")
    option_a = input("Enter answer a: ")
    option_b = input("Enter answer b: ")
    option_c = input("Enter answer c: ")
    option_d = input("Enter answer d: ")

    # Validate correct answer input
    while True:
        correct_answer = input("Enter the correct answer (a/b/c/d): ").lower()
        if correct_answer in ["a", "b", "c", "d"]:
            break
        else:
            print("Please enter a valid answer (a/b/c/d)")

    # Format question and answers in a readable format
    question_block = f"{question}\n"
    question_block += f"a) {option_a}\n"
    question_block += f"b) {option_b}\n"
    question_block += f"c) {option_c}\n"
    question_block += f"d) {option_d}\n"
    question_block += f"Correct answer: {correct_answer}\n\n"
    questions.append(question_block)

    continue_choice = input("Do you want to add another question? (Y/N): ").upper()
    if continue_choice != "Y":
        break

print("Saving quiz...")

# Write questions to the file
with open(quiz_file, "w") as file:
    for question in questions:
        file.write(question)

print(f"Quiz has been saved successfully as '{quiz_file}'.")

