// utils.js
require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// ✅ Initialize Gemini API client using .env key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); // stable model

async function generateSubtasks(projectTitle, projectDueDate) {
  const prompt = `
You are an intelligent project management assistant.
Given a project titled "${projectTitle}" with a due date of ${projectDueDate} from today ,
generate 3–5 meaningful subtasks.

Each subtask must include:
- title
- short description
Return the result strictly in valid JSON format like:
[
  { "title": "Subtask 1", "description": "..."  },
  { "title": "Subtask 2", "description": "..."  }
]
`;

  try {
    const result = await model.generateContent(prompt);
    let text = result.response.text().trim();

    console.log("🧠 Gemini output:", text);

    // ✅ Clean output: remove markdown code fences (```) and optional "json" tag
    text = text.replace(/```json|```/g, "").trim();

    return JSON.parse(text); // ✅ parse clean JSON
  } catch (err) {
    console.error("❌ Gemini error or invalid JSON:", err.message);
    return [
      {
        title: "AI Generation Failed",
        description: "Fallback subtask due to error",
        deadline: projectDueDate,
      },
    ];
  }
}

module.exports = { generateSubtasks };
