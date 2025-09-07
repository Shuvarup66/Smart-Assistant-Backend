// server.js
import express from "express";
import dotenv from "dotenv";
import OpenAI from "openai";
import cors from "cors";
console.log("🚀 Server started with CORS enabled for ALL origins");
dotenv.config();

const app = express();


// app.use(cors({
//     origin: 'https://funny-bavarois-c2716c.netlify.app'
// }));

app.use(cors());


const PORT = process.env.PORT || 5000;

app.use(express.json());

// ✅ Initialize OpenAI
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Route for Smart Assistant
app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // ✅ Free + reliable
      messages: [
        { role: "system", content: "You are a helpful smart assistant." },
        { role: "user", content: question },
      ],
    });

    const aiResponse = response.choices[0].message.content;
   
    res.json({ answer: aiResponse });
  } catch (error) {
    console.error("OpenAI API Error:", error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
