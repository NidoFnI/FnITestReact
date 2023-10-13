require('dotenv').config();

const cors = require('cors');
const express = require('express');
const app = express();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
});

app.use(express.json(), cors({ origin: '*' }));

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send(`Yo! Env = ${process.env.TEST}`)
});

app.get("/open", (req, res, next) => {
  res.json(["Hello", "World!"]);
});

app.post("/ask", async(req, res) => {
  const prompt = req.body.prompt;

  try{
    if(prompt == null){
      throw new Error("No prompt");
    }

    const response = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      max_tokens: 7,
      temperature: .1,
    });

    const completion = response.choices[0].text.trim();

    return res.status(200).json({
      success: true,
      message: completion,
    });
  } catch (error){
    console.log(error.message);
  }
});

app.listen(process.env.PORT || 3000, () => console.log(`Server is running on port ${process.env.PORT || 3000}`));