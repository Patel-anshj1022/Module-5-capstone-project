import { FiCheckCircle, FiClock, FiList, FiTrendingUp } from 'react-icons/fi';

const iconMap = {
  tasks: <FiList size={24} />,
  check: <FiCheckCircle size={24} />,
  pending: <FiClock size={24} />,
  habits: <FiTrendingUp size={24} />
};

const StatsCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white mt-1">{value}</h3>
        </div>
        <div className="p-3 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-200">
          {iconMap[icon]}
        </div>
      </div>
    </div>
  );
};

export default StatsCard;