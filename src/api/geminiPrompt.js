//this function should bve used in componenets when calling the api to generate a question
export function getGeminiPrompt(trophie_number){

    let question_difficulty = "";
    let question_language = "Python";

    if (trophie_number < 150)
        question_difficulty = "Limit questions to arithmetic and print statements.";

    else if (trophie_number < 300)
        question_difficulty = "Limit questions to arithmetic and print statements, as well as if statements and for loops."

    
    let geminiPrompt = `
        You are a coding question generator. Your task is to create a programming question and a set of code cards that could be used to solve it.

        Respond ONLY with a single valid JSON object in this format:
        {
        "id": "unique-question-id",
        "question": "The programming question text",
        "card_array": [
            { "id": 1, "code": "first line of code" },
            { "id": 2, "code": "second line of code" },
            { "id": 3, "code": "third line of code" }
            // include all correct and incorrect cards, randomly shuffled
        ],
        "correct_order": [2, 5, 7]
        // IDs of the correct cards from card_array, listed in the exact order needed to form the correct full solution
        }

        Requirements:
        - Do not include any text outside the JSON.
        - Each card in card_array must represent exactly one **full line of code** (no partial lines).
        - The card_array should contain both correct and incorrect cards, **randomly shuffled**.
        - Each card must have a unique sequential id (1, 2, 3, ...).
        - The correct_order array must list the **ids of the correct cards** in the **exact order they should appear** to solve the problem.
        - The JSON must be syntactically valid and properly formatted.

        Programming language: ${question_language}
        Difficulty constraint: ${question_difficulty}
`

    return geminiPrompt
}