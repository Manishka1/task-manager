import React, { useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Box, Typography, Paper } from '@mui/material';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function TaskPieChart() {
  const dispatch = useDispatch();

  const { tasks } = useSelector((state) => state.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const progressCount = tasks.filter((t) => t.status === 'in-progress').length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  const chartData = {
    labels: ['To Do', 'In Progress', 'Done'],
    datasets: [
      {
        label: 'Tasks',
        data: [todoCount, progressCount, doneCount],
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#4CAF50'
        ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Paper sx={{ p: 4, width: 450 }}>
        <Typography variant="h6" textAlign="center" mb={2}>
          Task Status Overview
        </Typography>

        <Box sx={{ height: 350 }}>
          <Pie data={chartData} options={options} />
        </Box>
      </Paper>
    </Box>
  );
}
