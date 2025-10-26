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
        - Incorrect cards must never be usable in the solution and must not share variable names with correct cards.
        - card_array should include **all correct and incorrect cards**, shuffled randomly.
        - No text outside the JSON object.
        - Ensure variable names are unique per problem to avoid confusion.
        - Make problems deterministic: each correct solution has exactly one valid sequence of cards.
        - Difficulty: ${question_difficulty} 
        - Language: ${question_language} 
        - Generate only one question per prompt.
        `

    return geminiPrompt
}