import 'dotenv/config'; //getting .env variables
import express, { response } from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import {addAndSaveTrophieAmount, readSavedTrophies, getQuestionFromResponse} from './supportFuntions.js';
import { promises as fs } from 'fs';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//initializing gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite-001' }); 

//file for trophies
let file_path = "src/api/trophies.txt";

//checking if file alreaddy exists and if not creating it
try{
  await fs.access(file_path);
  console.log('Save file exists');
} catch (error) {

  await fs.writeFile(file_path , '0', 'utf-8');
  console.log('Save file does not exist - created it successfully');
}


//req is the requestion object (getting stuff from client),  res is response object (sending stuff back to client)
app.post('/gen_question', async (req, res) => {

  const { prompt } = req.body;

  try{
    const result = await model.generateContent(prompt); // .generateContent sends prompt to Gemini and waits for response (result contains reponse) 
    const aiResponse = await result.response.text(); //.text() extracts the generated text from the response
    res.json({response: aiResponse});

    getQuestionFromResponse(aiResponse);


  } catch (error)  {
    console.error('Gemini API error: ', error);
    res.status(500).json({error: 'Error - failed to get response from Gemini'});
    
  }
});


app.post('/add_trophies', async (req, res) => {

  const { trophies_to_add } = req.body // key in json must match this (trophies_to_add)

  try{
    await addAndSaveTrophieAmount(file_path, trophies_to_add);
    res.json({response: "successfully added new trophies"});

  } catch (error) {
    console.error('trophie addition error: ', error);
    res.json({error: "Error - api call to add trophies failed"});
  }


});

app.post('/read_trophies', async (req, res) => {

  try{
    const trophies = await readSavedTrophies(file_path);
    res.json({response: trophies});

  } catch (error) {
    console.error('error when fetching saved trophies: ', error);
    res.json({error: "Error - api call to read saved trophies failed"});
  }

});

//starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

