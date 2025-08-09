// frontend/js/home.js
const API_BASE = "http://localhost:5000";

function $(sel) { return document.querySelector(sel); }

async function fetchMe(token) {
  const res = await fetch(`${API_BASE}/me`, {
    headers: {
      "Authorization": "Bearer " + token
    }
  });
  if (!res.ok) throw new Error("Unauthorized");
  return res.json();
}

async function fetchTasks(token) {
  const res = await fetch(`${API_BASE}/tasks`, {
    headers: { "Authorization": "Bearer " + token }
  });
  if (!res.ok) return [];
  const data = await res.json();
  return data.tasks || [];
}

async function createTask(token, title) {
  const res = await fetch(`${API_BASE}/tasks`, {
    method: "POST",
    headers: {"Content-Type":"application/json", "Authorization":"Bearer " + token},
    body: JSON.stringify({title})
  });
  return res.json();
}

document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("smarttasker_token");
  if (!token) {
    window.location.href = "index.html";
    return;
  }

  try {
    const user = await fetchMe(token);
    $("#user-info").textContent = `@${user.username}`;
    $("#welcome-text").textContent = `Hello, ${user.username}!`;
    const tasks = await fetchTasks(token);
    renderTasks(tasks);
  } catch (err) {
    console.error(err);
    // token invalid or expired -> force logout
    localStorage.removeItem("smarttasker_token");
    localStorage.removeItem("smarttasker_user");
    window.location.href = "index.html";
    return;
  }

  $("#logout-btn").addEventListener("click", () => {
    localStorage.removeItem("smarttasker_token");
    localStorage.removeItem("smarttasker_user");
    window.location.href = "index.html";
  });

  $("#task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    $("#home-error").textContent = "";
    const title = $("#task-title").value.trim();
    if (!title) {
      $("#home-error").textContent = "Task title is required.";
      return;
    }
    try {
      const res = await createTask(token, title);
      if (res.task) {
        // append to list
        const li = document.createElement("li");
        li.textContent = res.task.title;
        document.getElementById("task-list").prepend(li);
        $("#task-title").value = "";
      } else {
        $("#home-error").textContent = res.message || "Could not add task";
      }
    } catch (err) {
      console.error(err);
      $("#home-error").textContent = "Network error.";
    }
  });
});

function renderTasks(tasks) {
  const list = $("#task-list");
  list.innerHTML = "";
  if (!tasks || tasks.length === 0) {
    list.innerHTML = "<li class='muted'>No tasks yet — add one below.</li>";
    return;
  }
  tasks.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t.title;
    list.appendChild(li);
  });
}
