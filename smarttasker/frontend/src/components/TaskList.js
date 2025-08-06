import React, { useEffect, useState } from "react";
import axios from "../services/api";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios.get("/tasks/").then(res => setTasks(res.data));
  }, []);

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.map(t => (
        <div className="card" key={t.id}>
          <h4>{t.title}</h4>
          <p>{t.due_date}</p>
        </div>
      ))}
    </div>
  );
}
