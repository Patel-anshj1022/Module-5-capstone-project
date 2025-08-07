import { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import { motion, AnimatePresence } from 'framer-motion';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

export default function TaskList() {
  const { tasks, loading, deleteTask, updateTask } = useTasks();
  const [filter, setFilter] = useState('all');
  const [sort, setSort] = useState('due_date');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sort === 'due_date') return new Date(a.due_date) - new Date(b.due_date);
    if (sort === 'priority') {
      const priorityOrder = { high: 1, medium: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    }
    return 0;
  });

  const handleStatusChange = async (taskId, status) => {
    await updateTask(taskId, { status });
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  if (loading && tasks.length === 0) {
    return <div className="flex justify-center py-12">Loading tasks...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Tasks</h2>
        <div className="flex gap-2">
          <select
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded px-3 py-1 text-sm"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="due_date">Due Date</option>
            <option value="priority">Priority</option>
          </select>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded text-sm"
          >
            Add Task
          </button>
        </div>
      </div>

      {showForm && (
        <TaskForm 
          task={editingTask} 
          onClose={() => {
            setShowForm(false);
            setEditingTask(null);
          }} 
        />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <AnimatePresence>
          {sortedTasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <TaskCard
                task={task}
                onStatusChange={handleStatusChange}
                onEdit={handleEdit}
                onDelete={deleteTask}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {sortedTasks.length === 0 && !loading && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No tasks found. Add a new task to get started.
        </div>
      )}
    </div>
  );
}