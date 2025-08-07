import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
          Boost Your Productivity
        </h1>
        <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
          SmartTasker helps you manage tasks, build habits, and track your progress all in one place.
        </p>
      </div>

      <div className="mt-10 flex justify-center">
        {user ? (
          <Link
            to="/dashboard"
            className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
          >
            Go to Dashboard
          </Link>
        ) : (
          <div className="space-x-4">
            <Link
              to="/login"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10 transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/register"
              className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10 transition-colors dark:text-white dark:bg-indigo-600 dark:hover:bg-indigo-700"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Task Management</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Create, organize, and track all your tasks in one place with due dates and priorities.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Habit Tracking</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Build positive habits with daily/weekly tracking and streak counters.
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Suggestions</h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Get personalized productivity tips and task suggestions powered by AI.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;