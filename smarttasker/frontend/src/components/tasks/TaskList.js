import { FiEdit, FiTrash2, FiCheck, FiClock } from 'react-icons/fi';
import { format } from 'date-fns';

const TaskList = ({ tasks, loading, onEdit, onDelete }) => {
  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (tasks.length === 0) {
    return <div className="text-center py-8 text-gray-500">No tasks found. Add your first task!</div>;
  }

  return (
    <div className="space-y-4">
      {tasks.map(task => (
        <div key={task.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-gray-800 dark:text-white">{task.title}</h3>
              {task.description && (
                <p className="text-gray-600 dark:text-gray-300 mt-1">{task.description}</p>
              )}
              {task.due_date && (
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                  <FiClock className="mr-1" />
                  Due: {format(new Date(task.due_date), 'MMM dd, yyyy')}
                </div>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(task)}
                className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition-colors"
                aria-label="Edit task"
              >
                <FiEdit size={18} />
              </button>
              <button
                onClick={() => onDelete(task.id)}
                className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors"
                aria-label="Delete task"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
            <span className={`px-2 py-1 text-xs rounded-full ${
              task.priority === 'high' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
              task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
              'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
            }`}>
              {task.priority}
            </span>
            <span className={`px-2 py-1 text-xs rounded-full ${
              task.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
              'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
            }`}>
              {task.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;