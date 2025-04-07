# Ask user for a quiz name

# Loop while user wants to add questions
    # Ask user to enter the question
    # Ask user to enter choice for option a
    # Ask user to enter choice for option b
    # Ask user to enter choice for option c
    # Ask user to enter choice for option d

    # Ask user to enter the correct answer (a, b, c, or d)
    # Validate the correct answer (must be a/b/c/d only)

    # Format and combine the question, options, and correct answer into a question block
    # Write the question block to the quiz file

    # Ask user if they want to add another question (yes/no)
    # If no, break the loop

# Print a message indicating the quiz has been saved
# End program

quiz_name = input("Enter the name of the quiz: ")
quiz_file = f"{quiz_name}.txt"

questions = []

while True:
    question = input("Enter the question: ")
    
    option_a = input("Enter answer a: ")
    option_b = input("Enter answer b: ")
    option_c = input("Enter answer c: ")
    option_d = input("Enter answer d: ")

    while True: 
        correct_answer = input("ENter the correct answer (a/b/c/d): ").lower()
        if correct_answer in ["a", "b", "c", "d"]:
            break
        else:
            print("Please enter a valid answer (a/b/c/d)")

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

            