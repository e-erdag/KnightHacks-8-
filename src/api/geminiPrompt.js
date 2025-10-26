//this function should bve used in componenets when calling the api to generate a question
export function getGeminiPrompt(trophie_number){

    let question_difficulty = "";
    let question_language = "Python";

    if (trophie_number < 150)
        question_difficulty = "Limit questions to arithmetic and print statements.";

    else if (trophie_number < 300)
        question_difficulty = "Limit questions to arithmetic and print statements, as well as if statements and for loops."

    
    let geminiPrompt = `
        You are a programming question generator. Your task is to create a programming question and a set of code cards that could be used to solve it. Each card is exactly one full line of code.

        You must respond ONLY with a single valid JSON object in this format:

        {
        "id": "unique-question-id",
        "question": "The programming question text",
        "card_array": [
            { "id": 1, "code": "first line of code" },
            { "id": 2, "code": "second line of code" },
            ...
        ],
        "correct_order": [1, 2, 3]  // IDs of the cards that form the correct solution, in order
        }

        Rules:
        - Each card must be a single, complete line of code.
        - The correct_order must represent a unique solution sequence; only these cards in this order solve the problem.
        - Incorrect cards must be plausible: they can have similar logic to correct cards, off-by-one errors, wrong operators, or unnecessary print statements, but they must never solve the problem.
        - Incorrect cards must **not have variable names from the correct solution**.
        - Card_array should include all correct and incorrect cards, shuffled randomly.
        - Variable names in correct cards must be clear, intuitive, and appear in the order that makes sense logically for the problem.
        - Problems should be varied: include arithmetic, loops, conditions, or small function definitions, according to the difficulty level.
        - Do not repeat previous problem types. Each new problem must introduce at least one variation in logic or structure.
        - No text outside the JSON object.
        - Each problem should be deterministic: the correct solution has exactly one valid sequence of cards.
        - Ensure that variable names are unique per problem to avoid confusion.
        - Difficulty: ${question_difficulty} 
        - Language: ${question_language} 
        - Generate only one question per prompt.
        `

    return geminiPrompt
}