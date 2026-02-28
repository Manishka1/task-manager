import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register required components
ChartJS.register(ArcElement, Tooltip, Legend);

const TaskPieChart = ({ data }) => {
  const chartData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [{
      data: data || [10, 20, 30], // Replace with actual data
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    }]
  };

  return (
    <div>
      <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
  <Pie 
    data={chartData}
    options={{
      responsive: true,
      maintainAspectRatio: false
    }}
  />
</div>
    </div>
  );
};

export default TaskPieChart;
