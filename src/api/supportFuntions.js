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


export async function addAndSaveTrophieAmount(file_path, trophie_amount){
    try{
        trophie_amount = Number(trophie_amount);     
        trophie_amount += await readSavedTrophies(file_path);
        await fs.writeFile(file_path, trophie_amount.toString(), 'utf-8');
        console.log("Trophie amount saved successfully");
    } catch (error) {
        console.error("Error in writing trophie amount to file", error);
    }
}