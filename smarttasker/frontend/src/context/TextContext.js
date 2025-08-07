import { createContext, useContext, useState, useEffect } from 'react';
import { 
  fetchTasks, 
  createTask as apiCreateTask, 
  updateTask as apiUpdateTask, 
  deleteTask as apiDeleteTask,
  fetchHabits,
  completeHabit as apiCompleteHabit,
  deleteHabit as apiDeleteHabit,
  getAISuggestions,
  getMotivationalTip
} from '../services/api';

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState([]);
  const [motivationalTip, setMotivationalTip] = useState('');

  const loadTasks = async () => {
    setLoading(true);
    const data = await fetchTasks();
    setTasks(data);
    setLoading(false);
  };

  const loadHabits = async () => {
    setLoading(true);
    const data = await fetchHabits();
    setHabits(data);
    setLoading(false);
  };

  const createTask = async (taskData) => {
    setLoading(true);
    const newTask = await apiCreateTask(taskData);
    setTasks([...tasks, newTask]);
    setLoading(false);
    return newTask;
  };

  const updateTask = async (taskId, updates) => {
    setLoading(true);
    const updatedTask = await apiUpdateTask(taskId, updates);
    setTasks(tasks.map(task => task.id === taskId ? updatedTask : task));
    setLoading(false);
    return updatedTask;
  };

  const deleteTask = async (taskId) => {
    setLoading(true);
    await apiDeleteTask(taskId);
    setTasks(tasks.filter(task => task.id !== taskId));
    setLoading(false);
  };

  const completeHabit = async (habitId) => {
    setLoading(true);
    const updatedHabit = await apiCompleteHabit(habitId);
    setHabits(habits.map(habit => habit.id === habitId ? updatedHabit : habit));
    setLoading(false);
    return updatedHabit;
  };

  const deleteHabit = async (habitId) => {
    setLoading(true);
    await apiDeleteHabit(habitId);
    setHabits(habits.filter(habit => habit.id !== habitId));
    setLoading(false);
  };

  const loadAiSuggestions = async () => {
    setLoading(true);
    const suggestions = await getAISuggestions();
    setAiSuggestions(suggestions);
    setLoading(false);
  };

  const loadMotivationalTip = async () => {
    setLoading(true);
    const tip = await getMotivationalTip();
    setMotivationalTip(tip);
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
    loadHabits();
    loadMotivationalTip();
  }, []);

  return (
    <TaskContext.Provider value={{ 
      tasks,
      habits,
      loading,
      aiSuggestions,
      motivationalTip,
      loadTasks,
      createTask,
      updateTask,
      deleteTask,
      loadHabits,
      completeHabit,
      deleteHabit,
      loadAiSuggestions,
      loadMotivationalTip
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => useContext(TaskContext);