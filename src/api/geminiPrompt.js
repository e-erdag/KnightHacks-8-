let arena1Difficulty = "Limit questions to arithmetic and print statements.";

//this function should bve used in componenets when calling the api to generate a question
function getGeminiPrompt(question_difficulty){
    
    
    
        geminiPrompt = `
        You are a coding question generator. Your task is to create a programming question and a set of code cards that could be used to solve it.

        Respond ONLY with a single valid JSON object in this format:
        {
        "id": "unique-question-id",
        "question": "The programming question text",
        "correct_cards": ["each line of correct code in correct order"],
        "incorrect_cards": ["each incorrect full line of code"]
        }

        Requirements:
        - Do not include any text outside the JSON.
        - Each card must represent exactly one full line of code (no partial lines).
        - The correct_cards must be enough to fully solve the question in the correct order.
        - The incorrect_cards must look plausible but should not solve the question.
        - Make sure the JSON is syntactically valid.

        Difficulty constraint: ${question_difficulty}

        Generate one question.`

        return getGeminiPrompt
}