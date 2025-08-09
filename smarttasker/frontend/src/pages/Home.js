import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/Dashboard';

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div className="home">
      <header>
        <h1>SmartTasker</h1>
        <button onClick={() => {
          localStorage.removeItem('token');
          navigate('/login');
        }}>Logout</button>
      </header>
      <Dashboard />
    </div>
  );
};

export default Home;