import React from "react";
import TaskList from "../components/TaskList";
import HabitTracker from "../components/HabitTracker";
import Dashboard from "../components/Dashboard";

export default function Home() {
  return (
    <div>
      <h1>Welcome to SmartTasker</h1>
      <Dashboard />
      <TaskList />
      <HabitTracker />
    </div>
  );
}
