import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { FiSun, FiMoon, FiLogOut, FiUser } from 'react-icons/fi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
          SmartTasker
        </Link>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon size={20} /> : <FiSun size={20} />}
          </button>
          
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Dashboard
              </Link>
              <Link to="/tasks" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Tasks
              </Link>
              <Link to="/habits" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Habits
              </Link>
              <div className="flex items-center space-x-2">
                <span className="text-gray-700 dark:text-gray-300">
                  <FiUser className="inline mr-1" /> {user.username}
                </span>
                <button
                  onClick={logout}
                  className="p-2 text-red-600 hover:text-red-800 dark:hover:text-red-400 transition-colors"
                  aria-label="Logout"
                >
                  <FiLogOut size={18} />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;