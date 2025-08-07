import { useEffect, useState } from 'react';
import HabitForm from './HabitForm';
import HabitItem from './HabitItem';
import { getHabits, completeHabit, deleteHabit } from '../../services/api';
import { toast } from 'react-hot-toast';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const data = await getHabits();
      setHabits(data);
    } catch (error) {
      toast.error('Failed to fetch habits');
    } finally {
      setLoading(false);
    }
  };

  const handleComplete = async (habitId) => {
    try {
      const updatedHabit = await completeHabit(habitId);
      setHabits(habits.map(habit => 
        habit.id === habitId ? updatedHabit : habit
      ));
      toast.success('Habit marked as completed!');
    } catch (error) {
      toast.error('Failed to complete habit');
    }
  };

  const handleDelete = async (habitId) => {
    try {
      await deleteHabit(habitId);
      setHabits(habits.filter(habit => habit.id !== habitId));
      toast.success('Habit deleted successfully');
    } catch (error) {
      toast.error('Failed to delete habit');
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Habit Tracker</h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Habit
        </button>
      </div>
      
      {isFormOpen && (
        <HabitForm 
          onSuccess={() => {
            fetchHabits();
            setIsFormOpen(false);
          }} 
          onCancel={() => setIsFormOpen(false)} 
        />
      )}
      
      {loading ? (
        <div className="text-center py-8">Loading habits...</div>
      ) : habits.length === 0 ? (
        <div className="text-center py-8 text-gray-500">No habits found. Add your first habit!</div>
      ) : (
        <div className="space-y-4">
          {habits.map(habit => (
            <HabitItem 
              key={habit.id} 
              habit={habit} 
              onComplete={handleComplete} 
              onDelete={handleDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default HabitTracker;