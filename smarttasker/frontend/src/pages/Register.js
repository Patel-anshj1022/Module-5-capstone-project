import React, { useState } from "react";
import { register } from "../services/auth";

export default function Register() {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      await register(form);
      window.location.href = "/";
    } catch (err) {
      setError("Registration failed. Try a different username or email.");
    }
  };

  return (
    <div className="card">
      <h2>Register</h2>
      <input
        placeholder="Username"
        value={form.username}
        onChange={(e) => setForm({ ...form, username: e.target.value })}
      />
      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
