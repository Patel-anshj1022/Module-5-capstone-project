import { FiCheck, FiTrash2, FiStar } from 'react-icons/fi';

const HabitItem = ({ habit, onComplete, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="font-medium text-lg text-gray-800 dark:text-white">{habit.title}</h3>
          {habit.description && (
            <p className="text-gray-600 dark:text-gray-300 mt-1">{habit.description}</p>
          )}
          <div className="flex items-center mt-2 space-x-4">
            <span className="text-sm text-gray-500 dark:text-gray-400 capitalize">
              {habit.frequency}
            </span>
            <span className="flex items-center text-sm text-yellow-600 dark:text-yellow-400">
              <FiStar className="mr-1" /> Streak: {habit.streak}
            </span>
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => onComplete(habit.id)}
            className="text-green-600 hover:text-green-800 dark:hover:text-green-400 transition-colors"
            aria-label="Complete habit"
          >
            <FiCheck size={18} />
          </button>
          <button
            onClick={() => onDelete(habit.id)}
            className="text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors"
            aria-label="Delete habit"
          >
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HabitItem;