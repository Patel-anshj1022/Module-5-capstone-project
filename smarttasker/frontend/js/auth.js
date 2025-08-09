// frontend/js/auth.js
const API_BASE = "http://localhost:5000";

function $(sel) { return document.querySelector(sel); }

document.addEventListener("DOMContentLoaded", () => {
  // tabs
  const tLogin = $("#tab-login");
  const tReg = $("#tab-register");
  const panelLogin = $("#panel-login");
  const panelReg = $("#panel-register");

  tLogin.addEventListener("click", () => {
    tLogin.classList.add("active");
    tReg.classList.remove("active");
    panelLogin.classList.remove("hidden");
    panelReg.classList.add("hidden");
  });
  tReg.addEventListener("click", () => {
    tReg.classList.add("active");
    tLogin.classList.remove("active");
    panelReg.classList.remove("hidden");
    panelLogin.classList.add("hidden");
  });

  // login form
  $("#login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    $("#login-error").textContent = "";
    const identifier = $("#login-identifier").value.trim();
    const password = $("#login-password").value;
    if (!identifier || !password) {
      $("#login-error").textContent = "Please fill both fields.";
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({identifier, password})
      });
      const data = await res.json();
      if (!res.ok) {
        $("#login-error").textContent = data.message || "Login failed";
        return;
      }
      localStorage.setItem("smarttasker_token", data.token);
      localStorage.setItem("smarttasker_user", JSON.stringify(data.user));
      window.location.href = "home.html";
    } catch (err) {
      $("#login-error").textContent = "Network error";
      console.error(err);
    }
  });

  // register form
  $("#register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    $("#reg-error").textContent = "";
    const username = $("#reg-username").value.trim();
    const email = $("#reg-email").value.trim();
    const password = $("#reg-password").value;
    if (!username || !email || !password) {
      $("#reg-error").textContent = "Please fill all fields.";
      return;
    }
    try {
      const res = await fetch(`${API_BASE}/auth/register`, {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({username, email, password})
      });
      const data = await res.json();
      if (!res.ok) {
        $("#reg-error").textContent = data.message || "Could not register";
        return;
      }
      // auto-login after register
      localStorage.setItem("smarttasker_token", data.token);
      localStorage.setItem("smarttasker_user", JSON.stringify(data.user));
      window.location.href = "home.html";
    } catch (err) {
      $("#reg-error").textContent = "Network error";
      console.error(err);
    }
  });

  // auto-redirect if already logged in
  const tkn = localStorage.getItem("smarttasker_token");
  if (tkn) {
    // attempt to go to home (frontend handles validation)
    window.location.href = "home.html";
  }
});
