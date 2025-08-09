import { useState, useEffect } from 'react';
import { getHabits, createHabit } from '../services/api';

const HabitTracker = () => {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({
    title: '',
    frequency: 'daily'
  });

  useEffect(() => {
    const fetchHabits = async () => {
      try {
        const response = await getHabits();
        setHabits(response.data);
      } catch (err) {
        console.error('Error fetching habits:', err);
      }
    };
    fetchHabits();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit({
      ...newHabit,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createHabit(newHabit);
      const response = await getHabits();
      setHabits(response.data);
      setNewHabit({
        title: '',
        frequency: 'daily'
      });
    } catch (err) {
      console.error('Error creating habit:', err);
    }
  };

  return (
    <div className="habit-tracker">
      <h3>Habits</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Habit title"
          value={newHabit.title}
          onChange={handleInputChange}
          required
        />
        <select
          name="frequency"
          value={newHabit.frequency}
          onChange={handleInputChange}
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
        </select>
        <button type="submit">Add Habit</button>
      </form>
      <ul>
        {habits.map(habit => (
          <li key={habit.id}>
            <h4>{habit.title}</h4>
            <p>Frequency: {habit.frequency}</p>
            <p>Streak: {habit.streak} days</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HabitTracker;