import { useState, useEffect } from 'react';
import { getTasks, createTask } from '../services/api';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    due_date: '',
    completed: false
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await getTasks();
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };
    fetchTasks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewTask({
      ...newTask,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(newTask);
      const response = await getTasks();
      setTasks(response.data);
      setNewTask({
        title: '',
        description: '',
        due_date: '',
        completed: false
      });
    } catch (err) {
      console.error('Error creating task:', err);
    }
  };

  return (
    <div className="task-list">
      <h3>Tasks</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={newTask.title}
          onChange={handleInputChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={newTask.description}
          onChange={handleInputChange}
        />
        <input
          type="datetime-local"
          name="due_date"
          value={newTask.due_date}
          onChange={handleInputChange}
        />
        <label>
          <input
            type="checkbox"
            name="completed"
            checked={newTask.completed}
            onChange={handleInputChange}
          />
          Completed
        </label>
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <h4>{task.title}</h4>
            <p>{task.description}</p>
            {task.due_date && <p>Due: {new Date(task.due_date).toLocaleString()}</p>}
            <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;