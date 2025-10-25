import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Define your route
app.post('/api/ask', (req, res) => {
  const { prompt } = req.body;
  const fakeResponse = `You asked: ${prompt}`;
  res.json({ response: fakeResponse });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

