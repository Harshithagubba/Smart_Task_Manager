document.querySelector("#taskForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const projectTitle = document.querySelector("#projectTitle").value;
  const projectDueDate = document.querySelector("#projectDueDate").value;

  const output = document.querySelector("#output");
  output.innerHTML = "<p>⏳ Generating subtasks...</p>";

  try {
    const response = await fetch("http://localhost:5000/api/subtasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ projectTitle, projectDueDate }),
    });

    const subtasks = await response.json();

    output.innerHTML = "<h3>Generated Subtasks:</h3>";
    subtasks.forEach((task) => {
      output.innerHTML += `
        <div class="subtask">
          <h4>${task.title}</h4>
          <p>${task.description}</p>
          <small>Deadline: ${task.deadline}</small>
        </div>`;
    });
  } catch (err) {
    output.innerHTML = "<p style='color:red'>❌ Failed to fetch subtasks.</p>";
    console.error(err);
  }
});
