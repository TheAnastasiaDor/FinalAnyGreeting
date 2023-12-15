const express = require('express');
const OpenAI = require('openai');
require('dotenv').config();

const app = express();
app.use(express.static('public'));
app.use(express.json());

// const port = 3000; <--when local host
const port = process.env.PORT || 3000;


// Start the server
app.listen(port, () => {
    // console.log(`Server running at http://localhost:3000`);<--when local host
console.log(`Server running on port ${port}`);

});

// Configure OpenAI with your API key
const openaiAPI = new OpenAI(process.env.OPENAI_API_KEY);

// Route to handle the generation of the greeting card text
app.post('/api/generateCard', async (req, res) => {
    try {
        // const prompt = req.body.prompt;
const prompt = `Create a greeting card message for ${occasion}. The card is from ${userName} to ${personName}, who is ${relation}. The message should reflect a closeness level of ${closeness}, contact frequency of ${contactFrequency}, formality level of ${formality}, cheerfulness level of ${cheerfulness}, and length of ${length}.`;
        // The messages array for the GPT-3.5 Chat model
        const messages = [
            { role: "system", content: "You are a creative AI assistant." },
            { role: "user", content: prompt }
        ];

        const response = await openaiAPI.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages,
            max_tokens: 150
        });

        // Extracting the text from the response
        const text = response.choices[0].message.content.trim();

        res.json({ text: text });
    } catch (error) {
        console.error('Error generating card text:', error);
        res.status(500).send(`Error generating card text: ${error.message}`);
    }
});
