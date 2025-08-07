import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import StatsCard from '../components/dashboard/StatsCard';
import ProgressChart from '../components/dashboard/ProgressChart';
import AISuggestions from '../components/dashboard/AISuggestions';
import { getTasks, getHabits, getAISuggestions } from '../services/api';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    habits: 0,
    longestStreak: 0
  });
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [tasks, habits, aiSuggestions] = await Promise.all([
        getTasks(),
        getHabits(),
        getAISuggestions()
      ]);
      
      const completedTasks = tasks.filter(task => task.status === 'completed').length;
      const pendingTasks = tasks.length - completedTasks;
      const longestStreak = habits.reduce((max, habit) => Math.max(max, habit.streak), 0);
      
      setStats({
        totalTasks: tasks.length,
        completedTasks,
        pendingTasks,
        habits: habits.length,
        longestStreak
      });
      
      setSuggestions(aiSuggestions);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Dashboard</h1>
      
      {loading ? (
        <div className="text-center py-8">Loading dashboard...</div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatsCard title="Total Tasks" value={stats.totalTasks} icon="tasks" />
            <StatsCard title="Completed" value={stats.completedTasks} icon="check" />
            <StatsCard title="Pending" value={stats.pendingTasks} icon="pending" />
            <StatsCard title="Habits" value={stats.habits} icon="habits" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Task Progress</h2>
                <ProgressChart completed={stats.completedTasks} pending={stats.pendingTasks} />
              </div>
            </div>
            
            <div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">AI Suggestions</h2>
                <AISuggestions suggestions={suggestions} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;