import fs from 'fs/promises';
import path from 'path';

export async function readSavedTrophies(file_path){
    
    try{
        const line = await fs.readFile(file_path, 'utf-8');
        const trophies = parseInt(line, 10);
        return trophies
    } catch (error) {
        console.error("Error in reading trophie amount from file: ", error);
        return null;
    }
  
}


export async function addAndSaveTrophieAmount(file_path, trophy_amount){
    try{
        trophy_amount = Number(trophy_amount);     
        trophy_amount += await readSavedTrophies(file_path);
        await fs.writeFile(file_path, trophy_amount.toString(), 'utf-8');
        console.log("Trophie amount saved successfully");
    } catch (error) {
        console.error("Error in writing trophie amount to file", error);
    }
}

export function getQuestionFromResponse(unprocessed_json){

    try{
        const cleaned_json = unprocessed_json.replace(/```json|```/g, '').trim(); //ragex to remove leading characters from gemini response
        const data = JSON.parse(cleaned_json);
        const { id, question, card_array, correct_order, hint } = data; 
        
        console.log("Question ID:", id);
        console.log("Question:", question);
        console.log("Card Array:", card_array);
        console.log("Correct Order:", correct_order);
        console.log("Hint:", hint);

        return {id, question, card_array, correct_order, hint};
    } catch (error) {
        console.error("Error in getting from AI Response JSON", error);
        return { id: "0", question: "none", card_array: [], correct_order: [] };
    }
}