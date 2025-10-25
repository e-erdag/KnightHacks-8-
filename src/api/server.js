import 'dotenv/config'; //getting .env variables
import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from "@google/generative-ai"; 

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

//initializing gemini model
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash-lite-001' }); 



//req is the requestion object (getting stuff from client),  res is response object (sending stuff back to client)
app.post('/api/ask', (req, res) => {
  const { prompt } = req.body;
  const fakeResponse = `You asked: ${prompt}`;
  res.json({ response: fakeResponse });
});


//req is the requestion object (getting stuff from client),  res is response object (sending stuff back to client)
app.post('/gen_question', async (req, res) => {
  const { prompt } = req.body;

  try{
    const result = await model.generateContent(prompt); // .generateContent sends prompt to Gemini and waits for response (result contains reponse) 
    const response = await result.response.text(); //.text() extracts the generated text from the response
    res.json({response});

  } catch (error)  {
    console.error('Gemini API error: ', error);
    res.status(500).json({error: 'Failed to get response from Gemini'});
  }
});

//starting the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

