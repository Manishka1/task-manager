import React, { useEffect, useState } from 'react';
import { Grid, Card, CardContent, Typography, Button, Box, MenuItem, Select, FormControl, InputLabel, Pagination } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks } from '../features/tasks/tasksSlice';
import { useHistory } from 'react-router-dom';

export default function TaskList() {
  const dispatch = useDispatch();
  const history  = useHistory();
  const { tasks, total } = useSelector(s => s.tasks);
  const [params, setParams] = useState({ status:'', priority:'', page:1, size:6 });

  useEffect(() => {
    dispatch(fetchTasks(params));
  }, [dispatch, params]);

  const handleFilterChange = (field) => (evt) => {
    setParams({ ...params, [field]: evt.target.value, page: 1 });
  };

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <FormControl sx={{ minWidth:120 }}>
          <InputLabel>Status</InputLabel>
          <Select value={params.status} label="Status" onChange={handleFilterChange('status')}>
            <MenuItem value="">All</MenuItem>
            <MenuItem value="todo">To Do</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="done">Done</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth:120 }}>
          <InputLabel>Priority</InputLabel>
          <Select value={params.priority} label="Priority" onChange={handleFilterChange('priority')}>
            <MenuItem value="">All</MenuItem>
            {[1,2,3,4,5].map(n => <MenuItem key={n} value={n}>{n}</MenuItem>)}
          </Select>
        </FormControl>
        <Button variant="contained" onClick={() => history.push('/tasks/new')}>
          New Task
        </Button>
      </Box>

      <Grid container spacing={2}>
        {tasks.map(task => (
          <Grid item xs={12} sm={6} md={4} key={task._id}>
            <Card sx={{ height: '100%', display:'flex', flexDirection:'column' }}>
              <CardContent sx={{ flexGrow:1 }}>
                <Typography variant="h6">{task.title}</Typography>
                <Typography variant="body2" color="textSecondary" gutterBottom>
                  {task.description?.substring(0, 60)}…
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Status: {task.status} &nbsp;|&nbsp; Priority: {task.priority}
                </Typography>
              </CardContent>
              <Box sx={{ p:1, textAlign:'right' }}>
                <Button size="small" onClick={()=>history.push(`/tasks/${task._id}`)}>
                  View
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={4} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(total/params.size)}
          page={params.page}
          onChange={(e,p) => setParams({...params, page: p})}
        />
      </Box>
    </Box>
  );
}
