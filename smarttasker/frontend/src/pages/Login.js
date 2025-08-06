import React, { useState } from "react";
import { login } from "../services/auth";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await login(form);
      window.location.href = "/home";
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <div className="card">
      <h2>Login</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
