import React, { useEffect, useState } from 'react';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box, 
  MenuItem, 
  Select, 
  FormControl, 
  InputLabel, 
  Pagination,
  Alert,
  CircularProgress,
  Chip
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { useHistory } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { selectUserRole } from '../features/auth/authSlice';

export default function TaskList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { tasks = [], total, loading, error } = useSelector(state => state.tasks);
  const userRole = useSelector(selectUserRole) || '';
  
  const [params, setParams] = useState({ 
    status: '', 
    priority: '', 
    page: 1, 
    size: 6 
  });

  useEffect(() => {
    dispatch(fetchTasks(params));
  }, [dispatch, params]);

  const handleFilterChange = (field) => (evt) => {
    setParams({ ...params, [field]: evt.target.value, page: 1 });
  };

  const getPriorityColor = (priority) => {
    const colors = {
      1: 'success',
      2: 'info',
      3: 'warning',
      4: 'error',
      5: 'error'
    };
    return colors[priority] || 'default';
  };

  const getStatusColor = (status) => {
    const colors = {
      'todo': 'info',
      'in-progress': 'warning',
      'done': 'success'
    };
    return colors[status] || 'default';
  };

  return (
    <Box p={3}>
      {/* Filters and New Task Button */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Box display="flex" gap={2} flexWrap="wrap">
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={params.status}
              label="Status"
              onChange={handleFilterChange('status')}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={params.priority}
              label="Priority"
              onChange={handleFilterChange('priority')}
              size="small"
            >
              <MenuItem value="">All</MenuItem>
              {[1, 2, 3, 4, 5].map(n => (
                <MenuItem key={n} value={n}>
                  <Chip 
                    label={n} 
                    size="small" 
                    color={getPriorityColor(n)}
                    sx={{ minWidth: 50 }}
                  />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        {userRole === 'admin' && (
          <Button 
            variant="contained" 
            onClick={() => history.push('/tasks/new')}
            sx={{ minWidth: 120 }}
          >
            New Task
          </Button>
        )}
      </Box>

      {/* Error Message */}
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      {/* Loading State */}
      {loading ? (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {/* Tasks Grid */}
          <Grid container spacing={2}>
            {tasks.map(task => (
              <Grid item xs={12} sm={6} md={4} key={task._id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    '&:hover': {
                      boxShadow: 6,
                      transform: 'translateY(-2px)',
                      transition: 'all 0.2s ease-in-out'
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {task.title}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color="textSecondary" 
                      sx={{ mb: 2 }}
                    >
                      {task.description?.substring(0, 100)}
                      {task.description?.length > 100 ? '...' : ''}
                    </Typography>
                    <Box display="flex" gap={1} flexWrap="wrap">
                      <Chip 
                        label={task.status} 
                        size="small" 
                        color={getStatusColor(task.status)}
                      />
                      <Chip 
                        label={`Priority ${task.priority}`} 
                        size="small" 
                        color={getPriorityColor(task.priority)}
                      />
                    </Box>
                  </CardContent>
                  <Box sx={{ p: 1, textAlign: 'right', borderTop: '1px solid #eee' }}>
                    <Button 
                      size="small" 
                      onClick={() => history.push(`/tasks/${task._id}`)}
                      color="primary"
                    >
                      View Details
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Empty State */}
          {!loading && tasks.length === 0 && (
            <Box textAlign="center" py={4}>
              <Typography variant="h6" color="textSecondary">
                No tasks found
              </Typography>
            </Box>
          )}

          {/* Pagination */}
          {tasks.length > 0 && (
            <Box mt={4} display="flex" justifyContent="center">
              <Pagination
                count={Math.ceil(total / params.size)}
                page={params.page}
                onChange={(e, p) => setParams({ ...params, page: p })}
                color="primary"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}
    </Box>
  );
}