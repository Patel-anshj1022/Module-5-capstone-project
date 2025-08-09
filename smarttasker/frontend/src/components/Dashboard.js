import TaskList from './TaskList';
import HabitTracker from './HabitTracker';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h2>Your Dashboard</h2>
      <div className="dashboard-content">
        <TaskList />
        <HabitTracker />
      </div>
    </div>
  );
};

export default Dashboard;