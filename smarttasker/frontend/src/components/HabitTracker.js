import React, { useEffect, useState } from "react";
import axios from "../services/api";

export default function HabitTracker() {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    axios.get("/habits/").then(res => setHabits(res.data));
  }, []);

  return (
    <div>
      <h2>Habits</h2>
      {habits.map(h => (
        <div className="card" key={h.id}>
          <h4>{h.title}</h4>
          <p>{h.frequency}</p>
        </div>
      ))}
    </div>
  );
}
