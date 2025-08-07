import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ProgressChart = ({ completed, pending }) => {
  const data = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [completed, pending],
        backgroundColor: ['#4F46E5', '#E5E7EB'],
        hoverBackgroundColor: ['#4338CA', '#D1D5DB'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#6B7280',
          font: {
            family: 'Inter, sans-serif',
          },
        },
      },
    },
    cutout: '70%',
    maintainAspectRatio: false,
  };

  return (
    <div className="h-64">
      <Doughnut data={data} options={options} />
    </div>
  );
};

export default ProgressChart;