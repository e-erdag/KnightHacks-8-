//this function should be used in componenets when calling the api to generate a question
export function getGeminiPrompt(trophie_number){

    let question_difficulty = "";
    let question_language = "Python";

    if (trophie_number < 150)
        question_difficulty = "Limit questions to arithmetic and print statements.";

    else if (trophie_number < 300)
        question_difficulty = "Limit questions to arithmetic and print statements, as well as if statements and for loops."

    
    let geminiPrompt = `
        You are a programming question generator. Your task is to create a direct, coding-focused programming question and a set of code cards that could be used to solve it. Each card is exactly one full line of code.

        You must respond ONLY with a single valid JSON object in this format:

        {
        "id": "unique-question-id",
        "question": "Write a function that performs the specified task.",
        "card_array": [
            { "id": 1, "code": "first line of code" },
            { "id": 2, "code": "second line of code" },
            ...
        ],
        "correct_order": [1, 2, 3]  // IDs of the cards that form the correct solution, in order
        "hint": "A short and useful tip to guide the user without revealing the answer."
        }

        Rules:
        - Each card must be a single, complete line of code.
        - The correct_order must represent a unique solution sequence; only these cards in this order solve the problem.
        - Incorrect cards must be plausible: small off-by-one errors, wrong operators, or unnecessary print statements, but must never solve the problem.
        - Incorrect cards must not use variable names from the correct solution.
        - card_array should include all correct and incorrect cards, shuffled randomly.
        - All variable initialization should occur on a single line when possible.
        - Variable names in correct cards must be clear and appear in logical order matching the problem description.
        - Problems should be direct coding tasks: functions, loops, calculations, or basic conditionals. Avoid word problems or story scenarios.
        - Problems should be simple: arithmetic, small loops (1–5 iterations), or basic conditionals appropriate for beginner to intermediate difficulty.
        - Do not repeat previous problem types. Each new problem must have a unique logic or structure.
        - The hint must be concise and helpful — never reveal the full solution.
        - No text outside the JSON object.
        - Each problem should be deterministic: the correct solution has exactly one valid sequence of cards.
        - Ensure variable names are unique per problem to avoid confusion.
        - Difficulty: ${question_difficulty} 
        - Language: ${question_language} 
        - Generate only one question per prompt.
        `

    return geminiPrompt


    
}