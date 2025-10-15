require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { generateSubtasks } = require("./utils"); // your existing function

const app = express();
app.use(express.json());
app.use(cors());

// Test route to confirm server works
app.get("/api/test", (req, res) => {
  res.json([
    { title: "Test Task 1", description: "Do this first",deadline: "2025-11-20"},
    { title: "Test Task 2", description: "Do this next",deadline:"2025-11-25" }
  ]);
});

// Main route to generate subtasks
app.post("/api/subtasks", async (req, res) => {
  try {
    const { projectTitle, projectDueDate } = req.body;

    if (!projectTitle || !projectDueDate) {
      return res.status(400).json({ error: "Missing projectTitle or projectDueDate" });
    }

    // Call your existing function
    const subtasks = await generateSubtasks(projectTitle, projectDueDate);

    // If the function returns nothing, send dummy data to prevent frontend failure
    if (!subtasks || subtasks.length === 0) {
      return res.json([
        { title: "Sample Subtask 1", description: "Sample description",deadline:projectDueDate}
      ]);
    }

    res.json(subtasks);
  } catch (err) {
    console.error("Error generating subtasks:", err);
    res.status(500).json({ error: "Failed to generate subtasks" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server running on http://localhost:${PORT}`)
);


